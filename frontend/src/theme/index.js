import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#5b5b5b",
      main: "#333333",
      dark: "#232323",
      contrastText: "#fff",
    },
    secondary: {
      light: "#33bfff",
      main: "#00b0ff",
      dark: "#007bb2",
      contrastText: "#000",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#ddd",
    },
  },
  typography: {
    fontFamily: ["Ubuntu", "sans-serif"].join(","),
  },
});

export default theme;
