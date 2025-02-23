const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Create a new event
router.post('/', async (req, res) => {
    try {
        const { name, startDate, endDate } = req.body;
        
        const newEvent = new Event({ name, startDate, endDate });
        await newEvent.save();

        res.status(201).json({ message: "Event created successfully", event: newEvent });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Fetch all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
