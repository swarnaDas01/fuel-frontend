const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User who should receive the notification
    order_id: String, // Order id
    status: String, // Order status
    message: String, // Notification message
    isRead: { type: Boolean, default: false }, // Notification read status
    createdAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
