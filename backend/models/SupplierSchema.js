const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fuelQuantitySchema = new Schema({
    fuelType: {
        type: String,
        required: [true, 'Fuel type is required'],
        enum: ['Gasoline', 'Diesel', 'Octane', 'Petrol']
    },
    quantity: Number, // in liters
    unitPrice: Number,
    sellingPrice: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
});


const supplierSchema = new Schema({
    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    ordersFromStation: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'OrderToSupplier',
    },
    about: {},
    name: String,
    contact: String,
    address: String,
    email: String,
    fuelQuantities: [fuelQuantitySchema],
    minimumOrderQuantity: Number, // in liters
    maximumOrderQuantity: Number, // in liters
    deliveryTime: String,
    paymentMethods: {
        type: [String],
        enum: ['Cash', 'Bank Transfer', 'Cheque']
    }
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;
