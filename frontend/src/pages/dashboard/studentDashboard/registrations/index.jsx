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
import useCourseRegistrationsData from "../../../../hooks/useRegistrations";
import TermHeadInfo from "../../../../components/dashboard/termHeadInfo";
import TermDialogData from "../../../../components/dashboard/termDialogData";
import Pagination from "../../../../components/dashboard/pagination";
import usePagination from "../../../../hooks/usePagination";

const Registrations = () => {
  const registrationsData = useSelector((s) => s.registrations);
  const { termId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const termIdData = useSelector((s) => s.termId);
  const termIdState = useTermIdData(termId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isLoading } = useCourseRegistrationsData(termId);
  const { count, page, setPage, sliceFinish, sliceInit } = usePagination(
    registrationsData.registrations.length,
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
              <Typography sx={{ m: 0.5 }}>لیست دروس ثبت نامی</Typography>
              <Typography variant="caption">
                ({registrationsData.registrations.length})
              </Typography>
            </div>
            <SearchBox onChange={changeSearchBox} value={searchQuery} />
          </div>
          <div dir="rtl" className={styles.items}>
            {registrationsData.registrations.length == 0 ? (
              <Empty />
            ) : (
              registrationsData.registrations
                .filter(filter)
                .slice(sliceInit, sliceFinish)
                .map((term, i) => {
                  return (
                    <CourseCard
                      key={i}
                      {...term}
                      term={termIdData.name}
                      isreg={{
                        is: true,
                        registered: true,
                      }}
                    />
                  );
                })
            )}
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

export default Registrations;
