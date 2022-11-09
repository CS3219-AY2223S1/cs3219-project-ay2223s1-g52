import React from "react";
import Box from "@mui/material/Box";
import Split from "react-split";
import QuestionPane from "components/QuestionPane";
import UsersDisplay from "components/UsersDisplay";
import Editor from "components/Editor";

import { isCollabType } from "common/utils";
import { styles } from "./styles";

import "./styles.css";

const QuestionEditorPanel = ({
  isCollabEditor = true,
  editor,
  editorProps,
  users,
  type,
  questionObject,
  questionName,
}) => {
  return (
    <Split direction={"horizontal"} style={styles.split}>
      <Box sx={styles.panel}>
        <QuestionPane
          questionObject={questionObject}
          questionName={questionName}
        />
      </Box>
      <Box sx={styles.panel}>
        {isCollabType(type) && <UsersDisplay activeUsers={users} />}
        <Editor
          isCollabEditor={isCollabEditor}
          editor={editor}
          editorProps={editorProps}
        />
      </Box>
    </Split>
  );
};

export default QuestionEditorPanel;
