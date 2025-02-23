const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chatroomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chatroom' }, // Links message to a chatroom
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User
    text: String,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);
