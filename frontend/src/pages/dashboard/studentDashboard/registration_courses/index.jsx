import { useParams } from "react-router-dom";
import styles from "./index.module.css";
import Loader from "../../../../components/dashboard/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import useTermIdData from "../../../../hooks/useTermId";
import { Typography } from "@mui/material";
import CourseCard from "../../../../components/dashboard/courseCard";
import Empty from "../../../../components/dashboard/empty/empty";
import SearchBox from "../../../../components/dashboard/searchBox";
import useRegistrationCoursesData from "../../../../hooks/useRegistrationCourses";
import { updateRegistrationCoursesData } from "../../../../redux/registrationCourses";
import TermHeadInfo from "../../../../components/dashboard/termHeadInfo";
import TermDialogData from "../../../../components/dashboard/termDialogData";
import usePagination from "../../../../hooks/usePagination";
import Pagination from "../../../../components/dashboard/pagination";

const RegistrationCourses = () => {
  const registrationCoursesData = useSelector((s) => s.registrationCourses);
  const dispatch = useDispatch();
  const loggedUser = useSelector((s) => s.loggedUser);
  const { termId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const termIdData = useSelector((s) => s.termId);
  const termIdState = useTermIdData(termId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isLoading } = useRegistrationCoursesData(termId, searchQuery);
  const { count, page, setPage, sliceFinish, sliceInit } = usePagination(
    registrationCoursesData.registrationCourses.length,
    6
  );
  const startSearch = () => {
    if (searchQuery.trim() == "") return;
    dispatch(
      updateRegistrationCoursesData({
        isDataLoadedBefore: false,
      })
    );
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
            <Typography>لیست دروس ارایه شده ثبت نامی</Typography>
            <SearchBox
              onChange={changeSearchBox}
              startSearch={startSearch}
              value={searchQuery}
            />
          </div>
          <div dir="rtl" className={styles.items}>
            <>
              {registrationCoursesData.registrationCourses.length == 0 ? (
                <Empty />
              ) : (
                registrationCoursesData.registrationCourses
                  .slice(sliceInit, sliceFinish)
                  .map((term, i) => {
                    const isRegistered = loggedUser.registrations.filter(
                      (id) => id == term.id
                    );
                    return (
                      <CourseCard
                        key={i}
                        {...term}
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
