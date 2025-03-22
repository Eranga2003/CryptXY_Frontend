import React from "react";
import Testing from "./componants/testing.jsx"; // Import component
import LoginPage from "./pages/LoginPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/testing" element={<Testing />} />
    </Routes>
   </BrowserRouter> //dev routes for testing
  );
}

export default App;