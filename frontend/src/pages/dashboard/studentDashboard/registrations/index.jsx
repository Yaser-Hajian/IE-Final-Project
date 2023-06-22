/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import styles from "./index.module.css";
import Loader from "../../../../components/dashboard/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import useTermIdData from "../../../../hooks/useTermId";
import {
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import CourseCard from "../../../../components/dashboard/courseCard";
import Empty from "../../../../components/dashboard/empty/empty";
import SearchBox from "../../../../components/dashboard/searchBox";
import useCourseRegistrationsData from "../../../../hooks/useRegistrations";
import { updateRegistrationsData } from "../../../../redux/registrations";
import TermHeadInfo from "../../../../components/dashboard/termHeadInfo";
import TermDialogData from "../../../../components/dashboard/termDialogData";
import Pagination from "../../../../components/dashboard/pagination";
import usePagination from "../../../../hooks/usePagination";

const Registrations = () => {
  const registrationsData = useSelector((s) => s.registrations);
  const dispatch = useDispatch();
  const { termId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const termIdData = useSelector((s) => s.termId);
  const termIdState = useTermIdData(termId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isLoading, isError } = useCourseRegistrationsData(
    termId,
    searchQuery
  );
  const { count, page, setPage, sliceFinish, sliceInit } = usePagination(
    registrationsData.registrations.length,
    6
  );
  const startSearch = () => {
    if (searchQuery.trim() == "") return;
    dispatch(
      updateRegistrationsData({
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
            <Typography>لیست دروس ثبت نامی</Typography>
            <SearchBox
              onChange={changeSearchBox}
              startSearch={startSearch}
              value={searchQuery}
            />
          </div>
          <div dir="rtl" className={styles.items}>
            {registrationsData.registrations.length == 0 ? (
              <Empty />
            ) : (
              registrationsData.registrations
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
