import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import HomePage from "./landingPage/home/Homepage";
import Signup from "./landingPage/signup/Signup";
import AboutPage from "./landingPage/about/Aboutpage";
import ProductPage from "./landingPage/product/ProductPage";
import PricingPage from "./landingPage/pricing/PricingPage";
import SupportPage from "./landingPage/support/SupportPage";
import Navbar from "./landingPage/Navbar";
import Footer from "./landingPage/Footer";
import Notfound from "./landingPage/Notfound";
import Login from "./landingPage/login/Login";
import { AuthProvider } from "./AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/about" element={<AboutPage />}></Route>
        <Route path="/product" element={<ProductPage />}></Route>
        <Route path="/pricing" element={<PricingPage />}></Route>
        <Route path="/support" element={<SupportPage />}></Route>
        <Route path="*" element={<Notfound />}></Route>
      </Routes>
      <Footer />
    </AuthProvider>
  </BrowserRouter>
);
