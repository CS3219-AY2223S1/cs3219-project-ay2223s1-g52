import { useState, useEffect, useCallback, useRef } from "react";
import { getNewLines } from "common/utils";
import { URI_COLLAB_SVC } from "common/configs";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import { useCodeMirror } from "@uiw/react-codemirror";

import { useCookies } from "react-cookie";

const DEFAULT_NO_OF_LINES = getNewLines(20);

const DEFAULT_EDITOR_VALUE =
  "# Loading Room for Collaboration......" + DEFAULT_NO_OF_LINES;

const getCurrentSelection = (state) => {
  return state.selection.ranges[0].from;
};

const useCollabEditor = (handleOpenNotification) => {
  const [editorValue, setEditorValue] = useState(DEFAULT_EDITOR_VALUE);
  const [users, setUsers] = useState("");
  const [socket, setSocket] = useState(null);
  const [timer, setTimer] = useState(null);

  const editor = useRef();

  const handleEditorChange = useCallback(
    (value, viewUpdate) => {
      if (viewUpdate.docChanged && viewUpdate.selectionSet)
        socket.emit("codeChanged", { code: value });
    },
    [socket],
  );

  const { setContainer, view } = useCodeMirror({
    container: editor.current,
    value: editorValue,
    onChange: handleEditorChange,
  });
  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor.current]);

  let intervalRef = useRef();

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setTimer(0);
  };

  const intervalAction = (timer) => {
    if (timer <= 0) {
      stopTimer();
      return 0;
    } else {
      return timer - 1000;
    }
  };

  const performIntervalAction = () => {
    setTimer((timer) => intervalAction(timer));
  };

  const [cookies] = useCookies(["token"]);

  const search = useLocation().search;
  const roomId = new URLSearchParams(search).get("roomId");

  useEffect(() => {
    const socket = io.connect(URI_COLLAB_SVC);
    setSocket(socket);
    socket.on("connect", function () {
      const user = cookies.username;
      if (!user) {
        handleOpenNotification("No username found!", 3000, "error");
      } else {
        socket.emit("joinRoom", { roomId, user });
      }
    });

    socket.on("usersInRoom", ({ usersInRoom }) => {
      setUsers(usersInRoom.join("  ,  "));
    });

    socket.on("initialCode", ({ code }) => {
      setEditorValue(code);
    });

    socket.on("userConnected", ({ user }) => {
      handleOpenNotification(`${user} has connected!`, 3000, "success");
    });

    socket.on("currentTime", ({ timer }) => {
      setTimer(timer);
      intervalRef.current = setInterval(performIntervalAction, 1000);
    });

    // Error Handlers
    socket.on("connect_error", (err) => {
      handleOpenNotification(
        "Encountered issues connecting to server!",
        3000,
        "error",
      );
    });

    socket.on("error", ({ message }) => {
      handleOpenNotification(message, 3000, "error");
    });

    socket.on("disconnect", () => {
      handleOpenNotification("Lost connection to the server!", 3000, "error");
    });

    socket.on("userDisconnect", ({ user }) => {
      handleOpenNotification(`${user} has disconnected!`, 3000, "warning");
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (socket && view) {
      socket.on("codeUpdated", ({ code }) => {
        const currSelection = getCurrentSelection(view.state);

        view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code },
        });

        view.dispatch({
          selection: {
            anchor: currSelection > code.length ? code.length : currSelection,
          },
        });
      });
    }
  }, [socket, view]);

  return {
    editor,
    users,
    timer,
  };
};

export default useCollabEditor;
