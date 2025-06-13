import React from "react";
import { Link } from "react-router-dom";
import CryptX from "../componants/images/Crypt x (1).png";
import { ChevronDown, LayoutGrid } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm py-5 px-0">
      <div className="w-full flex items-center justify-between px-4">
        {/* Left section: logo + nav */}
        <div className="flex items-center gap-40">
          <div className="flex items-center gap-3">
            <img src={CryptX} alt="CryptX Logo" className="h-12 w-auto" />
            <span className="text-3xl font-extrabold text-gray-900">CryptX</span>
          </div>

          {/* Nav Links */}
          <div className="flex items-center gap-7">
            <button className="flex items-center gap-2 bg-gray-100 px-6 py-2.5 rounded-full text-lg font-semibold hover:bg-gray-200 transition shadow">
              Services
              <LayoutGrid className="w-6 h-6" />
              <ChevronDown className="w-6 h-6" />
            </button>
            <Link to="#" className="text-gray-800 hover:text-blue-600 text-lg font-semibold">CryptoCoins</Link>
            <Link to="#" className="text-gray-800 hover:text-blue-600 text-lg font-semibold">Buy Crypto</Link>
          </div>
        </div>

        {/* Right: Auth Buttons */}
        <div className="flex items-center gap-5 pr-4">
          <Link to="/login" className="border border-gray-400 text-gray-800 px-6 py-2.5 rounded-full text-lg font-semibold hover:border-gray-600 transition">
            Sign In
          </Link>
          <Link to="/register" className="bg-blue-500 text-white px-6 py-2.5 rounded-full text-lg font-semibold hover:bg-teal-600 transition">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
