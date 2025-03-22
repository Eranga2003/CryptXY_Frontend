import React from 'react';
import CryptX from "../componants/images/Crypt x (1).png";


export default function LoginPage() {
    return (
        <div className="bg-purple-950 h-screen flex justify-center items-center">
  <div className="bg-white p-8 rounded-lg shadow-lg w-[650px] h-[650px] relative">
    {/* Positioned Image Inside the Yellow Circle */}
    <img
      src={CryptX}
      alt="CryptX Logo"
      className="w-60 h-60 absolute top-[4%] left-[50%] transform -translate-x-1/2 rounded-lg"
    />

    {/* Large "Login" Heading */}
    <h1 className="text-[80px]  text-gray-800 absolute top-[43%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 leading-none">
      Login
    </h1>
  </div>
</div>

    );
}