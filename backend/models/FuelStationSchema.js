const mongoose = require('mongoose');

const fuelStationSchema = new mongoose.Schema({
    ownerOfStation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    pumpName: String,
    stuff: {
        manager: {},
        cashier: {},
    },
    stocksId: [],
    ordersId: [],
    invoicesId: [],
    allSalesId: [],
    address: String,
    city: String,
    services: {
        type: [String],
        enum: ['Car Wash', 'Air Pump', 'Convenience Store'],  // Available services
    },
    createdAt: { type: Date, default: Date.now },
});

const FuelStation = mongoose.model('FuelStation', fuelStationSchema);

module.exports = FuelStation;
