/* eslint-disable no-unused-vars */
import { Link, useParams } from "react-router-dom";
import styles from "./index.module.css";
import useTermIdData from "../../../../hooks/useTermId";
import Loader from "../../../../components/dashboard/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { useState } from "react";
import SearchBox from "../../../../components/dashboard/searchBox";
import { updateRegistrationsData } from "../../../../redux/registrations";
import Empty from "../../../../components/dashboard/empty/empty";
import useCourseRegistrationsData from "../../../../hooks/useCourseRegistrations";
import StudentCard from "../../../../components/dashboard/studentCard";
import { updateCourseIdData } from "../../../../redux/courseId";

const ProfessorDashboardCourseId = () => {
  const { courseId } = useParams();
  const courseRegistrationData = useSelector((s) => s.courseId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoading, isError } = useCourseRegistrationsData(
    courseId,
    searchQuery
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
        <div dir="rtl" className={styles.con}>
          <div className={styles.head}>
            <div>
              <Typography variant="h5">
                {courseRegistrationData.name}
              </Typography>
            </div>

            <Typography>
              {courseRegistrationData.occupiedCapacity}نفر ثبت نام کرده اند
            </Typography>
          </div>
          <div className={styles.searchBoxHolder}>
            <SearchBox
              placeholder="جست و جوی دانشجو"
              onChange={changeSearchBox}
              startSearch={startSearch}
              value={searchQuery}
            />
          </div>
          <div dir="ltr" className={styles.top}></div>
          <div className={styles.items}>
            {courseRegistrationData.registrations.length == 0 ? (
              <Empty />
            ) : (
              courseRegistrationData.registrations.map((reg, i) => {
                return <StudentCard key={i} {...reg} />;
              })
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProfessorDashboardCourseId;
