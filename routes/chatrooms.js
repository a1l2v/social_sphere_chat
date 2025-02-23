const express = require('express');
const router = express.Router();
const Chatroom = require('../models/Chatroom');

// Create a new chatroom for an event
router.post('/', async (req, res) => {
    try {
        const { eventId } = req.body;

        const newChatroom = new Chatroom({ eventId });
        await newChatroom.save();

        res.status(201).json({ message: "Chatroom created successfully", chatroom: newChatroom });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Fetch chatrooms for an event
router.get('/:eventId', async (req, res) => {
    try {
        const { eventId } = req.params;
        const chatrooms = await Chatroom.find({ eventId });

        res.json(chatrooms);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
