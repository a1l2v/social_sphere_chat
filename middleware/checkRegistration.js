const Registration = require('../models/Registration');
const Chatroom = require('../models/Chatroom');

const checkRegistration = async (req, res, next) => {
    const { userId, chatroomId } = req.body;

    console.log(`Checking registration for userId: ${userId} and chatroomId: ${chatroomId}`);

    try {
        // Fetch the eventId linked to the chatroom
        const chatroom = await Chatroom.findById(chatroomId);
        if (!chatroom) {
            console.log("Chatroom not found");
            return res.status(404).json({ message: "Chatroom not found" });
        }

        const eventId = chatroom.eventId; // Assuming chatroom schema has eventId
        console.log(`Event ID for chatroom: ${eventId}`);

        // Check if the user is registered for the event
        const isRegistered = await Registration.findOne({ userId: userId, eventId });
        console.log(`Registration found: ${isRegistered}`);

        if (!isRegistered) {
            console.log("User is not registered for this event");
            return res.status(403).json({ message: "You are not registered for this event." });
        }

        next(); // Proceed if the user is registered
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ message: "Server error", error });
    }
};

module.exports = checkRegistration;