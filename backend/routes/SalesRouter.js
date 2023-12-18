const express = require('express');
const { isAuthenticated, authorizeRoles } = require('../middlewares/auth');
const { createSales, getAllSales, getSalesById, updateSales, deleteSales, updateSalesStatus } = require('../controllers/SalesController');
const router = express.Router();

router.post('/sales/add', isAuthenticated, authorizeRoles('admin', 'manager'), createSales);
router.get('/sales/all', isAuthenticated, authorizeRoles('admin', 'manager'), getAllSales);
router.get('/sales/:id', isAuthenticated, authorizeRoles('admin', 'manager'), getSalesById);
router.put('/sales/:id', isAuthenticated, authorizeRoles('admin', 'manager'), updateSales);
router.delete('/sales/:id', isAuthenticated, authorizeRoles('admin', 'manager'), deleteSales);

router.put('/sales/status/:id', isAuthenticated, authorizeRoles('admin', 'manager'), updateSalesStatus);


module.exports = router;
