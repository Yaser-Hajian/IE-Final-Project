import { useParams } from "react-router-dom";
import styles from "./index.module.css";
import usePreregistrationCoursesData from "../../../../hooks/usePreregistrationCourses";
import Loader from "../../../../components/dashboard/loader/loader";
import { useSelector } from "react-redux";
import { useState } from "react";
import useTermIdData from "../../../../hooks/useTermId";
import { Typography } from "@mui/material";
import CourseCard from "../../../../components/dashboard/courseCard";
import Empty from "../../../../components/dashboard/empty/empty";
import SearchBox from "../../../../components/dashboard/searchBox";
import TermDialogData from "../../../../components/dashboard/termDialogData";
import TermHeadInfo from "../../../../components/dashboard/termHeadInfo";
import Pagination from "../../../../components/dashboard/pagination";
import usePagination from "../../../../hooks/usePagination";

const PreregistrationCourses = () => {
  const preregistrationCoursesData = useSelector(
    (s) => s.preregistrationCourses
  );
  const loggedUser = useSelector((s) => s.loggedUser);
  const { termId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const termIdData = useSelector((s) => s.termId);
  const termIdState = useTermIdData(termId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const preregistrationCoursesDataState = usePreregistrationCoursesData(termId);
  const { count, page, setPage, sliceFinish, sliceInit } = usePagination(
    preregistrationCoursesData.preregistrationCourses.length,
    6
  );

  const changeSearchBox = (e) => {
    setSearchQuery(e.currentTarget.value);
  };

  const filter = (p) => {
    const regex = new RegExp(`${searchQuery}`);
    if (regex.test(p.name) || regex.test(p.courseId)) {
      return true;
    }
    return false;
  };

  return (
    <>
      {termIdState.isLoading || preregistrationCoursesDataState.isLoading ? (
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
                لیست دروس ارایه شده پیش ثبت نامی
              </Typography>
              <Typography variant="caption">
                ({preregistrationCoursesData.preregistrationCourses.length})
              </Typography>
            </div>
            <SearchBox onChange={changeSearchBox} value={searchQuery} />
          </div>
          <div dir="rtl" className={styles.items}>
            {preregistrationCoursesData.preregistrationCourses.length == 0 ? (
              <Empty />
            ) : (
              preregistrationCoursesData.preregistrationCourses
                .filter(filter)
                .slice(sliceInit, sliceFinish)
                .map((term, i) => {
                  const isPreregistered = loggedUser.preregistrations.filter(
                    (id) => id == term.id
                  );
                  return (
                    <CourseCard
                      key={i}
                      {...term}
                      term={termIdData.name}
                      ispre={{
                        is: true,
                        preregistered: isPreregistered.length != 0,
                      }}
                    />
                  );
                })
            )}
          </div>
          <Pagination count={count} page={page} setPage={setPage} />
          <TermDialogData
            termData={termIdData}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
          />
        </div>
      )}
    </>
  );
};

export default PreregistrationCourses;
