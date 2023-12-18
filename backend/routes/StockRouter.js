const express = require("express");
const { isAuthenticated, authorizeRoles } = require('../middlewares/auth');
const router = express.Router();
const {
    AddSupplierStock,
    SingleSupplierStock,
    updateSupplierStock,
    DeleteSupplierStock,
    AddAdminStock,
    GetAdminAllStock,
    SingleAdminStock,
    updateAdminStock,
    DeleteAdminStock,
    GetMySupplierAllStock
} = require("../controllers/StockController");

// Supplier routes
router.post('/supplier/stock/add', isAuthenticated, authorizeRoles('supplier'), AddSupplierStock);
router.get('/supplier/stock/all', isAuthenticated, authorizeRoles('admin', 'manager', 'employee', 'supplier'), GetMySupplierAllStock);
router.get('/supplier/stock/:id', isAuthenticated, authorizeRoles('admin', 'manager', 'employee', 'supplier'), SingleSupplierStock);
router.put('/supplier/stock/update/:id', isAuthenticated, authorizeRoles('supplier'), updateSupplierStock);
router.delete('/supplier/stock/delete/:id', isAuthenticated, authorizeRoles('supplier'), DeleteSupplierStock);

// Admin routes
router.post('/station/stock/add', isAuthenticated, authorizeRoles('admin', 'manager'), AddAdminStock);
router.get('/station/stock/all', isAuthenticated, authorizeRoles('admin', 'manager'), GetAdminAllStock);
router.get('/station/stock/:id', isAuthenticated, authorizeRoles('admin', 'manager'), SingleAdminStock);
router.put('/station/stock/update/:id', isAuthenticated, authorizeRoles('admin', 'manager'), updateAdminStock);
router.delete('/station/stock/delete/:id', isAuthenticated, authorizeRoles('admin', 'manager'), DeleteAdminStock);



module.exports = router;