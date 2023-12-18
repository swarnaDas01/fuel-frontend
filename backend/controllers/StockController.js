const cron = require('node-cron');
const FuelStation = require("../models/FuelStationSchema");
const Stock = require("../models/StockSchema");
const Supplier = require("../models/SupplierSchema");
const Notification = require('../models/NotificationSchema');


// Add Supplier stock --------------------------------------------

const AddSupplierStock = async (req, res) => {
    const supplierId = req.user.id

    try {
        const { fuelType, quantity, unitPrice, sellingPrice } = req.body;

        // Find the supplier by its ID
        const supplier = await Supplier.findOne({ supplierId })
        if (!supplier) {
            return res.status(404).json({ error: "Supplier not found" });
        }

        // Check if the supplier already has a fuelQuantity entry for the given fuelType
        const existingFuelQuantity = supplier.fuelQuantities.find((fuelQty) => fuelQty.fuelType === fuelType);

        if (existingFuelQuantity) {
            // If the fuelType already exists, update the quantity and unitPrice
            existingFuelQuantity.quantity += quantity;
            existingFuelQuantity.unitPrice = unitPrice;
        } else {
            // If the fuelType doesn't exist, create a new entry
            supplier.fuelQuantities.push({
                fuelType,
                quantity,
                unitPrice,
                sellingPrice
            });
        }

        // Save the updated supplier document
        await supplier.save();

        res.status(200).json({ message: "Stock added successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all Of my stock entries
const GetMySupplierAllStock = async (req, res) => {
    try {
        const supplierData = await Supplier.findOne({ supplierId: req.user.id });

        if (supplierData) {
            const stockEntries = supplierData.fuelQuantities;
            res.status(200).json(stockEntries);
        } else {
            res.status(404).json({ error: "Supplier data not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a specific stock entry by ID
const SingleSupplierStock = async (req, res) => {
    try {
        const fuelIdToFind = req.params.id;
        const supplierData = await Supplier.findOne({ supplierId: req.user.id });

        // Search for the fuel quantity item with the matching _id
        const fuelQuantityItem = supplierData.fuelQuantities.find(item =>
            item._id.toString() === fuelIdToFind.toString()
        );

        if (fuelQuantityItem) {
            res.status(200).json(fuelQuantityItem);
        } else {
            res.status(404).json({ error: "Fuel quantity item not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a specific stock entry by ID
const updateSupplierStock = async (req, res) => {
    try {
        const supplierId = req.user._id;
        const { fuelType, quantity, unitPrice, sellingPrice } = req.body;
        const fuelQuantityIdToUpdate = req.params.id;

        // Locate the supplier document
        const supplier = await Supplier.findOne({ supplierId });

        if (!supplier) {
            return res.status(404).json({ error: "Supplier not found" });
        }

        // Find the fuelQuantities entry by its ID
        const fuelQuantityToUpdate = supplier.fuelQuantities.find(
            (fuelQty) => fuelQty._id.toString() === fuelQuantityIdToUpdate
        );

        if (!fuelQuantityToUpdate) {
            return res.status(404).json({ error: 'Fuel quantity entry not found' });
        }

        // Update the fuelQuantities entry
        fuelQuantityToUpdate.quantity = quantity;
        fuelQuantityToUpdate.unitPrice = unitPrice;
        fuelQuantityToUpdate.sellingPrice = sellingPrice;

        // Save the changes to the supplier document
        await supplier.save();

        res.status(200).json({ message: 'Fuel Updated successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a specific stock entry by ID
const DeleteSupplierStock = async (req, res) => {
    try {
        const fuelIdToDelete = req.params.id;
        const supplierData = await Supplier.findOne({ supplierId: req.user.id });

        // Find the index of the fuel quantity item with the matching _id
        const indexToDelete = supplierData.fuelQuantities.findIndex(item =>
            item._id.toString() === fuelIdToDelete.toString()
        );

        if (indexToDelete !== -1) {
            // Remove the item from the array
            supplierData.fuelQuantities.splice(indexToDelete, 1);

            // Save the updated supplier data
            await supplierData.save();

            res.status(200).json({ message: "Deleted successfully" });
        } else {
            res.status(404).json({ error: "Fuel quantity item not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// Add Admin stock ----------------------------------------------

const AddAdminStock = async (req, res) => {
    try {
        // If it's not "Octane" or there was no existing entry, create a new entry
        const { pumpName, fuelType, quantity, unitPrice, sellingPrice } = req.body
        const totalPrice = quantity * unitPrice;

        // before adding a new entry, check if the pumpName and fuelType already exists and if so update the quantity and unitPrice accordingly and update the totalPrice accordingly
        const existingStock = await Stock.findOne({ pumpName, fuelType });
        if (existingStock) {
            // If the fuelType already exists, update the quantity and unitPrice
            existingStock.quantity = existingStock.quantity + existingStock.quantity;
            existingStock.unitPrice = unitPrice;
            existingStock.totalPrice = existingStock.quantity * existingStock.unitPrice;
            await existingStock.save();
            return res.status(200).json({ success: true, message: 'Stock updated successfully', data: existingStock });
        } else {
            // If the fuelType doesn't exist, create a new entry
            const newStock = await Stock.create({ pumpName, fuelType, quantity, unitPrice, sellingPrice, totalPrice });
            const stockId = newStock._id;

            // now save this stockId to the FuelStation StocksId object
            const fuelStation = await FuelStation.findOne({ pumpName });
            if (!fuelStation) {
                return res.status(404).json({ error: "FuelStation not found" });
            }

            fuelStation.stocksId.push(stockId);
            await fuelStation.save();

            return res.status(201).json({ success: true, message: 'Stock added successfully', data: newStock });
        }

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all stock entries
const GetAdminAllStock = async (req, res) => {
    try {
        const stock = await Stock.find();
        res.status(200).json(stock);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a specific stock entry by ID
const SingleAdminStock = async (req, res) => {
    try {
        const stock = await Stock.findById(req.params.id);
        if (!stock) {
            res.status(404).json({ error: 'Stock entry not found' });
        } else {
            res.status(200).json(stock);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a specific stock entry by ID
const updateAdminStock = async (req, res) => {
    try {
        const updatedStock = await Stock.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedStock) {
            res.status(404).json({ error: 'Stock entry not found' });
        } else {
            res.status(200).json({
                message: 'Stock entry updated successfully',
                updatedStock
            });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a specific stock entry by ID
const DeleteAdminStock = async (req, res) => {
    try {
        const deletedStock = await Stock.findByIdAndRemove(req.params.id);
        if (!deletedStock) {
            res.status(404).json({ error: 'Stock entry not found' });
        }
        const pumpName = deletedStock.pumpName;

        // also delete the id form FuelStation collection in stocksID array
        const fuelStation = await FuelStation.findOne({ pumpName });
        if (!fuelStation) {
            return res.status(404).json({ error: "FuelStation not found" });
        }

        const indexToDelete = fuelStation.stocksId.findIndex(item =>
            item._id.toString() === req.params.id.toString()
        );
        console.log("indexToDelete----", indexToDelete);

        if (indexToDelete !== -1) {
            // Remove the item from the array
            fuelStation.stocksId.splice(indexToDelete, 1);

            // Save the updated supplier data
            await fuelStation.save();
        }

        res.status(200).json({ message: "Stock entry deleted successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




// Function to check stock and send notifications
let notifiedCombos = {};
const checkStockAndNotify = async () => {
    try {
        // Retrieve all stocks
        const stocks = await Stock.find();

        // Filter stocks with quantity less than 50
        const lowStocks = stocks.filter(stock => stock.quantity < 50);

        if (lowStocks.length > 0) {
            for (const stock of lowStocks) {
                const { fuelType, pumpName } = stock;
                const comboKey = `${fuelType}-${pumpName}`;

                // Check if this fuelType and pumpName combination has been notified before
                if (!notifiedCombos[comboKey]) {
                    const notificationMessage = `Low stock for FuelType: ${fuelType} in Pump Name: ${pumpName}`;

                    // Create a notification
                    const notification = new Notification({
                        // recipient: req.user.id,
                        order_id: null,
                        status: "low stock",
                        message: notificationMessage,
                    });

                    // Save the notification in the database
                    await notification.save();

                    // Set the combination as notified
                    notifiedCombos[comboKey] = true;

                    // Replace the following line with your actual notification sending mechanism
                    console.log("notificationMessage: ", notificationMessage);
                }
            }
        } else {
            // Reset notifiedCombos when stocks are back above 50
            notifiedCombos = {};

            // Replace the following line with your actual notification sending mechanism
            console.log("Stocks are back above 50");
        }
    } catch (error) {
        console.error('Error checking stock:', error);
    }
};

// Schedule the function to run every 20 seconds
cron.schedule('*/20 * * * * *', () => {
    checkStockAndNotify();
});








module.exports = {
    AddSupplierStock,
    GetMySupplierAllStock,
    SingleSupplierStock,
    updateSupplierStock,
    DeleteSupplierStock,
    AddAdminStock,
    GetAdminAllStock,
    SingleAdminStock,
    updateAdminStock,
    DeleteAdminStock
};

