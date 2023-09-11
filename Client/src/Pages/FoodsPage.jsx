import React, { useEffect } from "react";
import Navbar from "../components/Home/Navbar";
import TransparentImage from "../components/Food/TransparentImage";
import AllFood from "../components/Food/AllFood";
import Footer from "../components/Home/Footer";

export default function Food() {
  useEffect(() => {
    document.title = "FoodEase - food";
  }, []);
  return (
    <div>
      <Navbar />
      <TransparentImage name="All foods" />
      <AllFood />
      <Footer />
    </div>
  );
}
