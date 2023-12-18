const Sales = require("../models/SalesSchema");
const Stock = require("../models/StockSchema");
const MonthlySalesTracker = require("../models/MonthlySalesTrackerSchema");
const FuelStation = require("../models/FuelStationSchema");

// Add Sales
const createSales = async (req, res) => {
    try {
        const { fuelType, quantity, sellingPrice, customerContact, paymentMethod, pumpName, paymentStatus, transactionStatus, } = req.body;

        const total = quantity * sellingPrice;
        const totalPrice = total;
        const Salestax = totalPrice * 5 / 100 // tax rate is 5% for all fuel types
        const unitPrice = fuelType === "Octane" ? 100 : fuelType === "Petrol" ? 90 : fuelType === "Diesel" ? 80 : fuelType === "Gasoline" ? 110 : fuelType === "LPG" ? 70 : 0;

        // now according to pumpName  & fuelType from stock collection from database get quantity and after making sales reduce it from Stock collection
        const stock = await Stock.findOne({ pumpName: pumpName, fuelType: fuelType });
        if (!stock) {
            return res.status(404).json({ error: "Stock not found" });
        }
        if (stock.quantity < quantity) {
            return res.status(404).json({ error: "Stock is not enough" });
        }

        const restquantity = stock.quantity - quantity;
        const updateTotalPrice = stock.totalPrice * restquantity;
        await Stock.findOneAndUpdate({ pumpName: pumpName, fuelType: fuelType }, { quantity: restquantity, totalPrice: updateTotalPrice }, { new: true });
        const newSales = await Sales.create({ fuelType, quantity, unitPrice, sellingPrice, customerContact, paymentMethod, pumpName, paymentStatus, transactionStatus, totalPrice, Salestax });

        // Update monthly tracker
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        const saleMonth = newSales.date.getMonth(); // Assuming the date is stored in the 'date' field
        const monthName = months[saleMonth];
        const year = newSales.date.getFullYear();
        const monthYear = `${monthName} ${year}`;


        // Create a new monthly tracker from MonthlySalesTracker
        const monthlyTracker = await MonthlySalesTracker.findOne({ month: monthYear, fuelType: fuelType });
        if (!monthlyTracker) {
            // Initialize monthlyTracker object
            const newMonthlyTracker = {
                month: monthYear,
                petrol: fuelType === 'Petrol' ? totalPrice : 0,
                gasoline: fuelType === 'Gasoline' ? totalPrice : 0,
                diesel: fuelType === 'Diesel' ? totalPrice : 0,
                octane: fuelType === 'Octane' ? totalPrice : 0,
                lpg: fuelType === 'LPG' ? totalPrice : 0,
                totalSales: totalPrice,
            };
            // Create a new MonthlySalesTracker document
            await MonthlySalesTracker.create(newMonthlyTracker);
        } else {
            // Update the existing monthlyTracker object
            monthlyTracker.petrol += fuelType === 'Petrol' ? totalPrice : 0;
            monthlyTracker.gasoline += fuelType === 'Gasoline' ? totalPrice : 0;
            monthlyTracker.diesel += fuelType === 'Diesel' ? totalPrice : 0;
            monthlyTracker.octane += fuelType === 'Octane' ? totalPrice : 0;
            monthlyTracker.lpg += fuelType === 'LPG' ? totalPrice : 0;

            // Update the totalSales field
            monthlyTracker.totalSales = monthlyTracker.petrol + monthlyTracker.gasoline +
                monthlyTracker.diesel + monthlyTracker.octane + monthlyTracker.lpg;

            // Update the existing MonthlySalesTracker document
            await MonthlySalesTracker.findOneAndUpdate({ month: monthYear, fuelType: fuelType }, monthlyTracker, { new: true });
        }

        // now save this SalesId to the FuelStation SalesId array
        const fuelStation = await FuelStation.findOne({ pumpName });
        if (!fuelStation) {
            return res.status(404).json({ error: "FuelStation not found" });
        }

        fuelStation.allSalesId.push(newSales._id);
        await fuelStation.save();

        return res.status(201).json({ success: true, message: 'Sales added successfully', data: newSales });

    } catch (error) {
        res.status(400).json({ error: error.stack });
    }
};

// Get all Saless
const getAllSales = async (req, res) => {
    try {
        const sales = await Sales.find();
        res.json(sales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all Saless
const getSalesById = async (req, res) => {
    try {
        const sales = await Sales.findById(req.params.id);
        if (!sales) {
            return res.status(404).json({ error: 'Sales not found' });
        }
        res.json(sales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a specific Sales by ID
const updateSales = async (req, res) => {
    try {
        const updatedSales = await Sales.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedSales) {
            return res.status(404).json({ error: 'Sales not found' });
        }
        res.json({ message: 'Sales updated successfully', data: updatedSales });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a specific Sales by ID
const deleteSales = async (req, res) => {
    try {
        const deletedSales = await Sales.findByIdAndRemove(req.params.id);
        if (!deletedSales) {
            return res.status(404).json({ error: 'Sales not found' });
        }

        const pumpName = deletedSales.pumpName;

        // also delete the id form FuelStation collection in allSalesId array
        const fuelStation = await FuelStation.findOne({ pumpName });
        if (!fuelStation) {
            return res.status(404).json({ error: "FuelStation not found" });
        }

        const indexToDelete = fuelStation.allSalesId.findIndex(item =>
            item._id.toString() === req.params.id.toString()
        );

        if (indexToDelete !== -1) {
            // Remove the item from the array
            fuelStation.allSalesId.splice(indexToDelete, 1);
            // Save the updated supplier data
            await fuelStation.save();
        }
        res.json({ message: 'Sales deleted successfully' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a specific Sales by ID
const updateSalesStatus = async (req, res) => {
    try {
        const updatedSales = await Sales.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        if (!updatedSales) {
            return res.status(404).json({ error: 'Sales not found' });
        }
        res.json(updatedSales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a specific Sales by ID
const updateSalesPaymentMethod = async (req, res) => {
    try {
        const updatedSales = await Sales.findByIdAndUpdate(
            req.params.id,
            { method: req.body.method },
            { new: true }
        );
        if (!updatedSales) {
            return res.status(404).json({ error: 'Sales not found' });
        }
        res.json(updatedSales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    createSales, getAllSales, getSalesById,
    updateSales, deleteSales, updateSalesStatus,
    updateSalesPaymentMethod
};

