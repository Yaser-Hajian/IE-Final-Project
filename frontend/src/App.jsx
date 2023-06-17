import { ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./redux";
import { theme } from "./styles/theme";
import { Route, Routes } from "react-router-dom";
import { CheckAuthentication } from "./components/checkAuthentication";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import LoginPage from "./pages/login";
import StudentDashboard from "./pages/dashboard/studentDashboard";
import Home from "./components/dashboard/home/home";

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
            path="/dashboard/student"
            element={
              <CheckAuthentication>
                <StudentDashboard />
              </CheckAuthentication>
            }
          >
            <Route path="" element={<Home />} />
            <Route path="terms" element={<h1>terms</h1>} />
          </Route>
          <Route path="*" element={<h4>NOT FOUND 404</h4>} />
        </Routes>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
