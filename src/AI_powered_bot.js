import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './Al_powered_bot.css';

function GeminiChat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  // Load chat history from backend
  useEffect(() => {
    axios.get("https://bbuildmypc.onrender.com/chat/history")
      .then(res => setMessages(res.data))
      .catch(err => console.error('Failed to load history', err));
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');

    try {
      const response = await axios.post('https://bbuildmypc.onrender.com/chat/', {
        conversation: updatedMessages
      });

      const botMessage = { sender: 'gemini', text: response.data.reply };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <>
      <div className="chat-header">chatbot</div>
      <div className="chat-container">
        <div className="chat-box">
          {/* Chat area */}
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                <div className="chat-bubble">{msg.text}</div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input area */}
          <div className="chat-input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message"
              className="chat-input"
            />
            <button onClick={handleSend} className="send-btn">Send</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default GeminiChat;
