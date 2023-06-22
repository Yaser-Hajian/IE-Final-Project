import { useParams } from "react-router-dom";
import styles from "./index.module.css";
import Loader from "../../../../components/dashboard/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import SearchBox from "../../../../components/dashboard/searchBox";
import Empty from "../../../../components/dashboard/empty/empty";
import useCourseRegistrationsData from "../../../../hooks/useCourseRegistrations";
import StudentCard from "../../../../components/dashboard/studentCard";
import { updateCourseIdData } from "../../../../redux/courseId";
import usePagination from "../../../../hooks/usePagination";
import Pagination from "../../../../components/dashboard/pagination";

const ProfessorDashboardCourseId = () => {
  const { courseId } = useParams();
  const courseRegistrationData = useSelector((s) => s.courseId);
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoading } = useCourseRegistrationsData(courseId, searchQuery);
  const { count, page, setPage, sliceFinish, sliceInit } = usePagination(
    courseRegistrationData.courseRegistrations.length,
    6
  );
  const dispatch = useDispatch();

  const startSearch = () => {
    if (searchQuery.trim() == "") return;
    dispatch(
      updateCourseIdData({
        isDataLoadedBefore: false,
      })
    );
  };

  const changeSearchBox = (e) => {
    setSearchQuery(e.currentTarget.value);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div dir="" className={styles.con}>
          <Box borderBottom={1} className={styles.head}>
            <div>
              <Typography variant="h5">
                {courseRegistrationData.name}
              </Typography>
            </div>

            <Typography>
              {courseRegistrationData.occupiedCapacity}نفر ثبت نام کرده اند
            </Typography>
          </Box>
          <div className={styles.searchBoxHolder}>
            <SearchBox
              placeholder="جست و جوی دانشجو"
              onChange={changeSearchBox}
              startSearch={startSearch}
              value={searchQuery}
            />
          </div>
          <div dir="rtl" className={styles.items}>
            {courseRegistrationData.courseRegistrations.length == 0 ? (
              <Empty />
            ) : (
              courseRegistrationData.courseRegistrations
                .slice(sliceInit, sliceFinish)
                .map((reg, i) => {
                  return <StudentCard isItControlled key={i} {...reg} />;
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
