import { ThemeProvider, Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./redux";
import { theme } from "./styles/theme";
import { Route, Routes } from "react-router-dom";
import { CheckAuthentication } from "./components/checkAuthentication";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import LoginPage from "./pages/login";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ToastContainer limit={3} bodyClassName={"toasts"} rtl />
        <Routes>
          <Route path="/" element={<CheckAuthentication />} />
          <Route
            path="/login"
            element={
              <CheckAuthentication>
                <LoginPage />
              </CheckAuthentication>
            }
          />
          <Route
            path="/dashboard"
            element={
              <CheckAuthentication>
                <Typography>dash</Typography>
              </CheckAuthentication>
            }
          />
        </Routes>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
