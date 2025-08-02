import React, { useEffect, useRef, useState } from "react";
import "./TitleCard.css";
import cards_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";

const TitleCard = ({ title, category }) => {
  // useRef updates the page without re-rendering the page
  const cardsRef = useRef();
  const [apiData, setApiData] = useState([]);

  //this is how we get the API data that will be used in the list
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

  //updates the url we fetch depending on the list we are on
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
    // store that information into res and the update the state of ApiData
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));

      //watch out for the click
    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);

  return (
    //making each list, 
    <div className="titlecards">
      {/* first we add the title which is either sent as a prop or forced to be Popular on Netflix */}
      <h2>{title ? title : "Popular on Netflix"}</h2>
      {/* to imitiate the scrolling effect, we use ref instead of useState because we dont want the page to re-render. it will throw everything off loop */}
      <div className="card-list" ref={cardsRef}>
        {/* then for the list itself, we map through each movie in the array*/}
        {apiData.map((movie, movieIndex) => {
          return (
            //using a react component "Link" we can link the player page for each associated movie
            <Link to={`/player/${movie.id}`} className="card" key={movieIndex}>
              <img
                src={`https://image.tmdb.org/t/p/w500` + movie.backdrop_path}
                alt=""
              /> 
              {/* print the name of the movie on the thumbnail */}
              <p>{movie.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCard;
