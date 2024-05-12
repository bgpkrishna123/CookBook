import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Banner from "../Components/Banner";
import Container from "../Components/Container";

const Home = () => {
  const [filter , setFilter] = useState("");
  return (
    <>
      <Navbar filter={filter} setFilter={setFilter}/>
      <Banner />
      <Container filter={filter} setFilter={setFilter}/>
      <Footer />
    </>
  );
};

export default Home;
