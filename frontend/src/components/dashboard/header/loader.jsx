/* eslint-disable react/prop-types */
import { CircularProgress, Typography } from "@mui/material";
import styles from "./loader.module.css";

const Loader = ({ loadingText = "لطفا منتظر بمانید" }) => {
  return (
    <div className={styles.con}>
      <CircularProgress />
      <Typography>{loadingText}</Typography>
    </div>
  );
};

export default Loader;
