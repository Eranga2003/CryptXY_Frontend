import React from 'react';
import { FaGoogle, FaApple, FaWallet } from 'react-icons/fa';
import { SiBinance } from 'react-icons/si';

export default function SignUpPage() {
  return (
    <div className="bg-[#0b1120] h-screen flex justify-center items-center px-4">
      <div className="bg-[#1a1f2e] p-8 rounded-2xl shadow-2xl w-full max-w-md text-white relative">
        {/* Header Tabs */}
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

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email address..."
            className="w-full px-4 py-3 rounded-lg bg-[#2b3144] border border-[#39425d] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password..."
            className="w-full px-4 py-3 rounded-lg bg-[#2b3144] border border-[#39425d] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Checkbox */}
        <div className="flex items-start mb-6">
          <input
            type="checkbox"
            id="subscribe"
            className="mt-1 mr-3 w-4 h-4 bg-gray-600 rounded border-gray-500 focus:ring-blue-500"
          />
          <label htmlFor="subscribe" className="text-sm text-gray-300">
            Please keep me updated by email with the latest crypto news, research findings, reward programs, event updates, coin listings and more information from <span className="font-semibold">CoinMarketCap</span>.
          </label>
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-semibold transition duration-200">
          Create Account
        </button>
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
