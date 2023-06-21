import { useEffect } from "react";
import { switchTheme } from "../redux";
import { useDispatch } from "react-redux";

const useTheme = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const theme = JSON.parse(localStorage.getItem("theme"));
    if (theme == null || theme.mode == null) {
      localStorage.setItem("theme", JSON.stringify({ mode: "light" }));
    } else {
      dispatch(switchTheme(theme.mode));
    }
  }, [dispatch]);
};

export default useTheme;
