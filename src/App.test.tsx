import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { App } from "./App";
import ArtItem from "./components/ArtItem";
import { getArtwork, getImageUrl, submitRating } from "./api/ArtworkApi";

// Mock ArtworkApi - we don't want to be depending on network connectivity!
jest.mock("./api/ArtworkApi", () => ({
  getArtwork: jest.fn(),
  getImageUrl: jest.fn(),
  submitRating: jest.fn(),
}));

beforeEach(() => {
  (getArtwork as jest.Mock).mockResolvedValue({
    title: "Test Artwork",
    artist_title: "Test Artist",
    image_id: 123,
  });

  (getImageUrl as jest.Mock).mockResolvedValue("onLoanImage");

  (submitRating as jest.Mock).mockResolvedValue({
    message: "Success",
  });
});

test("has title", () => {
  //GIVEN - the app has rendered
  render(<App />);

  //WHEN - we get the expected title of the app
  const title = screen.getByText("Art Rater");

  //THEN - the title should be in the document
  expect(title).toBeInTheDocument();
});

test("for an art item, submit button is disabled until a rating is selected", () => {
  //GIVEN - a test piece of art that is not disabled
  const testArt = { id: 123, disabled: false };

  //AND - is has just been rendered with this test data
  render(<ArtItem {...testArt} removeArt={() => {}} />);

  //THEN - we should expect the button to be disabled
  let submitButton = screen.getByText("Submit");
  expect(submitButton).toHaveProperty("disabled", true);

  //AND - when we select a rating
  const ratingButton = screen.getByText("3 Stars");
  fireEvent.click(ratingButton);

  //THEN - the submit button should no longer be disabled
  submitButton = screen.getByText("Submit"); //Grab the submit button again
  expect(submitButton).toHaveProperty("disabled", false);
});

test("for an art item, clicking numbered button updates rating display below image to be that number", () => {
  //GIVEN - a test piece of art that is not disabled
  const testArt = { id: 123, disabled: false };

  //AND - is has just been rendered with this test data
  render(<ArtItem {...testArt} removeArt={() => {}} />);

  //AND - we click on a numbered rating button
  let ratingButton = screen.getByText("1 Star");
  fireEvent.click(ratingButton);

  //THEN - the rating display below the image should be that number
  const ratingDisplay = screen.getByText("Rating: 1");
  expect(ratingDisplay).toBeInTheDocument();
});

test("for an art item, clicking numbered button updates rating display below image to be that number, clicking two different numbers one after the other", () => {
  //GIVEN - a test piece of art that is not disabled
  const testArt = { id: 123, disabled: false };

  //AND - is has just been rendered with this test data
  render(<ArtItem {...testArt} removeArt={() => {}} />);

  //AND - we click on a numbered rating button
  const ratingButton1 = screen.getByText("1 Star");
  fireEvent.click(ratingButton1);

  //AND - we click on a numbered rating button
  const ratingButton2 = screen.getByText("2 Stars");
  fireEvent.click(ratingButton2);

  //THEN - the rating display below the image should be the second rating we clicked
  const ratingDisplay = screen.getByText("Rating: 2");
  expect(ratingDisplay).toBeInTheDocument();

  //
});

test("for an art item, clicking submit POSTs update, displays a toast success message, hides buttons", async () => {
  //GIVEN - a test piece of art that is not disabled
  const testArt = { id: 123, disabled: false };

  //AND - is has just been rendered with this test data
  render(<ArtItem {...testArt} removeArt={() => {}} />);

  //AND - we click on a numbered rating button
  const ratingButton = screen.getByText("3 Stars");
  fireEvent.click(ratingButton);

  //AND - we submit our rating
  const submitButton = screen.getByText("Submit");
  fireEvent.click(submitButton);

  //THEN - we should see a success message on the page
  await waitFor(() => {
    const successMessage = screen.getByText(
      "Thank you for submitting your rating!"
    );
    expect(successMessage).toBeInTheDocument();
  });

  //AND - the rating buttons should now be hidden
  const ratingButtons = screen.queryAllByText("3 Stars");
  expect(ratingButtons.length).toBe(0);
});
