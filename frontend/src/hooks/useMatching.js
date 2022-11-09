import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { matchUser } from "api";
import { URI_MATCHING_SVC } from "common/configs";
import io from "socket.io-client";
import { useCookies } from "react-cookie";

const TIMER_COUNTDOWN = 30;

const useMatching = ({ title }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(TIMER_COUNTDOWN);

  const [socket, setSocket] = useState(null);

  const [cookies] = useCookies(["token"]);

  const navigate = useNavigate();

  let intervalRef = useRef();

  const stopLoading = () => {
    setLoading(false);
    clearInterval(intervalRef.current);
  };

  const hardReset = () => {
    stopLoading();
    setSuccess(false);
    setFailure(false);
    setError(false);
    setTimer(TIMER_COUNTDOWN);
    setSocket(null);
  };

  useEffect(() => {
    return () => {
      intervalRef.current = setInterval(performIntervalAction, 1000);

      return () => hardReset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNavigate = (room, difficulty) => {
    setTimeout(() => {
      navigate(`/room?roomId=${room}&difficulty=${difficulty}`);
    }, 2000);
  };

  const handleSuccess = (room, difficulty) => {
    setSuccess(true);
    stopLoading();
    handleNavigate(room, difficulty);
  };

  const handleFailure = () => {
    setFailure(true);
    stopLoading();
  };

  const intervalAction = (timer) => {
    if (timer === 0) {
      handleFailure();
      return TIMER_COUNTDOWN;
    }
    return timer - 1;
  };

  const performIntervalAction = () => {
    setTimer((timer) => intervalAction(timer));
  };

  // Socket Functions

  const emitMatchFound = (socket, room) => {
    socket.emit("matchFound", { room });
  };

  const emitMatchWaiting = (socket, room, difficulty) => {
    socket.emit("matchWaiting", { room });

    socket.on("room", ({ room }) => {
      handleSuccess(room, difficulty);
    });

    socket.on("failToMatch", ({ msg }) => {
      console.error("No Match found ", msg);
    });
  };

  const handleDisconnect = async () => {
    socket?.disconnect();
    // Set timeout for smoother transition when user closes dialog
    setTimeout(hardReset, 200);
  };

  const handleMatchButtonClick = () => {
    const user = cookies.username;

    if (!user) {
      console.error("No username found");
    }

    const difficulty = title;
    if (!loading) {
      hardReset();
      setLoading(true);
      intervalRef.current = setInterval(performIntervalAction, 1000);
      matchUser(user, difficulty)
        .then((res) => {
          const { room, isMatch } = res.data;
          const socket = io.connect(URI_MATCHING_SVC);
          setSocket(socket);

          if (isMatch) {
            emitMatchFound(socket, room);
            handleSuccess(room, difficulty);
          } else {
            emitMatchWaiting(socket, room, difficulty);
          }
        })
        .catch((error) => {
          console.error(error);
          setError(true);
          stopLoading();
        });
    }
  };

  return {
    timer,
    success,
    failure,
    loading,
    error,
    handleMatchButtonClick,
    handleDisconnect,
  };
};

export default useMatching;
