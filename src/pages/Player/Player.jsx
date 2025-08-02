import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const navigate = useNavigate(); //built in react hook that lets change the page you are in
  const { id } = useParams(); //taking in the param in the url link
  const [apiData, setApiData] = useState({
    //setting up state that will be used when fetching data
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  useEffect(() => {
    //watch for the API request
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNGM1MWVmNDRjYzAyYTlmMmE0YTA3NjM5Mzg1NDVkZSIsIm5iZiI6MTc0NzQ2MDc5Ni4yNjIsInN1YiI6IjY4MjgyMmJjYzVhNWJiNTA1NDBiY2NlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I7v0njb6mcxFXFMOQi3Gl6FNOJW8s0myyJADbt5nApI",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, //fetch this date, the store it
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results[0]))
      .catch((err) => console.error(err));
  }, []);
  return (
    // setting up the player page
    <div className="player">
      {/* the back arrow icon */}
      <img
        src={back_arrow_icon}
        alt=""
        onClick={() => {
          navigate("/home");
        }}
      />
      {/* iframe component is what lets the user see the video directly in the page */}
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        allowFullScreen
      ></iframe>
      {/* video stats in the bottom */}
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
