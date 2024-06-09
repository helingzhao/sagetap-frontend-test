/* eslint-disable */

import React, { useState } from "react";

import ArtItem from "./components/ArtItem";
import AddArtForm from "./components/AddArtForm";
import "./App.css";
import {
  AppShell,
  Group,
  Title,
  Tabs,
  Card,
  Select,
  Input,
  Divider,
  Grid,
  Stack,
  Button,
  Pagination,
  Text,
  Image,
} from "@mantine/core";

interface Art {
  id: number;
  disabled: boolean;
}

interface AppProps {
  initialArts?: Art[];
}

function App({ initialArts }: AppProps) {
  const [arts, setArts] = useState<Art[]>(
    initialArts || [
      { id: 27992, disabled: false },
      { id: 27998, disabled: false },
      { id: 27999, disabled: false },
      { id: 27997, disabled: true },
      { id: 27993, disabled: false },
    ]
  );

  function handleRemoveArt(idToRemove: number) {
    console.log("ID of art to remove:", idToRemove);
    let newArts = arts.map((art: Art) =>
      art.id === idToRemove ? { ...art, disabled: true } : art
    );
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
    <AppShell>
      <AppShell.Main>
        <Grid>
          <Grid.Col span={4}>1</Grid.Col>
          <Grid.Col span={4}>2</Grid.Col>
          <Grid.Col span={4}>3</Grid.Col>
        </Grid>
        <h1>Art Rater</h1>
        <div>
          {arts.map((art: { id: number; disabled: boolean }) => (
            <ArtItem
              id={art.id}
              disabled={art.disabled}
              removeArt={() => handleRemoveArt(art.id)}
            ></ArtItem>
          ))}
        </div>
        <div>
          <AddArtForm addArt={handleAddArt}></AddArtForm>
        </div>
      </AppShell.Main>
    </AppShell>
  );
}

export { App };
