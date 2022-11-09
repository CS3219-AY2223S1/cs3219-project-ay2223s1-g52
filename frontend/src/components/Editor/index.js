import React from "react";
import CodeMirror from "@uiw/react-codemirror";

const Editor = ({ isCollabEditor, editor, editorProps }) => {
  return isCollabEditor ? (
    <div id="editor" ref={editor} />
  ) : (
    <CodeMirror {...editorProps} />
  );
};
export default Editor;
