import { Paper, Typography } from "@mui/material";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <>
      <Paper variant="outlined" className={styles.con}>
        <Typography variant="h6">دانشگاه شریف</Typography>
        <Typography variant="caption">
          © تمامی حقوق دانشگاه شریف متعلق به این سایت است.
        </Typography>
      </Paper>
    </>
  );
};

export default Footer;
