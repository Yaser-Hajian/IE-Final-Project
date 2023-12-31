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
import usePreregistrationsData from "../../../../hooks/usePreregistrations";
import TermHeadInfo from "../../../../components/dashboard/termHeadInfo";
import TermDialogData from "../../../../components/dashboard/termDialogData";
import Pagination from "../../../../components/dashboard/pagination";
import usePagination from "../../../../hooks/usePagination";

const Preregistrations = () => {
  const preregistrationsData = useSelector((s) => s.preregistrations);
  const { termId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const termIdData = useSelector((s) => s.termId);
  const termIdState = useTermIdData(termId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isLoading } = usePreregistrationsData(termId);

  const { count, page, setPage, sliceFinish, sliceInit } = usePagination(
    preregistrationsData.preregistrations.length,
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
              <Typography sx={{ m: 0.5 }}> لیست دروس پیش ثبت نامی </Typography>
              <Typography variant="caption">
                ({preregistrationsData.preregistrations.length})
              </Typography>
            </div>
            <SearchBox onChange={changeSearchBox} value={searchQuery} />
          </div>
          <div dir="rtl" className={styles.items}>
            {preregistrationsData.preregistrations.length == 0 ? (
              <Empty />
            ) : (
              preregistrationsData.preregistrations
                .filter(filter)
                .slice(sliceInit, sliceFinish)
                .map((term, i) => {
                  return (
                    <CourseCard
                      key={i}
                      {...term}
                      term={termIdData.name}
                      ispre={{
                        is: true,
                        preregistered: true,
                      }}
                    />
                  );
                })
            )}
          </div>
          <Pagination count={count} page={page} setPage={setPage} />
          <TermDialogData
            setIsDialogOpen={setIsDialogOpen}
            isDialogOpen={isDialogOpen}
            termData={termIdData}
          />
        </div>
      )}
    </>
  );
};

export default Preregistrations;
