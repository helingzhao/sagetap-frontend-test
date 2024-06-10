import React, { useState } from "react";

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
      <button onClick={handleAddArt}>Add</button>
    </div>
  );
}

export default AddArtForm;
