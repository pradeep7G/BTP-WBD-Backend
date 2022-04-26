import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";

//home page of our web app, consist of various components like navbar, slider, footer, products etc...
const Home = ({setToggleAdmin}) => {
  return (
    <div>
      <Announcement />
      <Navbar setToggleAdmin={setToggleAdmin}/>
      <Slider />
      <Categories />
      <Products/>
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default Home;
