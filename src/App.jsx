import React from "react";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
    <Route path="/HomePage" element={<HomePage />} /> 
    </Routes>
   </BrowserRouter> //dev routes for testing
  );
}

export default App;