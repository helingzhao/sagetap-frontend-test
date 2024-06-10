import React, { useState } from "react";
import { Rating, Button, ButtonGroup } from "@mui/material/";

interface RatingButtonsProps {
  currentRating: number;
  hidden: boolean;
  setCurrentRating: (currentRating: number) => void;
}
function RatingButtons(props: RatingButtonsProps) {
  const { currentRating, hidden, setCurrentRating } = props;
  const [value, setValue] = useState<number | null>(1);
  const ratings = [1, 2, 3, 4, 5]; //can also consider having ratings as strings

  if (hidden) {
    return <></>;
  }
  return (
    <div>
      <ButtonGroup variant="outlined">
        {ratings.map((rating) => (
          <Button key={rating} onClick={() => setCurrentRating(rating)}>
            {rating}
          </Button>
        ))}
      </ButtonGroup>
      {/* <div>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        <p>Value is {value}</p>
      </div> */}
    </div>
  );
}

export default RatingButtons;
