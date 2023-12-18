const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SalesSchema = new Schema({
    // user id is employee id
    employeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    pumpName: {
        type: String,
        required: true,
        enum: ['HEW', "ABC", "EXE", "WYE"],
    },
    fuelType: {
        type: String,
        enum: ['Diesel', 'Gasoline', 'Octane', 'Petrol', 'LPG'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
    },
    unitPrice: {
        type: Number,
        required: [true, 'Unit Price is required']
    },
    sellingPrice: {
        type: Number,
        required: [true, 'Selling Price is required'],
    },
    customerContact: {
        type: String,
        required: [true, 'Customer Contact is required'],
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['Bkash', 'CreditCard', 'Cash', 'Nogot'],
    },
    // generate auto invoice number
    invoiceNumber: {
        type: String,
    },
    totalPrice: {
        type: Number,
        default: 0,
    },
    Salestax: {
        type: Number,
        default: 0,
    },
    paymentStatus: {
        type: String,
        default: 'Unpaid',
        enum: ['Paid', 'Unpaid'],
    },
    transactionStatus: {
        type: String,
        default: 'Pending',
        enum: ['Completed', 'Pending'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});


// generate automatically invoice number
SalesSchema.pre('save', async function (next) {
    try {
        const lastOrder = await Sales.findOne({}).sort({ createdAt: -1 }).limit(1);
        if (!lastOrder) {
            this.invoiceNumber = `INV${new Date().getFullYear()}${new Date().getMonth() + 1}${new Date().getDate()}001`;
        } else {
            const lastOrderNumber = lastOrder.invoiceNumber;
            const splitOrderNumber = lastOrderNumber.split('INV');
            const orderNumber = parseInt(splitOrderNumber[1]) + 1;
            this.invoiceNumber = `INV${orderNumber}`;
        }
        next();
    } catch (err) {
        next(err);
    }
});



const Sales = mongoose.model('Sales', SalesSchema);
module.exports = Sales;