import { Paper, Typography } from "@mui/material";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <>
      <Paper variant="outlined" className={styles.con}>
        <Typography variant="h6">دانشگاه بهشتی</Typography>
        <Typography variant="caption">
          © تمامی حقوق دانشگاه شهید بهشتی متعلق به این سایت است.
        </Typography>
      </Paper>
    </>
  );
};

export default Footer;
