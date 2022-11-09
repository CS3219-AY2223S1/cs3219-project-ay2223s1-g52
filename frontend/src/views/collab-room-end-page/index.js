import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CelebrationIcon from "@mui/icons-material/Celebration";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Zoom from "@mui/material/Zoom";
import { useNavigate } from "react-router-dom";

import { styles } from "./styles";

const CollabRoomEndPage = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(`/`);
  };

  return (
    <Box sx={styles.mainContainer}>
      <Box sx={styles.subContainer}>
        <Fade in={true} timeout={1000}>
          <Typography variant="h3" sx={styles.mainText}>
            Great work!
          </Typography>
        </Fade>
        <Box>
          <Zoom in={true} timeout={500} style={{ transitionDelay: `500ms` }}>
            <CelebrationIcon sx={styles.icon1} />
          </Zoom>
          <Zoom in={true} timeout={500} style={{ transitionDelay: `1000ms` }}>
            <CelebrationIcon sx={styles.icon2} />
          </Zoom>
          <Zoom in={true} timeout={500} style={{ transitionDelay: `1500ms` }}>
            <CelebrationIcon sx={styles.icon3} />
          </Zoom>
        </Box>
        <Fade in={true} timeout={1000} style={{ transitionDelay: `2000ms` }}>
          <Typography variant="h4" sx={styles.subText}>
            Now you are one step closer to being well prepared for interviews!
          </Typography>
        </Fade>
        <Box sx={styles.buttonHolder}>
          <Fade in={true} timeout={1000} style={{ transitionDelay: `3000ms` }}>
            <Button
              sx={styles.returnButton}
              variant="contained"
              onClick={handleRedirect}
            >
              Return to Selection
            </Button>
          </Fade>
        </Box>
      </Box>
    </Box>
  );
};

export default CollabRoomEndPage;
