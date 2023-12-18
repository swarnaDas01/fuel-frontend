const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSchema = new Schema({
    pumpName: {
        type: String,
        required: [true, 'Pump name is required.'],
        enum: ['HEW', "ABC", "EXE", "WYE"],
    },
    fuelType: {
        type: String,
        required: [true, 'Fuel type is required.'],
        enum: ['Petrol', 'Gasoline', 'Diesel', 'Octane', 'LPG']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required.'],
    },
    unitPrice: {
        type: Number,
        required: [true, 'Unit price is required.'],
    },
    sellingPrice: {
        type: Number,
        required: [true, 'Selling price is required.'],
    },
    totalPrice: {
        type: Number,
        default: 0,
    },
    lastStockUpdate: {
        type: Date,
        default: Date.now,
    },
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;

