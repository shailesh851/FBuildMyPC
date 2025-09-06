import React, { useEffect, useState } from 'react';
import axios from 'axios';

function GeminiChat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  // Load chat history from backend
  useEffect(() => {
    axios.get('http://localhost:8000/api/chat-history/')
      .then(res => setMessages(res.data))
      .catch(err => console.error('Failed to load history', err));
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]); // show user message
    setInput('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/chatbot/', {
        prompt: input,
      });

      const botMessage = { sender: 'gemini', text: response.data.reply };
      setMessages(prev => [...prev, botMessage]); // show bot reply
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <>
    <div style={{backgroundColor:"black",height:"60px",width:"100%",fontSize:"30px",color:"white",textAlign:"center",fontWeight:"bold"}}>chatbot</div>
    <div style={{
      minHeight: "auto",
      width:"auto",
      backgroundColor: '#e5ddd5',
      display: 'flex',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        backgroundColor: 'white',
        width: '100%',
        maxWidth: '600px',
        height: '80vh',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      }}>
        {/* Chat area */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '15px',
        }}>
          {messages.map((msg, index) => (
            <div key={index} style={{
              display: 'flex',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '10px',
            }}>
              <div style={{
                backgroundColor: msg.sender === 'gemini' ? '#dcf8c6' : '#f0f0f0',
                color: 'black',
                padding: '10px 15px',
                borderRadius: '15px',
                maxWidth: '70%',
              }}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input area */}
        <div style={{
          display: 'flex',
          padding: '10px',
          borderTop: '1px solid #ccc',
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message"
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '20px',
              border: '1px solid #ccc',
              outline: 'none',
              marginRight: '10px',
            }}
          />
          <button
            onClick={handleSend}
            style={{
              backgroundColor: '#25d366',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '20px',
              cursor: 'pointer',
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default GeminiChat;
