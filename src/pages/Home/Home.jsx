import React from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import hero_banner from "../../assets/hero_banner.jpg";
import hero_title from "../../assets/hero_title.png";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import TitleCard from "../../components/TitleCard/TitleCard";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="hero">
        <img src={hero_banner} alt="" className="banner-img" />
        <div className="hero-caption">
          <img src={hero_title} alt="" className="caption-img" />
          <p>
            Discovering his ties to a secret ancient order, a young man living
            in modern Istanbul embarks on a quest to save the city from an
            immortal enemy.
          </p>
          <div className="hero-btns">
            <button className="btns">
              <img src={play_icon} alt="" />
              Play
            </button>
            <button className="btns dark-btn">
              <img src={info_icon} alt="" />
              More Info
            </button>
          </div>
          <TitleCard />
        </div>
      </div>
      <div className="more-cards">
        <TitleCard category={"top_rated"} title={"BlockBuster Movies"} />
        <TitleCard category={"popular"} title={"Only on Netflix"} />
        <TitleCard category={"upcoming"} title={"Upcoming"} />
        <TitleCard category={"now_playing"} title={"Top Pics for You"} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
