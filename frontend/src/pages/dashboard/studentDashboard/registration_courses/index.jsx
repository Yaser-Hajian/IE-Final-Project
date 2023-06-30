import { useParams } from "react-router-dom";
import styles from "./index.module.css";
import Loader from "../../../../components/dashboard/loader/loader";
import { useSelector } from "react-redux";
import { useState } from "react";
import useTermIdData from "../../../../hooks/useTermId";
import { Typography } from "@mui/material";
import CourseCard from "../../../../components/dashboard/courseCard";
import Empty from "../../../../components/dashboard/empty/empty";
import SearchBox from "../../../../components/dashboard/searchBox";
import useRegistrationCoursesData from "../../../../hooks/useRegistrationCourses";
import TermHeadInfo from "../../../../components/dashboard/termHeadInfo";
import TermDialogData from "../../../../components/dashboard/termDialogData";
import usePagination from "../../../../hooks/usePagination";
import Pagination from "../../../../components/dashboard/pagination";

const RegistrationCourses = () => {
  const registrationCoursesData = useSelector((s) => s.registrationCourses);
  const loggedUser = useSelector((s) => s.me);
  const { termId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const termIdData = useSelector((s) => s.termId);
  const termIdState = useTermIdData(termId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isLoading } = useRegistrationCoursesData(termId);
  const { count, page, setPage, sliceFinish, sliceInit } = usePagination(
    registrationCoursesData.registrationCourses.length,
    6
  );

  const filter = (p) => {
    const regex = new RegExp(`${searchQuery}`);
    if (regex.test(p.name) || regex.test(p.courseId)) {
      return true;
    }
    return false;
  };

  const changeSearchBox = (e) => {
    setSearchQuery(e.currentTarget.value);
  };

  return (
    <>
      {termIdState.isLoading || isLoading ? (
        <Loader />
      ) : (
        <div className={styles.con}>
          <TermHeadInfo
            setIsDialogOpen={setIsDialogOpen}
            termData={termIdData}
          />
          <div dir="rtl" className={styles.top}>
            <div className={styles.topTitle}>
              <Typography sx={{ m: 0.5 }}>
                لیست دروس ارایه شده ثبت نامی
              </Typography>
              <Typography variant="caption">
                ({registrationCoursesData.registrationCourses.length})
              </Typography>
            </div>
            <SearchBox onChange={changeSearchBox} value={searchQuery} />
          </div>
          <div dir="rtl" className={styles.items}>
            <>
              {registrationCoursesData.registrationCourses.length == 0 ? (
                <Empty />
              ) : (
                registrationCoursesData.registrationCourses
                  .filter(filter)
                  .slice(sliceInit, sliceFinish)
                  .map((course, i) => {
                    const isRegistered = loggedUser.registrations.filter(
                      (id) => id.courseId == course.id
                    );
                    return (
                      <CourseCard
                        key={i}
                        {...course}
                        term={termIdData.name}
                        isreg={{
                          is: true,
                          registered: isRegistered.length != 0,
                        }}
                      />
                    );
                  })
              )}
            </>
          </div>

          <Pagination count={count} page={page} setPage={setPage} />

          <TermDialogData
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            termData={termIdData}
          />
        </div>
      )}
    </>
  );
};

export default RegistrationCourses;
