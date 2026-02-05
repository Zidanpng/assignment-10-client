import React from "react";
import Banner from "./Banner";
import Category from "./Category";
import RecentListings from "./RecentListings";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Category></Category>
      <RecentListings></RecentListings>
    </div>
  );
};

export default Home;
