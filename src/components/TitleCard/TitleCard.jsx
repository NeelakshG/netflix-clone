import React, { useEffect, useRef } from "react";
import "./TitleCard.css";
import cards_data from "../../assets/cards/Cards_data";

const TitleCard = ({ title, category }) => {
  const cardsRef = useRef();

  // when user scrolls vertically wiht hte mouse, this handle prevents the page from vertically scrolling and instead moves the page horizontally
  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="titlecards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      {/* to imitiate the scrolling effect, we use ref instead of useState because we dont want the page to re-render. it will throw everything off loop */}
      <div className="card-list" ref={cardsRef}>
        {cards_data.map((movie, movieIndex) => {
          return (
            <div className="card" key={movieIndex}>
              <img src={movie.image} alt="" />
              <p>{movie.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCard;
