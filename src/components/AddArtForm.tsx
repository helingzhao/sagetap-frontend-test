import React, { useState } from "react";
import { Container, Button, TextField, Typography } from "@mui/material";

import Item from "../styling/Item";

interface AddArtFormProps {
  addArt: (id: number) => void;
}
function AddArtForm(props: AddArtFormProps) {
  const { addArt } = props;
  const [id, setId] = useState<number>(0);

  function handleAddArt() {
    addArt(id); //this calls handleAddArt in App.tsx
    setId(0);
  }

  return (
    <Item>
      <Container>
        <Typography variant="h4">Add New Art</Typography>
      </Container>
      <Typography variant="body2">
        Enter the ID of the art you'd like to add:
      </Typography>
      <Container>
        <TextField
          variant="outlined"
          size="small"
          type="number"
          value={id}
          onChange={(event) => setId(parseInt(event.target.value))}
        />
        <br></br>
        <Button onClick={handleAddArt}>Add</Button>
      </Container>
    </Item>
  );
}

export default AddArtForm;
