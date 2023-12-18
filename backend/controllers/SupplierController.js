const OrderToSupplier = require("../models/OrderToSupplierSchema");
const SupplierMonthlySales = require("../models/SupplierMonthlySalesTrackerSchema");
const Supplier = require("../models/SupplierSchema");
const Notification = require("../models/NotificationSchema");
const Stock = require("../models/StockSchema");


//get all suppliers from supplier collection
const getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get supplier all Orders
const getOrders = async (req, res) => {
    try {
        const orders = await OrderToSupplier.find({ supplier: req.user.id });
        if (!orders) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // console.log(orders);

        res.send(orders);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a specific order by ID
const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await OrderToSupplier.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json({ message: 'Order updated successfully', data: updatedOrder });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a specific Order by ID Processing -> Confirmed -> Processing -> Cancelled
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!status) {
            return res.status(404).json({ error: "Status not found" });
        }
        // Checking if the order is already confirmed or not. 
        const checkConfirmed = await OrderToSupplier.findById(req.params.id);
        if (!checkConfirmed) {
            return res.status(404).json({ error: "Order not found" });
        }

        if (checkConfirmed.status === "Confirmed") {
            return res.status(404).json({ error: "Order already confirmed" });
        }
        // if not confirmed then update the status
        const updatedOrder = await OrderToSupplier.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        const supplierId = updatedOrder.supplier;
        const UpdatedQuantity = updatedOrder.quantity;
        const fuelType = updatedOrder.fuelType;

        // find supplier according to supplierId
        const getsupplier = await Supplier.findOne({ supplierId: supplierId });
        if (!getsupplier) {
            return res.status(404).json({ error: "Supplier not found" });
        }

        // now matched fuelType and in fuelQuantities fuelType should match then quantity should be - from UpdatedQuantity
        const matchedFuelType = getsupplier.fuelQuantities.find((fuelQty) => fuelQty.fuelType === fuelType);
        if (!matchedFuelType) {
            return res.status(404).json({ error: "FuelType not found" });
        }
        // if order status is cancelled then send a notification for the supplier or recipient to update the quantity and total quantity accordingly.
        if (updatedOrder.status === status) {
            // then send a notification for the supplier or recipient to update the quantity and total quantity accordingly.
            const newNotification = new Notification({
                recipient: checkConfirmed.supplier,
                order_id: checkConfirmed._id,
                status: checkConfirmed.status,
                message: "your order has been Confirm by Supplier", // Add a message if needed
            });
            await newNotification.save();
        }
        // now update the quantity
        if (updatedOrder.status === status) {
            matchedFuelType.quantity = matchedFuelType.quantity - UpdatedQuantity;
        }
        else {
            return res.status(404).json({ error: "Order status not found" });
        }
        await getsupplier.save();


        // according to fuelType and pumpName from orderToSupplier collection find same from stocks collection and update the quantity and total quantity accordingly 
        const pumpName = updatedOrder.pumpName;
        const matchedStock = await Stock.findOne({ fuelType: fuelType });
        // console.log("matchedStock", matchedStock);

        if (!matchedStock) {
            return res.status(404).json({ error: "Stock not found" });
        }
        if (updatedOrder.status === "Confirmed") {
            matchedStock.quantity = matchedStock.quantity + UpdatedQuantity;
            matchedStock.totalQuantity = matchedStock.totalQuantity + UpdatedQuantity;
            const UpdatedtotalPrice = matchedStock.unitPrice * matchedStock.quantity
            matchedStock.totalPrice = UpdatedtotalPrice;


            // Update monthly tracker Processing
            const months = [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];
            const saleMonth = updatedOrder.date.getMonth(); // Assuming the date is stored in the 'date' field
            const monthName = months[saleMonth];
            const year = updatedOrder.date.getFullYear();
            const monthYear = `${monthName} ${year}`;

            // Create a new monthly tracker from MonthlySalesTracker
            const monthlyTracker = await OrderToSupplier.findOne({ month: monthYear, fuelType: fuelType });

            const supplier = supplierId;
            const unitePrice = monthlyTracker.unitPrice;
            const quantity = monthlyTracker.quantity;
            const totalPrice = unitePrice * quantity;

            if (monthlyTracker) {
                // Initialize monthlyTracker object
                const newMonthlyTracker = {
                    supplier: supplier,
                    month: monthYear,
                    petrol: fuelType === 'Petrol' ? totalPrice : 0,
                    gasoline: fuelType === 'Gasoline' ? totalPrice : 0,
                    diesel: fuelType === 'Diesel' ? totalPrice : 0,
                    octane: fuelType === 'Octane' ? totalPrice : 0,
                    lpg: fuelType === 'LPG' ? totalPrice : 0,
                    totalSales: totalPrice,
                };

                // Create a new MonthlySalesTracker document
                const res = await SupplierMonthlySales.create(newMonthlyTracker);

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
                await SupplierMonthlySales.findOneAndUpdate({ month: monthYear, fuelType: fuelType }, monthlyTracker, { new: true });
            }
        }
        else {
            return res.status(404).json({ error: "Order status not found" });
        }
        await matchedStock.save();

        // then send a notification for the supplier or recipient to update the quantity and total quantity accordingly.
        const notification = new Notification({
            recipient: updatedOrder.recipient,
            order_id: updatedOrder._id,
            status: updatedOrder.status,
            message: "your order has been Confirm by Supplier", // Add a message if needed
        });
        await notification.save();

        res.json({ message: 'Order status updated successfully', data: updatedOrder });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//get all supplier monthlytranckers 
const geSupplierMonthlyTracker = async (req, res) => {
    const supplier = req.user._id;
    try {
        const monthlyTracker = await SupplierMonthlySales.find({ supplier: supplier });

        if (!monthlyTracker) {
            return res.status(404).json({ error: 'MonthlyTracker not found' });
        }
        res.send(monthlyTracker);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// get all notifications
const getAllSupplierNotifications = async (req, res) => {
    try {
        const recipientNotification = await Notification.find({ recipient: req.user.id });
        res.json(recipientNotification);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// delete notifications from specific user
const deleteSupplierNotifications = async (req, res) => {
    try {
        const deletedNotification = await Notification.findByIdAndRemove(req.params.id);
        if (!deletedNotification) {
            return res.status(404).json({ error: 'Notification not found' });
        }
        res.json({ message: 'Notification deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    getOrders, updateOrderStatus,
    updateOrder, geSupplierMonthlyTracker,
    getAllSupplierNotifications, deleteSupplierNotifications,
    getAllSuppliers
};