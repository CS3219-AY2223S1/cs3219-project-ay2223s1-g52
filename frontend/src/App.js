import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "layout/main";
import SelectionContent from "views/selection-content";
import SignInPage from "views/sign-in-page";
import SignUpPage from "views/sign-up-page";
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "common/theme.js";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          sx={{ height: "100vh" }}
          bgcolor="primary.main"
        >
          <Router>
            <Routes>
              <Route exact path="/" element={<MainLayout />}>
                <Route path="/" element={<SelectionContent />} />
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
