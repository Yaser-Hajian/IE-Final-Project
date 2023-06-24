/* eslint-disable react/prop-types */
import { Typography } from "@mui/material";
import styles from "./index.module.css";
const RtlInput = ({ children, label }) => {
  return (
    <div className={styles.con}>
      <Typography>{label}</Typography>
      {children}
    </div>
  );
};

export default RtlInput;
