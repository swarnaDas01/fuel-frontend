const express = require('express');
const { isAuthenticated, authorizeRoles } = require('../middlewares/auth');
const { updateOrderStatus, getOrders, updateOrder, getAllSupplierNotifications, deleteSupplierNotifications, getAllSuppliers, geSupplierMonthlyTracker } = require('../controllers/SupplierController');
const router = express.Router();


router.get('/supplier/all', isAuthenticated, authorizeRoles('admin'), getAllSuppliers);
router.get('/orders', isAuthenticated, authorizeRoles('supplier'), getOrders);
router.put('/order/:id', isAuthenticated, authorizeRoles('supplier'), updateOrder);
router.get('/orders', isAuthenticated, authorizeRoles('supplier'), getAllSupplierNotifications);

router.get('/supplier/notifications', isAuthenticated, authorizeRoles('supplier'), getAllSupplierNotifications);
router.delete('/supplier/notification/:id', isAuthenticated, authorizeRoles('supplier'), deleteSupplierNotifications);

// update order status by - Supplied, Pending, Cancelled
router.put('/supplier/confirmOrder/:id', isAuthenticated, authorizeRoles('supplier'), updateOrderStatus);
router.get('/supplier/monthlySales/all', isAuthenticated, authorizeRoles('supplier'), geSupplierMonthlyTracker);


module.exports = router;
