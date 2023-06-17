import { Typography } from "@mui/material";
import styles from "./empty.module.css";

const Empty = () => {
  return (
    <div className={styles.con}>
      <Typography variant="caption">( موردی برای نمایش وجود ندارد)</Typography>
    </div>
  );
};

export default Empty;
