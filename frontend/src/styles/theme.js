import { createTheme } from "@mui/material";

const sharedTokens = {
  typography: { fontFamily: ["Vazirmatn"].join(",") },
};

const lightTheme = createTheme({
  ...sharedTokens,
  palette: { mode: "light" },
});

const darkTheme = createTheme({
  ...sharedTokens,
  palette: { mode: "dark" },
});

export { lightTheme };
export { darkTheme };
