import React, { useState, useEffect } from 'react';
import { FaComments } from 'react-icons/fa'; // Import the chat icon
import { useNavigate } from 'react-router-dom';

const MyPlansPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [userPlan, setUserPlan] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const userId = 1; // Replace with real user ID logic

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const fetchUserPlan = async () => {
    try {
      const response = await fetch('http://localhost:8080/cryptoXY_backend_php/checkUserPlan.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId }),
      });

      const data = await response.json();
      if (data.success) {
        setUserPlan(data.plan);
      } else {
        setMessage(data.message || "No active plan found.");
      }
    } catch (error) {
      setMessage("Server error: " + error.message);
    }
  };

  useEffect(() => {
    fetchUserPlan();
  }, []);

  return (
    <div className={isDarkMode ? 'min-h-screen bg-gray-900 text-white' : 'min-h-screen bg-white text-gray-900'}>
      <div className="max-w-4xl mx-auto px-4 py-16 relative">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className={`absolute top-5 right-5 p-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          {isDarkMode ? '🌙 Dark Mode' : '🌞 Light Mode'}
        </button>

        {/* Page title */}
        <h1 className="text-3xl font-bold text-center mb-10">My Active Plan</h1>

        {/* Plan info or message */}
        {userPlan ? (
          <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <h2 className="text-2xl font-semibold text-center">{userPlan.plan_name}</h2>
            <p className="text-center mt-2">Plan Start Date: {userPlan.start_date}</p>
            <p className="text-center mt-4 text-sm italic">You have successfully joined this plan.</p>
          </div>
        ) : (
          <div className="text-center text-lg mt-12">
            {message || "You have not subscribed to any plan."}
          </div>
        )}

        {/* Floating Chat Icon Button */}
        <button
          onClick={() => navigate('/ChatPage')}
          className="fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
          title="Chat with us"
        >
          <FaComments size={24} />
        </button>
      </div>
    </div>
  );
};

export default MyPlansPage;
