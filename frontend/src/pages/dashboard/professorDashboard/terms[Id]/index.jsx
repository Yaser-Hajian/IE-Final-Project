import { useParams } from "react-router-dom";
import styles from "./index.module.css";
import useTermIdData from "../../../../hooks/useTermId";
import Loader from "../../../../components/dashboard/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { Button, Pagination, Typography } from "@mui/material";
import { useState } from "react";
import SearchBox from "../../../../components/dashboard/searchBox";
import useCourseRegistrationsData from "../../../../hooks/useRegistrations";
import { updateRegistrationsData } from "../../../../redux/registrations";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CourseCard from "../../../../components/dashboard/courseCard";
import Empty from "../../../../components/dashboard/empty/empty";
import TermHeadInfo from "../../../../components/dashboard/termHeadInfo";
import TermDialogData from "../../../../components/dashboard/termDialogData";
import FilterMenu from "../../../../components/dashboard/filterMenu";
import usePagination from "../../../../hooks/usePagination";
import useAddTermToLastSeen from "../../../../hooks/useAddTermToLastSeen";

const ProfessorDashboardTermId = () => {
  const { termId } = useParams();
  const registrationData = useSelector((s) => s.registrations);
  const [sortType, setSortType] = useState(null);
  const termIdData = useSelector((s) => s.termId);
  const termIdState = useTermIdData(termId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoading } = useCourseRegistrationsData(
    termId,
    searchQuery,
    sortType
  );
  useAddTermToLastSeen(termId);
  const { count, page, setPage, sliceFinish, sliceInit } = usePagination(
    registrationData.registrations.length,
    6
  );
  const [anchorEl, setAnchorEl] = useState(null);

  const settingSortType = (type) => {
    if (type == null) return;
    setSortType(type);
    dispatch(
      updateRegistrationsData({
        isDataLoadedBefore: false,
      })
    );
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

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
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
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
            <div>
              <Typography>لیست دروس این ترم</Typography>
              <Button
                size="small"
                onClick={handleClick}
                dir="ltr"
                startIcon={<FilterAltIcon />}
              >
                فیلتر بر اساس
              </Button>
            </div>
            <SearchBox
              onChange={changeSearchBox}
              startSearch={startSearch}
              value={searchQuery}
            />
          </div>
          <div dir="rtl" className={styles.items}>
            {registrationData.registrations.length == 0 ? (
              <Empty />
            ) : (
              registrationData.registrations
                .slice(sliceInit, sliceFinish)
                .map((course, i) => {
                  return (
                    <CourseCard
                      url={`/dashboard/professor/course/${course.id}/registrations`}
                      key={i}
                      {...course}
                      term={termIdData.name}
                    />
                  );
                })
            )}
          </div>

          <Pagination
            count={count}
            page={page}
            onChange={(e, v) => setPage(v)}
          />
          <TermDialogData
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            termData={termIdData}
          />
          <FilterMenu
            anchorEl={anchorEl}
            settingSortType={settingSortType}
            handleClose={handleClose}
            open
            menuItems={[
              { text: "بیشترین ثبت نام", sortType: "mostRegister" },
              { text: "کمترین ثبت نام", sortType: "minimum Register" },
            ]}
          />
        </div>
      )}
    </>
  );
};

export default ProfessorDashboardTermId;
