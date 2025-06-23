import React, { useState, useEffect } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

// Images
import Image1 from '../componants/images/y.jpg'; // Trading plan image 1
import Image2 from '../componants/images/p.png'; // Trading plan image 2

const ChatPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userPlan, setUserPlan] = useState(null);

  const userId = 1; // Simulate logged-in user ID

  // Fetch messages and user plan
  const fetchMessages = async () => {
    try {
      const res = await fetch('http://localhost:8080/cryptoXY_backend_php/getMessages.php');
      const data = await res.json();
      setMessages(data.signals.concat(data.user_chat)); // Merging both signals and user chat
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchActivePlan = async () => {
    try {
      const res = await fetch('http://localhost:8080/cryptoXY_backend_php/checkUserPlan.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId })
      });
      const data = await res.json();
      if (data.success) {
        setUserPlan(data.plan);
      }
    } catch (error) {
      console.error('Error fetching active plan:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchActivePlan();
  }, []);

  const handleSendMessage = async () => {
    if (!userMessage) return;

    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:8080/cryptoXY_backend_php/postUserMessage.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, message: userMessage })
      });

      const data = await res.json();
      if (data.success) {
        setUserMessage('');
        fetchMessages();
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={isDarkMode ? 'min-h-screen bg-gray-900 text-white' : 'min-h-screen bg-white text-gray-900'}>
      <div className="max-w-7xl mx-auto px-6 py-16 relative">
        {/* Theme Toggle Button */}
        <button onClick={() => setIsDarkMode(!isDarkMode)} className={`absolute top-5 right-5 p-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}>
          {isDarkMode ? '🌙 Dark Mode' : '🌞 Light Mode'}
        </button>

        <h1 className="text-4xl font-extrabold text-center mb-12">Signal Plans</h1>

        {/* Trading Live Signals Section */}
        <div className="bg-gray-800 text-white p-4 rounded-lg mb-6">
          <h2 className="text-2xl font-semibold text-center mb-4">Trading Live Signals</h2>
          <div className="space-y-4">
            {messages.filter(msg => msg.admin_id).map((signal, index) => (
              <div key={index} className="p-4 bg-gray-700 rounded-lg">
                <p>{signal.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* User Chat Section */}
        <div className="bg-gray-800 text-white p-4 rounded-lg">
          <h2 className="text-2xl font-semibold text-center mb-4">User Chat</h2>
          <div className="space-y-4">
            {messages.filter(msg => !msg.admin_id).map((chat, index) => (
              <div key={index} className="p-4 bg-gray-700 rounded-lg">
                <p>{chat.message}</p>
              </div>
            ))}
          </div>

          {/* User Input */}
          <div className="mt-6 flex items-center">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              className="flex-1 p-3 bg-gray-800 text-white rounded-lg"
              placeholder="Type your message"
            />
            <button onClick={handleSendMessage} className="ml-3 p-3 bg-blue-600 text-white rounded-lg">
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
