import React, { useEffect, useState } from "react";
import { getArtwork, getImageUrl, submitRating } from "../api/ArtworkApi";
import { ArtworkData } from "../api/models/ArtworkData";
import RatingButtons from "./RatingButtons";
import ArtworkFetchError from "../errors/ArtworkFetchError";
import onLoanImage from "../images/onLoan.png";
import loadingGif from "../images/loading.gif";
import RatingSubmissionError from "../errors/RatingSubmissionError";

interface ArtItemProps {
  id: number;
  disabled: boolean;
  removeArt: (id: number) => void;
}

function ArtItem(props: ArtItemProps) {
  const { id, disabled, removeArt } = props;
  const [artNotAvailable, setArtNotAvailable] = useState<boolean>(false);
  const [ratingSubmissionIsLoading, setRatingSubmissionIsLoading] =
    useState<boolean>(false);
  const [ratingSubmitted, setRatingSubmitted] = useState<boolean>(false);
  const [voted, setVoted] = useState<boolean>(false);
  const [artwork, setArtwork] = useState<ArtworkData | null>(null);
  const [currentRating, setCurrentRating] = useState<number>(0);

  useEffect(() => {
    getArtwork(id)
      .then((artworkData) => {
        setArtwork(artworkData);
      })
      .catch((error) => {
        if (error instanceof ArtworkFetchError) {
          setArtNotAvailable(true);
        } else {
          alert(
            "Oops! Something went wrong here. We're sorry about that! Please try again, and if the issue persists please contact our support team."
          );
        }
      });
  }, []);

  function handleSetCurrentRating(currentRating: number) {
    setCurrentRating(currentRating);
    setVoted(true);
  }

  async function submit() {
    console.log("Submitting!");
    setRatingSubmissionIsLoading(true);
    submitRating(id, currentRating)
      .then(() => {
        setRatingSubmitted(true);
        setRatingSubmissionIsLoading(false);
      })
      .catch((error) => {
        if (error instanceof RatingSubmissionError) {
          alert(
            "Something went wrong with submitting your rating. We're sorry about that! Please try again, and if the issue persists please contact our support team."
          );
        } else {
          alert(
            "Oops! Something went wrong here. We're sorry about that! Please try again, and if the issue persists please contact our support team."
          );
        }
        setRatingSubmissionIsLoading(false);
      });
  }

  if (disabled) {
    return <></>;
  }

  if (artNotAvailable) {
    return (
      <div className="artItem">
        <h2>Nothing here to see...</h2>
        <h3>This artwork is currently on loan.</h3>
        <div style={{ display: "flex" }}>
          <img src={onLoanImage} />
        </div>
        <br></br>
        <button onClick={() => removeArt(id)}>Remove Art</button>
      </div>
    );
  }

  return (
    <div className="artItem">
      <h2>{artwork && artwork.title}</h2>
      <h3>{artwork && artwork.artist_title}</h3>
      <div style={{ display: "flex" }}>
        <img src={artwork != null ? getImageUrl(artwork.image_id) : ""} />
      </div>
      <p>ID: {id}</p>
      <p>Rating: {voted && currentRating}</p>
      {ratingSubmitted && <p>Thank you for submitting your rating!</p>}
      {ratingSubmissionIsLoading && <img src={loadingGif} />}
      <RatingButtons
        hidden={ratingSubmitted || ratingSubmissionIsLoading}
        currentRating={currentRating}
        setCurrentRating={handleSetCurrentRating}
      ></RatingButtons>
      <button
        hidden={ratingSubmitted || ratingSubmissionIsLoading}
        disabled={!voted}
        onClick={submit}
      >
        Submit
      </button>
      <br></br>
      <button onClick={() => removeArt(id)}>Remove Art</button>
    </div>
  );
}

export default ArtItem;
