import React from 'react';
import CryptX from "../componants/images/Crypt x (1).png";


export default function LoginPage() {
    return (
        <div className="bg-blue-600 h-screen flex justify-center items-center">
  <div className="bg-white p-8 rounded-lg shadow-lg w-[650px] h-[650px] relative">
    
    <img
      src={CryptX}
      alt="CryptX Logo"
      className="w-60 h-60 absolute top-[4%] left-[50%] transform -translate-x-1/2 rounded-lg"
    />

    

    
    
     
    <div className="mb-6 absolute top-[35%] left-[47%] transform -translate-x-1/2 font-bold text-gray-800">
        <label className="block text-gray-700 text-lg font-bold mb-2 " htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          className="bg-gray-200 w-full p-3 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-lg"
        />
      </div>

    <div className='"mb-6 absolute top-[50%] left-[47%] transform -translate-x-1/2 font-bold text-gray-800'>
        <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          className="bg-gray-200 w-full p-3 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        />
      </div>
      
      
   {/* <button className='bg-amber-200 hover: w-20 h-30 absolute top-[70%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 font-bold text-gray-800 cursor-pointer'>Login</button> */}
   <button className='bg-blue-400 hover:bg-white w-20 h-[50px] absolute top-[70%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 font-bold text-gray-800 cursor-pointer rounded-lg shadow-md'>
  Login
</button>


  </div>
</div>
 
 
    );
} 

