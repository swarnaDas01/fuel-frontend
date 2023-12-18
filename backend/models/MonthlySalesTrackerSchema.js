const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MonthlySalesTrackerSchema = new Schema({
    month: {
        type: String,
    },
    petrol: {
        type: Number,
        default: 0,
    },
    gasoline: {
        type: Number,
        default: 0,
    },
    diesel: {
        type: Number,
        default: 0,
    },
    octane: {
        type: Number,
        default: 0,
    },
    lpg: {
        type: Number,
        default: 0,
    },
    totalSales: {
        type: Number,
        default: 0,
    },
});


MonthlySalesTrackerSchema.pre('save', function (next) {
    // Calculate totalSales before saving the document
    this.totalSales = this.petrol + this.gasoline + this.diesel + this.octane + this.lpg;
    next();
});



const MonthlySalesTracker = mongoose.model('MonthTracker', MonthlySalesTrackerSchema);

module.exports = MonthlySalesTracker;
