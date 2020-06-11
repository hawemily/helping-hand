import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = (props) => {
  const [hover, setHover] = useState();

  const [rating, setRating] = useState(0);

  const updateRating = (rating) => {
    setRating(rating);

    const ratings = props.ratings;

    const newRatings = Array(ratings.length).fill(0);

    ratings.map((r, i) => {
      if (i === props.index) {
        newRatings[i] = rating;
      } else {
        newRatings[i] = r;
      }
    });

    props.setRatings(newRatings);
  };

  return (
    <div>
      {[...Array(5)].map((e, i) => {
        const value = i + 1;
        return (
          <label>
            <input
              type='radio'
              style={{ display: "none" }}
              value={value}
              onClick={() => updateRating(value)}
            />
            <FaStar
              style={{ cursor: "pointer", transition: "color 200ms" }}
              size={50}
              color={value <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(value)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
