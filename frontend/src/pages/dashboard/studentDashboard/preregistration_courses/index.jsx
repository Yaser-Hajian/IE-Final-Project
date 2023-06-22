import { useParams } from "react-router-dom";
import styles from "./index.module.css";
import usePreregistrationCoursesData from "../../../../hooks/usePreregistrationCourses";
import Loader from "../../../../components/dashboard/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import useTermIdData from "../../../../hooks/useTermId";
import { Typography } from "@mui/material";
import CourseCard from "../../../../components/dashboard/courseCard";
import Empty from "../../../../components/dashboard/empty/empty";
import SearchBox from "../../../../components/dashboard/searchBox";
import { updatePreregistrationCoursesData } from "../../../../redux/preregistrationCourses";
import TermDialogData from "../../../../components/dashboard/termDialogData";
import TermHeadInfo from "../../../../components/dashboard/termHeadInfo";
import Pagination from "../../../../components/dashboard/pagination";
import usePagination from "../../../../hooks/usePagination";

const PreregistrationCourses = () => {
  const preregistrationCoursesData = useSelector(
    (s) => s.preregistrationCourses
  );
  const dispatch = useDispatch();
  const loggedUser = useSelector((s) => s.loggedUser);
  const { termId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const termIdData = useSelector((s) => s.termId);
  const termIdState = useTermIdData(termId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const preregistrationCoursesDataState = usePreregistrationCoursesData(
    termId,
    searchQuery
  );
  const { count, page, setPage, sliceFinish, sliceInit } = usePagination(
    preregistrationCoursesData.preregistrationCourses.length,
    6
  );

  const startSearch = () => {
    if (searchQuery.trim() == "") return;
    dispatch(
      updatePreregistrationCoursesData({
        isDataLoadedBefore: false,
      })
    );
  };

  const changeSearchBox = (e) => {
    setSearchQuery(e.currentTarget.value);
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
            <Typography>لیست دروس ارایه شده پیش ثبت نامی</Typography>
            <SearchBox
              onChange={changeSearchBox}
              startSearch={startSearch}
              value={searchQuery}
            />
          </div>
          <div dir="rtl" className={styles.items}>
            {preregistrationCoursesData.preregistrationCourses.length == 0 ? (
              <Empty />
            ) : (
              preregistrationCoursesData.preregistrationCourses
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
