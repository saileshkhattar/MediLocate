import React from "react";
import { Button, Typography, Container } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        MediLocate
      </Typography>
      <Button variant="contained" color="primary">
        Test MUI Button
      </Button>
    </Container>
  );
}

export default App;
