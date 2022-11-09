import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import DifficultyCard from "components/DifficultyCard";

import { styles } from "./styles";

const difficulties = [
  {
    title: "Easy",
  },
  {
    title: "Medium",
  },
  {
    title: "Hard",
  },
];

const SelectionPage = () => {
  return (
    <Box sx={styles.mainContainer}>
      <Typography variant="h5" sx={styles.title}>
        Select a difficulty to start matching with other users
      </Typography>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5}>
          {difficulties.map((difficulty) => (
            <Grid item key={difficulty.title} xs={12} sm={6} md={4}>
              <DifficultyCard difficulty={difficulty} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default SelectionPage;
