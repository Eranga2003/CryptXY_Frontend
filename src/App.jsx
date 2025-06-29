import React from "react";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewsPage from "./pages/NewsPage.jsx";
import AirdropPage from "./pages/Airdrop.jsx";
import LearnCryptoPage from "./pages/LearnCryptoPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LhomePage from "./pages/LhomePage.jsx";
import SignalPlansPage from   "./pages/SignelPlans.jsx";
import LoginPageB from "./pages/LoginPageB.jsx";
import SignUpPageB from "./pages/SignUpPageB.jsx";
import SignalPlansPageB from "./pages/ActivePlan.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx"
import ChatPageB from "./pages/ChatPageAdmin.jsx";
import  MyPlansPage from "./pages/MyPlansPage.jsx"
function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
    <Route path="/" element={<HomePage />} /> 
    <Route path="/News" element={<NewsPage />} />
    <Route path="/Airdrop"element={< AirdropPage/>} />
    <Route path="/LearnCrypto" element={<LearnCryptoPage/>} /> 
    <Route path="/Register" element={<SignUpPage />} />
    <Route path="/LhomePage" element={<LhomePage />} />
    <Route path="/SignalPlans" element={<SignalPlansPage />} />
    <Route path="/LoginPageB" element={<LoginPageB />} />
    <Route path="/SignUpPageB" element={<SignUpPageB />} />
    <Route path="/ActivePlans" element={<SignalPlansPageB />} />
    <Route path="/ChatPage" element={<ChatPage />} />
    <Route path="/AdminDashboard" element={<AdminDashboard />} />
    <Route path="/ChatPageB" element={<ChatPageB />} />
    <Route path="/MyPlansPage" element={<MyPlansPage />} />
    </Routes>
   </BrowserRouter> //dev routes for testing
  );
}

export default App;