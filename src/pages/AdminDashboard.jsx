import React, { useState } from 'react';
import ChatPage from './ChatPage'; // Import the ChatPage component
import { FaPaperPlane } from 'react-icons/fa';
import ChatPageB from './ChatPageAdmin.jsx'; // Import the ChatPageB component
export default function AdminDashboard() {
  const [activePage, setActivePage] = useState(1); // Track the active page

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 px-4 py-6 border-r border-gray-800 sticky top-0 h-screen">
        <h1 className="text-xl font-bold mb-8 flex items-center gap-2">
          <span className="text-blue-500">🔥</span> Admin Panel
        </h1>
        <div>
          <ul className="mt-2 space-y-4">
            {/* Sidebar Buttons */}
            <li
              className={`cursor-pointer flex items-center gap-2 p-2 rounded-md hover:bg-gray-800 ${
                activePage === 1 ? "bg-gray-700" : ""
              }`}
              onClick={() => handlePageChange(1)}
            >
              <span className="w-5 h-5">💬</span>
              <span className="text-gray-300">Chat</span>
            </li>
            <li
              className={`cursor-pointer flex items-center gap-2 p-2 rounded-md hover:bg-gray-800 ${
                activePage === 2 ? "bg-gray-700" : ""
              }`}
              onClick={() => handlePageChange(2)}
            >
              <span className="w-5 h-5">💵</span>
              <span className="text-gray-300">Trade History</span>
            </li>
            <li
              className={`cursor-pointer flex items-center gap-2 p-2 rounded-md hover:bg-gray-800 ${
                activePage === 3 ? "bg-gray-700" : ""
              }`}
              onClick={() => handlePageChange(3)}
            >
              <span className="w-5 h-5">📄</span>
              <span className="text-gray-300">Trade Overview</span>
            </li>
            <li
              className={`cursor-pointer flex items-center gap-2 p-2 rounded-md hover:bg-gray-800 ${
                activePage === 4 ? "bg-gray-700" : ""
              }`}
              onClick={() => handlePageChange(4)}
            >
              <span className="w-5 h-5">👥</span>
              <span className="text-gray-300">User Details</span>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 py-12 px-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Render Different Content Based on Active Page */}
          {activePage === 1 && <ChatPageB />} {/* Display ChatPage when Chat is clicked */}
          {activePage === 2 && (
            <div>
              <h2 className="text-3xl font-semibold mb-4">Trade History</h2>
              <p>Content for Trade History...</p>
            </div>
          )}
          {activePage === 3 && (
            <div>
              <h2 className="text-3xl font-semibold mb-4">Trade Overview</h2>
              <p>Content for Trade Overview...</p>
            </div>
          )}
          {activePage === 4 && (
            <div>
              <h2 className="text-3xl font-semibold mb-4">User Details</h2>
              <p>Content for User Details...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
