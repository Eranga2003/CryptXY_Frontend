import React from "react";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewsPage from "./pages/NewsPage.jsx";
import AirdropPage from "./pages/Airdrop.jsx";
import LearnCryptoPage from "./pages/LearnCryptoPage.jsx";

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
    <Route path="/" element={<HomePage />} /> 
    <Route path="/News" element={<NewsPage />} />
    <Route path="/Airdrop"element={< AirdropPage/>} />
    <Route path="/LearnCrypto" element={<LearnCryptoPage/>} /> 
    </Routes>
   </BrowserRouter> //dev routes for testing
  );
}

export default App;