import React from "react";
import CategorySection from "./Category";
import Category from "./Category";
import Banner from "./Banner";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      {/* category */}
      <Category></Category>
      <div></div>
    </div>
  );
};

export default Home;
