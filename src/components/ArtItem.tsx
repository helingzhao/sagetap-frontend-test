import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Typography, Container, Button, Stack } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

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
          toast(
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
        toast("Rating successfully submitted!");
      })
      .catch((error) => {
        if (error instanceof RatingSubmissionError) {
          toast(
            "Something went wrong with submitting your rating. We're sorry about that! Please try again, and if the issue persists please contact our support team."
          );
        } else {
          toast(
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
        <Container>
          <Typography variant="h4">Nothing here to see...</Typography>
          <Typography variant="body1">
            This artwork is currently on loan.
          </Typography>
          <Container maxWidth="sm">
            <img width="100%" max-height={200} src={onLoanImage} />
          </Container>
          <br></br>
          <Button startIcon={<DeleteIcon />} onClick={() => removeArt(id)}>
            Remove Art
          </Button>
        </Container>
      </Item>
    );
  }

  return (
    <Item>
      <Container>
        <Typography variant="h4">{artwork && artwork.title}</Typography>
        <Typography variant="body1">
          {artwork && artwork.artist_title}
        </Typography>
        <Container
          sx={{
            position: "relative",
            width: "100%",
            paddingTop: "10%",
            overflow: "hidden",
          }}
        >
          <img
            width="100%"
            max-height={200}
            src={artwork != null ? getImageUrl(artwork.image_id) : ""}
          />
          <Typography variant="body1">ID: {id}</Typography>
        </Container>
        <Typography variant="body1">
          Rating: {voted && currentRating}
        </Typography>
        {ratingSubmitted && (
          <Typography variant="body1">
            Thank you for submitting your rating!
          </Typography>
        )}
        {ratingSubmissionIsLoading && <img src={loadingGif} />}
        <RatingButtons
          hidden={ratingSubmitted || ratingSubmissionIsLoading}
          currentRating={currentRating}
          setCurrentRating={handleSetCurrentRating}
        ></RatingButtons>
        <br></br>
        <Stack direction="column" spacing={0.5}>
          {(!ratingSubmitted || ratingSubmissionIsLoading) && (
            <Button
              endIcon={<SendIcon />}
              variant="contained"
              disabled={!voted}
              onClick={submit}
            >
              Submit
            </Button>
          )}
          <br></br>
          <Button startIcon={<DeleteIcon />} onClick={() => removeArt(id)}>
            Remove Art
          </Button>
        </Stack>
      </Container>
    </Item>
  );
}

export default ArtItem;
