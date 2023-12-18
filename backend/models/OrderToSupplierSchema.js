const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    feulStation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FuelStation',
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
    },
    fuelType: {
        type: String,
        required: [true, 'Fuel type is required'],
    },
    pumpName: {
        type: String,
        required: [true, 'Pump name is required'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
    },
    unitPrice: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        default: 'Processing',
        enum: ['Processing', 'Confirmed', 'Cancelled']
    },
    paymentMethod: {
        type: String,
        default: 'Bkash',
        enum: ['Cash', 'Credit Card', 'Bank Transfer', 'Bkash']
    },
    totalPrice: {
        type: Number,
        default: 0,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const OrderToSupplier = mongoose.model('OrderToSupplier', orderSchema);

module.exports = OrderToSupplier;
