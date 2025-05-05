import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        navigate("/signup");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [navigate]);

  return (
    <div className="bg-gradient-to-br from-blue-100 via-5% to-indigo-100">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default HomePage;
