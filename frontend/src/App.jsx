import { CssBaseline, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { darkTheme, lightTheme } from "./styles/theme";
import useTheme from "./hooks/useTheme";
import routes from "./routes";

function App() {
  useTheme();
  const { theme } = useSelector((s) => s.global);
  return (
    <ThemeProvider theme={theme == "light" ? lightTheme : darkTheme}>
      <ToastContainer
        limit={3}
        bodyClassName={"toasts"}
        rtl
        position="top-left"
      />
      <CssBaseline />
      {useRoutes(routes)}
    </ThemeProvider>
  );
}

export default App;
