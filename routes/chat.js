const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const checkRegistration = require('../middleware/checkRegistration');

// Send a new message
router.post('/',checkRegistration, async (req, res) => {
    try {
        const { chatroomId, userId, text } = req.body;
        
        const newMessage = new Message({ chatroomId, userId, text });
        await newMessage.save();

        res.status(201).json({ message: "Message sent successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Fetch new messages (Polling)
router.get('/', async (req, res) => {
    try {
        const { chatroomId, lastFetched } = req.query;

        const query = { chatroomId };
        if (lastFetched) {
            query.timestamp = { $gt: new Date(lastFetched) }; // Fetch messages after lastFetched time
        }

        const messages = await Message.find(query).sort({ timestamp: 1 });

        res.json({ messages });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;