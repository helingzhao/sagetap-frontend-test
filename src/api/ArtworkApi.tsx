import { ArtworkData } from "../api/models/ArtworkData";
import ArtworkFetchError from "../errors/ArtworkFetchError";
import RatingSubmissionError from "../errors/RatingSubmissionError";
import { RatingSubmissionRequest } from "./models/RatingSubmissionRequest";

export async function getArtwork(id: number): Promise<ArtworkData> {
  try {
    const response = await fetch("https://api.artic.edu/api/v1/artworks/" + id);

    if (!response.ok) {
      const message =
        "Unsuccessful response from trying to fetch artwork. Response code: " +
        response.status;
      throw new ArtworkFetchError(message);
    }
    const artwork = await response.json();
    return artwork.data;
  } catch (error) {
    const message =
      "Something went wrong when trying to fetch artwork: " + error;
    throw new ArtworkFetchError(message);
  }
}

export function getImageUrl(id: string) {
  return "https://www.artic.edu/iiif/2/" + id + "/full/843,/0/default.jpg";
}

export async function submitRating(id: number, rating: number) {
  try {
    const payload: RatingSubmissionRequest = {
      id: id,
      rating: rating,
    };

    /* 
      https://20e2q.mocklab.io/rating does not work as MockLab has been
      sunsetted as of 23 August 2023. See: https://app.mocklab.io/

      Existing endpoints were migrated over but now served on
      {myApiName}.wiremockapi.cloud/{endpoint}
    */

    const response = await fetch("https://20e2q.wiremockapi.cloud/rating", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const message =
        "Unsuccessful response from trying to submit rating. Response code: " +
        response.status;
      throw new RatingSubmissionError(message);
    }

    const result = await response.json();

    if (result.message != "Success") {
      const message =
        "We did not get a 'Success' message as expected from submitting our rating.";
      throw new RatingSubmissionError(message);
    }

    console.log(result.message);
  } catch (error) {
    const message =
      "Something went wrong when trying to submit the rating: " + error;
    throw new RatingSubmissionError(message);
  }
}
