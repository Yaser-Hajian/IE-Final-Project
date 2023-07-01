import { useParams } from "react-router-dom";
import styles from "./index.module.css";
import Loader from "../../../../components/dashboard/loader/loader";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import SearchBox from "../../../../components/dashboard/searchBox";
import Empty from "../../../../components/dashboard/empty/empty";
import useCourseRegistrationsData from "../../../../hooks/useCourseRegistrations";
import usePagination from "../../../../hooks/usePagination";
import Pagination from "../../../../components/dashboard/pagination";
import useAddCourseToLastSeen from "../../../../hooks/useAddCourseToLastSeen";
import UserCard from "../../../../components/dashboard/userCard";
import useCourseData from "../../../../hooks/useCourseData";

const ProfessorDashboardCourseId = () => {
  const { courseId } = useParams();
  const courseRegistrationData = useSelector((s) => s.courseRegistrations);
  const [searchQuery, setSearchQuery] = useState("");
  const courseDataState = useCourseData(courseId);
  const courseData = useSelector((s) => s.course);
  const { isLoading } = useCourseRegistrationsData(courseId);
  const { count, page, setPage, sliceFinish, sliceInit } = usePagination(
    courseRegistrationData.courseRegistrations.length,
    6
  );
  const me = useSelector((s) => s.me);

  useAddCourseToLastSeen(courseId);

  const filter = (p) => {
    const regex = new RegExp(`${searchQuery}`);
    if (
      regex.test(p.name) ||
      regex.test(p.familyName) ||
      regex.test(p.studentId)
    ) {
      return true;
    }
    return false;
  };

  const changeSearchBox = (e) => {
    setSearchQuery(e.currentTarget.value);
  };

  return (
    <>
      {isLoading || courseDataState.isLoading ? (
        <Loader />
      ) : (
        <div dir="" className={styles.con}>
          <Box borderBottom={1} className={styles.head}>
            <div>
              <Typography variant="h5">{courseData.name}</Typography>
            </div>

            <Typography>
              {courseData.occupiedCapacity}نفر ثبت نام کرده اند
            </Typography>
          </Box>
          <div className={styles.searchBoxHolder}>
            <SearchBox
              placeholder="جست و جوی دانشجو"
              onChange={changeSearchBox}
              value={searchQuery}
            />
          </div>
          <div dir="rtl" className={styles.items}>
            {courseRegistrationData.courseRegistrations.length == 0 ? (
              <Empty />
            ) : (
              courseRegistrationData.courseRegistrations
                .filter(filter)
                .slice(sliceInit, sliceFinish)
                .map((reg, i) => {
                  return (
                    <UserCard
                      isPass={reg.isPass}
                      isPreregistrationCard={
                        !(`${me.name} ${me.familyName}` == courseData.professor)
                      }
                      isItControlled
                      key={i}
                      {...reg}
                    />
                  );
                })
            )}
          </div>
          <Pagination page={page} setPage={setPage} count={count} />
        </div>
      )}
    </>
  );
};

export default ProfessorDashboardCourseId;
