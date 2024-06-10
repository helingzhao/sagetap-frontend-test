import React, { useState } from "react";
import { Rating, Button, ButtonGroup } from "@mui/material/";

interface RatingButtonsProps {
  currentRating: number;
  hidden: boolean;
  setCurrentRating: (currentRating: number) => void;
}
function RatingButtons(props: RatingButtonsProps) {
  const { currentRating, hidden, setCurrentRating } = props;

  if (hidden) {
    return <></>;
  }
  return (
    <div>
      <div>
        <Rating
          name="simple-controlled"
          value={currentRating}
          onChange={(event, newValue) => {
            if (newValue != null) {
              setCurrentRating(newValue);
            }
          }}
        />
      </div>
    </div>
  );
}

export default RatingButtons;
