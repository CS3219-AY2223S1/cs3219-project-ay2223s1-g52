import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "layout/main";
import SignInPage from "views/sign-in-page";
import SignUpPage from "views/sign-up-page";
import SelectionPage from "views/selection-page";
import CollabRoomPage from "views/collab-room-page";
import CollabRoomEndPage from "views/collab-room-end-page";
import ProfilePage from "views/profile-page";
import HistoryPage from "views/history-page";
import SoloRoomPage from "views/solo-room-page";

import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "common/theme.js";
import ProtectedRoute from "components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          sx={{ height: "100vh" }}
          bgcolor="secondary.light"
        >
          <Router>
            <Routes>
              <Route element={<ProtectedRoute />}>
                <Route exact path="/" element={<MainLayout />}>
                  <Route path="/" element={<SelectionPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="room" element={<CollabRoomPage />} />
                  <Route path="soloRoom" element={<SoloRoomPage />} />
                  <Route path="endOfSession" element={<CollabRoomEndPage />} />
                  <Route path="history" element={<HistoryPage />} />
                </Route>
              </Route>

              <Route path="/login" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
            </Routes>
          </Router>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
