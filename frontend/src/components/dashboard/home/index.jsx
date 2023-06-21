/* eslint-disable react/prop-types */
import { Divider, Typography } from "@mui/material";
import styles from "./index.module.css";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import TermCard from "../termCard/termCard";
import CourseCard from "../courseCard";
import useHomeData from "../../../hooks/useHomeData";
import { useSelector } from "react-redux";
import Loader from "../loader/loader";
import Empty from "../empty/empty";

const Home = ({ userType }) => {
  const homeData = useSelector((s) => s.home);
  const { isLoading } = useHomeData();
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div dir="rtl" className={styles.con}>
          <div className={styles.head}>
            <HomeRoundedIcon />
            <Typography className={styles.headText} variant="h6">
              صحفه اصلی داشبورد
            </Typography>
          </div>
          <Divider />

          <div className={styles.itemCon}>
            <Typography>آخرین ترم های مشاهده شده</Typography>
            <div className={styles.items}>
              {homeData.lastObservedTerms.length == 0 ? (
                <Empty />
              ) : (
                homeData.lastObservedTerms.slice(0, 3).map((term, i) => {
                  return (
                    <TermCard
                      url={`/dashboard/${userType}/terms/${term.id}`}
                      key={i}
                      {...term}
                    />
                  );
                })
              )}
            </div>
          </div>

          <div className={styles.itemCon}>
            <Typography>آخرین درس های مشاهده شده</Typography>
            <div className={styles.items}>
              {homeData.lastObservedCourses.length == 0 ? (
                <Empty />
              ) : (
                homeData.lastObservedCourses.slice(0, 3).map((course, i) => {
                  return <CourseCard key={i} {...course} />;
                })
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
