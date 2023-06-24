import { Link } from "react-router-dom";
import styles from "./index.module.css";
import { Typography } from "@mui/material";
import { Add, People, PersonAdd } from "@mui/icons-material";
const AdminHomePage = () => {
  return (
    <div className={styles.con}>
      <div dir="ltr" className={styles.main}>
        <Link to={"students"}>
          <div className={styles.items}>
            <People />
            <Typography>لیست دانشجویان</Typography>
          </div>
        </Link>
        <Link to={"professors"}>
          <div className={styles.items}>
            <People />
            <Typography>لیست اساتید</Typography>
          </div>
        </Link>
        <Link to={"managers"}>
          <div className={styles.items}>
            <People />
            <Typography>لیست مدیران</Typography>
          </div>
        </Link>
      </div>
      <div className={styles.main}>
        <Link to={"student/add"}>
          <div className={styles.items}>
            <PersonAdd />
            <Typography>اضافه کردن دانشجو</Typography>
          </div>
        </Link>
        <Link to={"professor/add"}>
          <div className={styles.items}>
            <PersonAdd />
            <Typography>اضافه کردن استاد</Typography>
          </div>
        </Link>
        <Link to={"manager/add"}>
          <div className={styles.items}>
            <PersonAdd />
            <Typography>اضافه کردن مدیر آموزشی</Typography>
          </div>
        </Link>
        <Link to={"college/add"}>
          <div className={styles.items}>
            <Add />
            <Typography>اضافه کردن دانشکده</Typography>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminHomePage;
