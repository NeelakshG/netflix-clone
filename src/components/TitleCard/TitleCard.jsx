import React, { useEffect, useRef, useState } from "react";
import "./TitleCard.css";
import cards_data from "../../assets/cards/Cards_data";

const TitleCard = ({ title, category }) => {
  const cardsRef = useRef();
  const [apiData, setApiData] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNGM1MWVmNDRjYzAyYTlmMmE0YTA3NjM5Mzg1NDVkZSIsIm5iZiI6MTc0NzQ2MDc5Ni4yNjIsInN1YiI6IjY4MjgyMmJjYzVhNWJiNTA1NDBiY2NlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I7v0njb6mcxFXFMOQi3Gl6FNOJW8s0myyJADbt5nApI",
    },
  };

  // when user scrolls vertically wiht hte mouse, this handle prevents the page from vertically scrolling and instead moves the page horizontally
  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));

    console.log("qwdwq");
    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="titlecards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      {/* to imitiate the scrolling effect, we use ref instead of useState because we dont want the page to re-render. it will throw everything off loop */}
      <div className="card-list" ref={cardsRef}>
        {apiData.map((movie, movieIndex) => {
          return (
            <div className="card" key={movieIndex}>
              <img
                src={`https://image.tmdb.org/t/p/w500` + movie.backdrop_path}
                alt=""
              />
              <p>{movie.original_title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCard;
