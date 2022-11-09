import React from "react";
import { styles } from "./styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import MatchingDialog from "./MatchingDialog";
import useDifficultyCard from "hooks/useDifficultyCard";
import useMatching from "hooks/useMatching";

const DifficultyCard = ({ difficulty }) => {
  const {
    timer,
    success,
    failure,
    loading,
    error,
    handleMatchButtonClick,
    handleDisconnect,
  } = useMatching(difficulty);

  const { cardProps, dialogProps, handleCardClick } = useDifficultyCard(
    difficulty,
    handleDisconnect,
  );

  return (
    <Card {...cardProps} sx={styles.card}>
      <CardActionArea onClick={() => handleCardClick(difficulty.title)}>
        <CardContent>
          <Box sx={styles.cardContent}>
            <Typography gutterBottom variant="h5" component="span">
              {difficulty.title}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <MatchingDialog
        {...dialogProps}
        {...{ timer, success, failure, loading, error, handleMatchButtonClick }}
      />
    </Card>
  );
};

export default DifficultyCard;
