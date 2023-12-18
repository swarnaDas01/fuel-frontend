const express = require('express');
const { isAuthenticated, authorizeRoles } = require('../middlewares/auth');
const { createFuelStation, getFuelStations, getFuelStationById,
    updateFuelStation, deleteFuelStation, getAllNotifications,
    deleteNotifications,
    getSationAllMonthlySales
} = require('../controllers/FuelStationController');

const router = express.Router();

router.post('/station/add', isAuthenticated, authorizeRoles('admin', 'manager'), createFuelStation);
router.get('/station/all', isAuthenticated, authorizeRoles('admin', 'manager'), getFuelStations);
router.get('/station/:id', isAuthenticated, authorizeRoles('admin', 'manager'), getFuelStationById);
router.put('/station/:id', isAuthenticated, authorizeRoles('admin', 'manager'), updateFuelStation);
router.delete('/station/:id', isAuthenticated, authorizeRoles('admin', 'manager'), deleteFuelStation);


// Notifications
router.get('/notifications', isAuthenticated, authorizeRoles('admin', 'manager'), getAllNotifications);
router.delete('/notifications/:id', isAuthenticated, authorizeRoles('admin', 'manager'), deleteNotifications);

router.get('/station/monthlySales/all', isAuthenticated, authorizeRoles('admin', 'manager'), getSationAllMonthlySales);

module.exports = router;
