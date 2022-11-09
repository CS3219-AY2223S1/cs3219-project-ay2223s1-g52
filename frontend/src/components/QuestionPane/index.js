import { Box } from "@mui/system";
import DOMPurify from "dompurify";
import { styles } from "./styles";

const QuestionPane = ({ questionName, questionObject }) => {
  var sanitisedHTML = DOMPurify.sanitize(questionObject);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.title}>{questionName}</Box>
      <Box sx={styles.text}>
        <div
          style={styles.text}
          dangerouslySetInnerHTML={{ __html: sanitisedHTML }}
        />
      </Box>
    </Box>
  );
};

export default QuestionPane;
