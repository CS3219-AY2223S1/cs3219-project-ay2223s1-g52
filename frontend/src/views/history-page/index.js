import {
  Box,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { formatDistance } from "date-fns";
import { styles } from "./styles";
import useHistory from "hooks/useHistory";

const HistoryPage = () => {
  const { handleQuestionClick, pastQuestions } = useHistory();
  return (
    <Box sx={styles.box}>
      <Box sx={styles.historyContainer}>
        <Typography variant="h4">Past Completed Questions:</Typography>
        <Paper elevation={3} sx={styles.paper}>
          {pastQuestions.length === 0 && (
            <Box sx={styles.noQuestionTextHolder}>
              <Typography variant="h5">No questions attempted yet</Typography>
            </Box>
          )}
          {pastQuestions.map((question, index) => (
            <ListItemButton
              sx={styles.listItemButton}
              component="a"
              key={question.titleSlug}
              onClick={() => handleQuestionClick(question.titleSlug)}
            >
              <ListItemText primary={question.title} />
              <ListItemText
                sx={styles.duration}
                primary={formatDistance(question.createdAt, new Date(), {
                  addSuffix: true,
                })}
              />
            </ListItemButton>
          ))}
        </Paper>
      </Box>
    </Box>
  );
};

export default HistoryPage;
