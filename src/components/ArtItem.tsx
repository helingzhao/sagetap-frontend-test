import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Button,
  Paper,
  styled,
} from "@mui/material";

import Item from "../styling/Item";

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
      <Item>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>Nothing here to see...</h2>
          <h3>This artwork is currently on loan.</h3>
          <Container maxWidth="sm">
            <img width={200} max-height={200} src={onLoanImage} />
          </Container>
          <br></br>
          <Button onClick={() => removeArt(id)}>Remove Art</Button>
        </Box>
      </Item>
    );
  }

  return (
    <Item>
      <Container
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <h2>{artwork && artwork.title}</h2>
        <h3>{artwork && artwork.artist_title}</h3>
        <Container
          sx={{
            position: "relative",
            width: "100%",
            paddingTop: "10%",
            overflow: "hidden",
          }}
        >
          <img
            width={200}
            max-height={200}
            src={artwork != null ? getImageUrl(artwork.image_id) : ""}
          />
        </Container>
        <p>ID: {id}</p>
        <p>Rating: {voted && currentRating}</p>
        {ratingSubmitted && <p>Thank you for submitting your rating!</p>}
        {ratingSubmissionIsLoading && <img src={loadingGif} />}
        <RatingButtons
          hidden={ratingSubmitted || ratingSubmissionIsLoading}
          currentRating={currentRating}
          setCurrentRating={handleSetCurrentRating}
        ></RatingButtons>
        <br></br>
        <Button
          variant="contained"
          hidden={ratingSubmitted || ratingSubmissionIsLoading}
          disabled={!voted}
          onClick={submit}
        >
          Submit
        </Button>
        <br></br>
        <Button onClick={() => removeArt(id)}>Remove Art</Button>
      </Container>
    </Item>
  );
}

export default ArtItem;
