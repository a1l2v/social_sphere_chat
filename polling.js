const axios = require('axios');

const chatroomId = '67ba1373ae448f7ed3d26fa5'; // Replace with an actual chatroom ID
let lastFetched = null;

async function pollMessages() {
    try {
        const response = await axios.get('http://localhost:5000/api/chat', {
            params: {
                chatroomId: chatroomId,
                lastFetched: lastFetched
            }
        });

        const messages = response.data.messages;

        if (messages && messages.length > 0) {
            // Filter messages that are newer than lastFetched
            const newMessages = lastFetched 
                ? messages.filter(msg => msg.timestamp > lastFetched) 
                : messages; // If first poll, log all messages

            if (newMessages.length > 0) {
                console.log('New Messages:');
                newMessages.forEach(msg => console.log(`[${msg.timestamp}] ${msg.text}`));

                // Update lastFetched to the latest timestamp
                lastFetched = newMessages[newMessages.length - 1].timestamp;
            }
        }
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
}

// Poll every 5 seconds
setInterval(pollMessages, 1000);
