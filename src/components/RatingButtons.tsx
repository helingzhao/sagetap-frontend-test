interface RatingButtonsProps {
  currentRating: number;
  hidden: boolean;
  setCurrentRating: (currentRating: number) => void;
}
function RatingButtons(props: RatingButtonsProps) {
  const { currentRating, hidden, setCurrentRating } = props;
  const ratings = [1, 2, 3, 4, 5]; //can also consider having ratings as strings

  if (hidden) {
    return <></>;
  }
  return (
    <div>
      {ratings.map((rating) => (
        <button key={rating} onClick={() => setCurrentRating(rating)}>
          {rating}
        </button>
      ))}
    </div>
  );
}

export default RatingButtons;
