import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: ["-apple-system", "BlinkMacSystemFont", "sans-serif"].join(","),
  },

  palette: {
    secondary: {
      main: "#ecf09c",
      light: "#fafbe7",
      dark: "#dde457",
      contrastText: "#000",
    },
    primary: {
      // Setting primary as black so that components such as textfield remain black
      main: "#454545",
      mainColor: "#a09cf0",
      light: "#e9e7fc",
      lessLight: "#C6C3F6",
      dark: "#6257d3",
      contrastText: "#000",
    },
    success: {
      main: "#00C9A7",
    },
    error: {
      main: "#C34A36",
      light: "#e86868",
    },
  },
});
