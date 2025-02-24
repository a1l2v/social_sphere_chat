import { useState, useEffect } from "react";
import axios from "axios";
import "./ChatApp.css";

function ChatApp() {
  const [chatroomId, setChatroomId] = useState("");
  const [userId, setUserId] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isChatVisible, setIsChatVisible] = useState(false);
  let lastFetched = null;

  useEffect(() => {
    if (isChatVisible) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/chat", {
            params: {
              chatroomId: chatroomId,
              lastFetched: lastFetched
            }
          });

          const receivedMessages = response.data.messages;
          if (receivedMessages && receivedMessages.length > 0) {
            const newMessages = lastFetched
              ? receivedMessages.filter(msg => msg.timestamp > lastFetched)
              : receivedMessages;

            if (newMessages.length > 0) {
              setMessages(prevMessages => [...prevMessages, ...newMessages]);
              lastFetched = newMessages[newMessages.length - 1].timestamp;
            }
          }
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };

      fetchMessages();
      const interval = setInterval(fetchMessages, 2000);
      return () => clearInterval(interval);
    }
  }, [isChatVisible, chatroomId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      await axios.post("http://localhost:5000/api/chat", {
        chatroomId,
        userId,
        text: newMessage,
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-container">
      {!isChatVisible ? (
        <div className="join-chat">
          <input
            type="text"
            placeholder="Enter Chatroom ID"
            value={chatroomId}
            onChange={(e) => setChatroomId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <button onClick={() => setIsChatVisible(true)}>Join Chat</button>
        </div>
      ) : (
        <div className="chat-ui">
          <div className="chat-header">Chatroom: {chatroomId}</div>
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={msg.userId === userId ? "my-message" : "other-message"}>
                <div className="message-content">{msg.text}</div>
              </div>
            ))}
          </div>
          <div className="input-area">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatApp;
