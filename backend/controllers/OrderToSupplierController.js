const FuelStation = require("../models/FuelStationSchema");
const Notification = require("../models/NotificationSchema");
const OrderToSupplier = require("../models/OrderToSupplierSchema");
const Supplier = require("../models/SupplierSchema");


// Add Order - Admin
const createOrder = async (req, res) => {
    const ordersFromStation = req.user.id // id of the stationOwner

    try {
        const { fuelType, quantity, supplier, pumpName } = req.body;

        // according to fuelType and uniteprice from suppliers fuelQuantities calculate totalPrice
        const supplierdata = await Supplier.findOne({ supplierId: supplier });
        console.log("supplierdata ------ ", supplierdata);
        const totalPrice = supplierdata.fuelQuantities.find((fuelQty) => fuelQty.fuelType === fuelType).unitPrice * quantity;
        const unitPrice = supplierdata.fuelQuantities.find((fuelQty) => fuelQty.fuelType === fuelType).unitPrice;

        // before saving the order check if the supplier has enough quantity or not.
        const supplierQuantity = supplierdata.fuelQuantities.find((fuelQty) => fuelQty.fuelType === fuelType).quantity;
        if (quantity > supplierQuantity) {
            return res.status(404).json({ error: "Supplier does not have enough quantity" });
        }

        // then create a new order object and save it to the database
        const newOrder = new OrderToSupplier({ ordersFromStation, fuelType, quantity, supplier, pumpName, unitPrice, totalPrice });
        const savedOrder = await newOrder.save();


        // now save this stockId to the FuelStation StocksId object
        const fuelStation = await FuelStation.findOne({ pumpName });
        if (!fuelStation) {
            return res.status(404).json({ error: "FuelStation not found" });
        }
        fuelStation.ordersId.push(savedOrder._id);
        await fuelStation.save();

        // Create a notification for the supplier or recipient
        const notification = new Notification({
            recipient: savedOrder.supplier, // Set the recipient based on your logic
            message: `New order with ID ${savedOrder._id} has been created.`,
        });
        await notification.save();

        res.status(201).json({ success: true, message: 'Order added successfully', data: savedOrder });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all Orders
const getOrders = async (req, res) => {
    try {
        const orders = await OrderToSupplier.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 
const updateOrder = async (req, res) => {
    try {
        const { quantity } = req.body;
        const updatedOrder = await OrderToSupplier.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Check if the quantity has changed
        if (quantity && updatedOrder.quantity !== quantity) {
            // Fetch the supplier data to recalculate totalPrice and unitPrice
            const supplierdata = await Supplier.findOne({ supplierId: updatedOrder.supplier });
            const fuelType = updatedOrder.fuelType;

            // Calculate new totalPrice and unitPrice based on updated quantity
            const totalPrice = supplierdata.fuelQuantities.find((fuelQty) => fuelQty.fuelType === fuelType).unitPrice * quantity;
            const unitPrice = supplierdata.fuelQuantities.find((fuelQty) => fuelQty.fuelType === fuelType).unitPrice;

            // Update the order with the new quantity, totalPrice, and unitPrice
            updatedOrder.quantity = quantity;
            updatedOrder.totalPrice = totalPrice;
            updatedOrder.unitPrice = unitPrice;

            // Save the updated order
            await updatedOrder.save();
        }

        res.json({ message: 'Order Updated Successfully', data: updatedOrder });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Delete a specific Order by ID
const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await OrderToSupplier.findByIdAndRemove(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        const pumpName = deletedOrder.pumpName;

        // also delete the id form FuelStation collection in ordersId array
        const fuelStation = await FuelStation.findOne({ pumpName });
        if (!fuelStation) {
            return res.status(404).json({ error: "FuelStation not found" });
        }

        const indexToDelete = fuelStation.ordersId.findIndex(item =>
            item._id.toString() === req.params.id.toString()
        );

        if (indexToDelete !== -1) {
            // Remove the item from the array
            fuelStation.ordersId.splice(indexToDelete, 1);

            // Save the updated supplier data
            await fuelStation.save();
        }
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Update a specific Order by ID
const updateOrderPaymentMethod = async (req, res) => {
    try {
        const updatedOrder = await OrderToSupplier.findByIdAndUpdate(
            req.params.id,
            { method: req.body.method },
            { new: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { createOrder, getOrders, updateOrder, deleteOrder, updateOrderPaymentMethod };

