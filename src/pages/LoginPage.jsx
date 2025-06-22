import React, { useState } from 'react';
import CryptX from "../componants/images/Crypt x (1).png";
import { FaGoogle, FaApple, FaWallet } from 'react-icons/fa';
import { SiBinance } from 'react-icons/si';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("❗ Please fill out both fields.");
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/cryptoXY_backend_php/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      setMessage(data.message);

      if (data.success) {
        // Handle successful login (e.g., redirect to dashboard)
        console.log('Login Successful');
      }
    } catch (error) {
      setMessage("🚫 Server error: " + error.message);
    }
  };

  return (
    <div className="bg-[#0b1120] h-screen flex justify-center items-center px-4">
      <div className="bg-[#1a1f2e] p-8 rounded-2xl shadow-2xl w-full max-w-md text-white relative">
        <img
          src={CryptX}
          alt="CryptX Logo"
          className="w-24 h-24 mx-auto mb-6 rounded-full"
        />
        <div className="flex justify-center mb-6 space-x-6">
          <button className="text-lg font-bold border-b-2 border-white pb-1">Log In</button>
        </div>

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
          <div className="text-right mt-1 text-sm text-blue-400 hover:underline cursor-pointer">Forgot password?</div>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 mt-4 rounded-lg font-semibold transition duration-200"
        >
          Log In
        </button>

        {/* Feedback Message */}
        {message && (
          <div className="mt-4 text-sm text-center text-yellow-400">{message}</div>
        )}

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-700" />
          <span className="mx-4 text-sm text-gray-400">OR</span>
          <hr className="flex-grow border-gray-700" />
        </div>

        <div className="space-y-3">
          <OAuthButton icon={<FaGoogle />} text="Continue with Google" />
          <OAuthButton icon={<FaApple />} text="Continue with Apple" />
          <OAuthButton icon={<SiBinance />} text="Continue with Binance" />
          <OAuthButton icon={<FaWallet />} text="Continue with Wallet" />
        </div>
      </div>
    </div>
  );
}

function OAuthButton({ icon, text }) {
  return (
    <button className="w-full flex items-center justify-center space-x-3 bg-[#2b3144] hover:bg-[#39425d] text-white py-2 px-4 rounded-lg transition duration-200">
      <span className="text-xl">{icon}</span>
      <span className="text-sm font-medium">{text}</span>
    </button>
  );
}
