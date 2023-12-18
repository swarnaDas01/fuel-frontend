const express = require('express');
const { isAuthenticated, authorizeRoles } = require('../middlewares/auth');
const { createOrder, getOrders, updateOrder, deleteOrder } = require('../controllers/OrderToSupplierController');
const router = express.Router();

router.post('/ordertosupplier/add', isAuthenticated, authorizeRoles('admin', 'manager'), createOrder);
router.get('/ordertosupplier/all', isAuthenticated, authorizeRoles('admin', 'manager'), getOrders);
router.put('/ordertosupplier/update/:id', isAuthenticated, authorizeRoles('admin', 'manager'), updateOrder);
router.delete('/ordertosupplier/delete/:id', isAuthenticated, authorizeRoles('admin', 'manager'), deleteOrder);


module.exports = router;
