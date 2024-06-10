/* eslint-disable */

import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Box, Container, Typography } from "@mui/material";
import ArtItem from "./components/ArtItem";
import AddArtForm from "./components/AddArtForm";
import "./App.css";

interface Art {
  id: number;
  disabled: boolean;
}

interface AppProps {
  initialArts?: Art[];
}

function App({ initialArts }: AppProps) {
  // Can consider refactoring the default list of arts to a separate file
  const [arts, setArts] = useState<Art[]>(
    initialArts || [
      { id: 27992, disabled: false },
      { id: 27998, disabled: false },
      { id: 27999, disabled: false },
      { id: 27997, disabled: false },
      { id: 27993, disabled: false },
    ]
  );

  function handleRemoveArt(idToRemove: number) {
    console.log("ID of art to remove:", idToRemove);
    let newArts = arts.filter((art: Art) => art.id !== idToRemove);
    console.log("New Arts:", JSON.stringify(newArts));
    setArts(newArts);
  }

  function handleAddArt(idToAdd: number) {
    const idExists = arts.some((art: Art) => art.id === idToAdd);
    if (idExists) {
      alert(`We're already displaying art with id: ${idToAdd}.`);
      return;
    }

    setArts([...arts, { id: idToAdd, disabled: false }]);
  }

  return (
    <Box>
      <Container>
        <Typography variant="h1">Art Rater</Typography>
      </Container>
      <Container>
        <Grid container spacing={1}>
          {arts.map((art: { id: number; disabled: boolean }) => (
            <Grid xs={6} sm={6} md={6} lg={6} xl={6} key={art.id}>
              <ArtItem
                id={art.id}
                disabled={art.disabled}
                removeArt={() => handleRemoveArt(art.id)}
              ></ArtItem>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container>
        <AddArtForm addArt={handleAddArt}></AddArtForm>
      </Container>
    </Box>
  );
}

export { App };
