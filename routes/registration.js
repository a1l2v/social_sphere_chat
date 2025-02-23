const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration'); // Import the model

// Register a user for an event
router.post('/register', async (req, res) => {
    try {
        const { userId, eventId } = req.body;

        // Check if the user is already registered
        const existingRegistration = await Registration.findOne({ userId, eventId });
        if (existingRegistration) {
            return res.status(400).json({ message: 'User already registered for this event' });
        }

        // Create a new registration
        const registration = new Registration({ userId, eventId });
        await registration.save();

        res.status(201).json({ message: 'Registration successful', registration });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;