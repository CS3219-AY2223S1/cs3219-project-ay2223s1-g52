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
      dark: "#6257d3",
      contrastText: "#000",
    },
    warning: {
      main: "#e1132e",
      light: "#e86868",
    },

    //   accent: {
    //     main: "#FFE8FF",
    //   },
  },
});
