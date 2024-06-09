import React, { useState } from "react";
import { Input, Button } from "@mantine/core";

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
    <div>
      <input
        type="number"
        value={id}
        onChange={(event) => setId(parseInt(event.target.value))}
      />
      <Button onClick={handleAddArt}>Add</Button>
    </div>
  );
}

export default AddArtForm;
