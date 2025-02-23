const mongoose = require('mongoose');

const chatroomSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }, // Links chatroom to an event
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chatroom', chatroomSchema);
