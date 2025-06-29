import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaApple, FaWallet } from 'react-icons/fa';
import { SiBinance } from 'react-icons/si';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await fetch("http://localhost:8080/cryptoXY_backend_php/register.php", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          first_name: firstName,
          last_name: lastName
        }),
      });

      const data = await res.json();

      if (data.success && data.user) {
        // ✅ Save user to localStorage
        localStorage.setItem("user", JSON.stringify({
          id: data.user.id,
          email: data.user.email,
          first_name: data.user.first_name
        }));

        setMessage(`✅ ${data.message}`);
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');

        // ✅ Redirect to homepage
        navigate('/LhomePage');
      } else {
        setMessage(`❌ ${data.message}`);
        localStorage.removeItem("user");
      }
    } catch (error) {
      localStorage.removeItem("user");
      setMessage("🚫 Server error: " + error.message);
    }
  };

  return (
    <div className="bg-[#0b1120] h-screen flex justify-center items-center px-4">
      <div className="bg-[#1a1f2e] p-8 rounded-2xl shadow-2xl w-full max-w-md text-white relative">

        {/* Tabs */}
        <div className="flex justify-center mb-6 space-x-6">
          <button className="text-lg font-semibold text-gray-400 hover:text-white transition">Log In</button>
          <button className="text-lg font-bold border-b-2 border-white pb-1">Sign Up</button>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-3 mb-6">
          <OAuthButton icon={<FaGoogle />} text="Continue with Google" />
          <OAuthButton icon={<FaApple />} text="Continue with Apple" />
          <OAuthButton icon={<SiBinance />} text="Continue with Binance" />
          <OAuthButton icon={<FaWallet />} text="Continue with Wallet" />
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-700" />
          <span className="mx-4 text-sm text-gray-400">OR CONTINUE WITH EMAIL</span>
          <hr className="flex-grow border-gray-700" />
        </div>

        {/* First Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name..."
            className="w-full px-4 py-3 rounded-lg bg-[#2b3144] border border-[#39425d] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name..."
            className="w-full px-4 py-3 rounded-lg bg-[#2b3144] border border-[#39425d] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address..."
            className="w-full px-4 py-3 rounded-lg bg-[#2b3144] border border-[#39425d] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password..."
            className="w-full px-4 py-3 rounded-lg bg-[#2b3144] border border-[#39425d] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Sign Up Button */}
        <button
          onClick={handleSignup}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-semibold transition duration-200"
        >
          Create Account
        </button>

        {/* Message */}
        {message && (
          <div className="mt-4 text-sm text-center text-yellow-400">{message}</div>
        )}
      </div>
    </div>
  );
}

// OAuth Button Component
function OAuthButton({ icon, text }) {
  return (
    <button className="w-full flex items-center justify-center space-x-3 bg-[#2b3144] hover:bg-[#39425d] text-white py-2 px-4 rounded-lg transition duration-200">
      <span className="text-xl">{icon}</span>
      <span className="text-sm font-medium">{text}</span>
    </button>
  );
}
