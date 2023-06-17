/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Divider, Typography } from "@mui/material";
import styles from "./home.module.css";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import TermCard from "../termCard/termCard";
import CourseCard from "../courseCard/courseCard";
import useHomeData from "../../../hooks/useHomeData";
import { useSelector } from "react-redux";
import Loader from "../header/loader";
import Empty from "../empty/empty";

const Home = ({ userType }) => {
  const homeData = useSelector((s) => s.home);
  const { isLoading, isError } = useHomeData();
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
                homeData.lastObservedTerms.map((term, i) => {
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
                homeData.lastObservedCourses.map((term, i) => {
                  console.log(homeData.lastObservedCourses.length);
                  return <CourseCard key={i} {...term} />;
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
