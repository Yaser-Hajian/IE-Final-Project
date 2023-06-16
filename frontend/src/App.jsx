import { ThemeProvider, Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./redux";
import { theme } from "./styles/theme";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div>
          <Typography>دانشگاه شهید بهشتی</Typography>
        </div>
        <ToastContainer />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
