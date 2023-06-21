import { switchTheme } from "../redux";
import { useDispatch, useSelector } from "react-redux";

const useThemeSwitch = () => {
  const { theme } = useSelector((s) => s.global);
  const dispatch = useDispatch();
  return (token) => {
    const newTheme =
      token == null ? (theme == "light" ? "dark" : "light") : token;
    localStorage.setItem("theme", JSON.stringify({ mode: newTheme }));
    dispatch(switchTheme(newTheme));
  };
};

export default useThemeSwitch;
