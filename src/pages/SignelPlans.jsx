import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Paths to your images
import Image1 from '../componants/images/y.jpg';  // Update with correct path
import Image2 from '../componants/images/p.png';  // Update with correct path

const SignalPlansPage = () => {
  // State to manage the theme (dark/light mode)
  const [isDarkMode, setIsDarkMode] = useState(true);
  // State to manage the visibility of the glance view (sign up / sign in prompt)
  const [showGlanceView, setShowGlanceView] = useState(false);

  // Toggle dark mode and light mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Show the glance view when "Join Now" button is clicked
  const handleJoinClick = () => {
    setShowGlanceView(true);
  };

  // Hide the glance view if the user clicks outside the box (or on the backdrop)
  const closeGlanceView = () => {
    setShowGlanceView(false);
  };

  return (
    <div className={isDarkMode ? 'min-h-screen bg-gray-900 text-white' : 'min-h-screen bg-white text-gray-900'}>
      <div className="max-w-7xl mx-auto px-6 py-16 relative">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className={`absolute top-5 right-5 p-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'} focus:outline-none`}
        >
          {isDarkMode ? '🌙 Dark Mode' : '🌞 Light Mode'}
        </button>

        <h1 className="text-4xl font-extrabold text-center mb-12">Signal Plans</h1>

        {/* Two Images Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-0">
          {/* First Image: Whales Club */}
          <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} hover:shadow-xl transition-shadow`}>
            <img src={Image1} alt="Whales Club" className="w-full h-auto object-cover rounded-lg" />
            <h2 className="text-2xl font-semibold text-center mt-4">Whales Club</h2>
            <p className="text-center mt-2">
              Access to One and only Sri Lankan forex and crypto trading community.
            </p>
            <p className="text-center mt-4 font-medium text-sm">
              Join our elite community of traders who are seizing opportunities and maximizing returns. Let's unlock the doors to financial freedom together!
            </p>

            {/* Disclaimer */}
            <p className="text-center mt-4 text-xs italic">
              <strong>Disclaimer:</strong> Please be advised that while I share insights, strategies, and information related to forex trading, I am not a licensed financial advisor. The content provided in this group, including any analyses, opinions, discussions, and trade ideas, is for informational and educational purposes only.
            </p>

            {/* Features */}
            <div className="mt-6 space-y-2">
              <p className="text-center font-medium">Features:</p>
              <ul className="list-disc list-inside text-sm">
                <li>News trading event</li>
                <li>Crypto and forex market update</li>
                <li>Individual Support</li>
                <li>Live Trading</li>
                <li>Discord access</li>
              </ul>
            </div>

            {/* Join Now Button */}
            <button
              onClick={handleJoinClick}
              className={`mt-4 w-full py-2 rounded-lg hover:opacity-80 transition ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`}
            >
              Join Now for $11.99/month
            </button>
          </div>

          {/* Second Image: Whales Club Pro */}
          <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} hover:shadow-xl transition-shadow`}>
            <img src={Image2} alt="Whales Club Pro" className="w-full h-auto object-cover rounded-lg" />
            <h2 className="text-2xl font-semibold text-center mt-4">Whales Club Pro</h2>
            <p className="text-center mt-2">
              Access to One and only Sri Lankan forex and crypto trading community with Pro features.
            </p>
            <p className="text-center mt-4 font-medium text-sm">
              Join our elite community of traders who are seizing opportunities and maximizing returns. Let's unlock the doors to financial freedom together!
            </p>

            {/* Disclaimer */}
            <p className="text-center mt-4 text-xs italic">
              <strong>Disclaimer:</strong> Please be advised that while I share insights, strategies, and information related to forex trading, I am not a licensed financial advisor. The content provided in this group, including any analyses, opinions, discussions, and trade ideas, is for informational and educational purposes only.
            </p>

            {/* Features */}
            <div className="mt-6 space-y-2">
              <p className="text-center font-medium">Features:</p>
              <ul className="list-disc list-inside text-sm">
                <li>News trading event</li>
                <li>Crypto and forex market update</li>
                <li>Individual Support</li>
                <li>Live Trading</li>
                <li>Discord access</li>
              </ul>
            </div>

            {/* Join Now Button */}
            <button
              onClick={handleJoinClick}
              className={`mt-4 w-full py-2 rounded-lg hover:opacity-80 transition ${isDarkMode ? 'bg-green-600 text-white' : 'bg-green-500 text-white'}`}
            >
              Join Now for $19.99/month
            </button>
          </div>

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
    </div>
  );
};

export default SignalPlansPage;
