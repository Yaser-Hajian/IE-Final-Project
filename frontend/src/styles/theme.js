import { createTheme } from "@mui/material";

const lightTheme = createTheme({
  typography: { fontFamily: ["Vazirmatn"].join(",") },
  palette: { mode: "light" },
});

const darkTheme = createTheme({
  typography: { fontFamily: ["Vazirmatn"].join(",") },
  palette: { mode: "dark" },
});

export { lightTheme };
export { darkTheme };
