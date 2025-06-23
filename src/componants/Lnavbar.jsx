import React from "react";
import { Link } from "react-router-dom";
import CryptX from "../componants/images/Crypt x (1).png";
import { ChevronDown, LayoutGrid } from "lucide-react";
export default function Navbar({ onServicesClick }) {
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
            <button
              onClick={onServicesClick}
              className="flex items-center gap-2 bg-gray-100 px-6 py-2.5 rounded-full text-lg font-semibold hover:bg-gray-200 transition shadow"
            >
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
          
        </div>
      </div>
    </nav>
  );
}

