const FuelStation = require("../models/FuelStationSchema");
const Notification = require("../models/NotificationSchema");
const MonthlySalesTracker = require("../models/MonthlySalesTrackerSchema");

// Add FuelStation
const createFuelStation = async (req, res) => {
    try {
        const ownerOfStation = req.user.id;
        // Extract the data from the request body
        const { pumpName, address, city } = req.body;

        // Create a new FuelStation instance with the extracted data
        const newFuelStation = new FuelStation({ ownerOfStation, pumpName, address, city });

        // Save the new fuel station to the database
        const savedFuelStation = await newFuelStation.save();

        res.status(201).json({ success: true, message: 'FuelStation added successfully', data: savedFuelStation });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all FuelStations
const getFuelStations = async (req, res) => {
    try {
        const FuelStations = await FuelStation.find();
        res.json(FuelStations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all FuelStations
const getFuelStationById = async (req, res) => {
    try {
        const fuelStation = await FuelStation.findById(req.params.id);
        if (!fuelStation) {
            return res.status(404).json({ error: 'FuelStation not found' });
        }
        res.json(fuelStation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a specific FuelStation by ID
const updateFuelStation = async (req, res) => {
    try {
        const updatedFuelStation = await FuelStation.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedFuelStation) {
            return res.status(404).json({ error: 'FuelStation not found' });
        }
        res.json(updatedFuelStation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a specific FuelStation by ID
const deleteFuelStation = async (req, res) => {
    try {
        const deletedFuelStation = await FuelStation.findByIdAndRemove(req.params.id);
        if (!deletedFuelStation) {
            return res.status(404).json({ error: 'FuelStation not found' });
        }
        res.json({ message: 'FuelStation deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// get all notifications
const getAllNotifications = async (req, res) => {
    try {
        const recipientNotification = await Notification.find();
        res.json(recipientNotification);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// delete notifications from specific user
const deleteNotifications = async (req, res) => {
    try {
        const deletedNotification = await Notification.findByIdAndRemove(req.params.id);
        if (!deletedNotification) {
            return res.status(404).json({ error: 'Notification not found' });
        }
        res.json({ message: 'Notification deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const getSationAllMonthlySales = async (req, res) => {
    try {
        const monthlySales = await MonthlySalesTracker.find();
        res.json(monthlySales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    createFuelStation, getFuelStations, getFuelStationById,
    updateFuelStation, deleteFuelStation, getAllNotifications, deleteNotifications,
    getSationAllMonthlySales
};

