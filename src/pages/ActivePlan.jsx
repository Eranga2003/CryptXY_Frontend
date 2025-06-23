import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Paths to your images
import Image1 from '../componants/images/y.jpg';  // Update with correct path
import Image2 from '../componants/images/p.png';  // Update with correct path

const SignalPlansPageB = () => {
  // State to manage the theme (dark/light mode)
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showGlanceView, setShowGlanceView] = useState(false);
  const [userPlan, setUserPlan] = useState(null);  // State to store active plan details
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const userId = 1; // Simulate logged-in user ID (replace with actual user ID)

  // Toggle dark mode and light mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Fetch active plan for the user
  const fetchActivePlan = async () => {
    try {
      const res = await fetch('http://localhost:8080/cryptoXY_backend_php/checkUserPlan.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId }),
      });

      const data = await res.json();

      if (data.success) {
        setUserPlan(data.plan);  // Set the active plan details
      } else {
        setMessage(data.message);  // Show the message if no active plan is found
      }
    } catch (error) {
      setMessage("🚫 Server error: " + error.message);
    }
  };

  useEffect(() => {
    fetchActivePlan();  // Fetch active plan when the component mounts
  }, []);

  // Join a plan
  const handleJoinPlan = async (planName) => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:8080/cryptoXY_backend_php/joinPlan.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, plan_name: planName }),
      });

      const data = await res.json();
      setMessage(data.message);

      if (data.success) {
        fetchActivePlan();  // Fetch the newly active plan
      }
    } catch (error) {
      setMessage("🚫 Server error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinClick = () => {
    setShowGlanceView(true);
  };

  const closeGlanceView = () => {
    setShowGlanceView(false);
  };

return (
    <div className={isDarkMode ? 'min-h-screen bg-gray-900 text-white' : 'min-h-screen bg-white text-gray-900'}>
        <div className="max-w-7xl mx-auto px-6 py-16 relative">
            <button
                onClick={toggleTheme}
                className={`absolute top-5 right-5 p-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'} focus:outline-none`}
            >
                {isDarkMode ? '🌙 Dark Mode' : '🌞 Light Mode'}
            </button>

            <h1 className="text-4xl font-extrabold text-center mb-12">Signal Plans</h1>

            {/* Show Active Plan or Join Now Plan */}
            {userPlan ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-0">
                    {/* Active Plan Display */}
                    <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} hover:shadow-xl transition-shadow`}>
                        <img src={Image1} alt="Active Plan" className="w-full h-auto object-cover rounded-lg" />
                        <h2 className="text-2xl font-semibold text-center mt-4">{userPlan.plan_name}</h2>
                        <p className="text-center mt-2">
                            You are currently subscribed to this plan!
                        </p>
                        <p className="text-center mt-4 font-medium text-sm">
                            Start Date: {userPlan.start_date}
                        </p>
                    </div>
                    
                    {/* Chat with us button - moved more to the right */}
                    <div className="absolute bottom-10 right-10">
                      <button
                        className="p-4 bg-blue-600 text-white rounded-full shadow-lg hover:scale-110 transition duration-300 ease-in-out"
                        onClick={() => window.location.href = '/ChatPage'}
                      >
                        live Chat
                      </button>
                    </div>
                    <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} hover:shadow-xl transition-shadow`}>
                        <img src={Image1} alt="Whales Club" className="w-full h-auto object-cover rounded-lg" />
                        <h2 className="text-2xl font-semibold text-center mt-4">Whales Club</h2>
                        <p className="text-center mt-2">
                            Access to One and only Sri Lankan forex and crypto trading community.
                        </p>
                        <button
                            onClick={() => handleJoinPlan('Whales Club')}
                            className={`mt-4 w-full py-2 rounded-lg hover:opacity-80 transition ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`}
                        >
                            {isLoading ? 'Joining...' : 'Join Now for $11.99/month'}
                        </button>
                    </div>

                    <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} hover:shadow-xl transition-shadow`}>
                        <img src={Image2} alt="Whales Club Pro" className="w-full h-auto object-cover rounded-lg" />
                        <h2 className="text-2xl font-semibold text-center mt-4">Whales Club Pro</h2>
                        <p className="text-center mt-2">
                            Access to One and only Sri Lankan forex and crypto trading community with Pro features.
                        </p>
                        <button
                            onClick={() => handleJoinPlan('Whales Club Pro')}
                            className={`mt-4 w-full py-2 rounded-lg hover:opacity-80 transition ${isDarkMode ? 'bg-green-600 text-white' : 'bg-green-500 text-white'}`}
                        >
                            {isLoading ? 'Joining...' : 'Join Now for $19.99/month'}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center min-h-[300px]">
                    <img src={Image1} alt="No Active Plan" className="w-40 h-40 object-cover rounded-lg mb-6" />
                    <h2 className="text-2xl font-semibold text-center mb-4">No Active Plan</h2>
                    <p className="text-center mb-4">{message || "You don't have an active plan. Join now to get started!"}</p>
                    <button
                        onClick={handleJoinClick}
                        className={`px-8 py-3 rounded-lg hover:opacity-80 transition ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`}
                    >
                        Join Now
                    </button>
                </div>
            )}

            {/* Glance View - Modal Style */}
            {showGlanceView && (
                <div
                    className="absolute inset-0 z-20 flex justify-center items-center backdrop-blur-sm"
                    onClick={closeGlanceView} // Close when clicking outside
                >
                    <div
                        className="bg-white/60 rounded-lg p-8 shadow-lg max-w-md w-full relative backdrop-blur-md"
                        onClick={(e) => e.stopPropagation()} // Prevent close on inner content click
                    >
                        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up or Sign In</h2>
                        <p className="text-center mb-6">To proceed with the membership, please either sign in or sign up.</p>

                        <div className="flex justify-center space-x-6">
                            <Link to="/LoginPageB">
                                <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                    Sign In
                                </button>
                            </Link>
                            <Link to="/SignUpPageB">
                                <button className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                        {/* Close Modal Button */}
                        <button
                            onClick={closeGlanceView}
                            className="absolute top-2 right-2 text-xl font-bold text-gray-500 hover:text-black"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    </div>
);
};

export default SignalPlansPageB;
