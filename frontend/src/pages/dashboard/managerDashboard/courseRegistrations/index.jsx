import { useParams } from "react-router-dom";
import styles from "./index.module.css";
import Loader from "../../../../components/dashboard/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Button, Typography } from "@mui/material";
import Empty from "../../../../components/dashboard/empty/empty";
import SearchBox from "../../../../components/dashboard/searchBox";
import { toast } from "react-toastify";
import useCourseData from "../../../../hooks/useCourseData";
import UserCard from "../../../../components/dashboard/userCard";
import useCourseRegistrationsData from "../../../../hooks/useCourseRegistrations";
import CourseHeadInfo from "../../../../components/dashboard/courseHeadInfo";
import CourseDialogData from "../../../../components/dashboard/courseDialogData";
import usePagination from "../../../../hooks/usePagination";
import Pagination from "../../../../components/dashboard/pagination";
import FilterMenu from "../../../../components/dashboard/filterMenu";
import { updateCourseRegistrationsData } from "../../../../redux/courseRegistrations";
import useAddCourseToLastSeen from "../../../../hooks/useAddCourseToLastSeen";
import downloadAsExcel from "../../../../utils/downloadExcel";

const ManagerCourseRegistrations = () => {
  const courseRegistrations = useSelector((s) => s.courseRegistrations);
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState(null);
  const courseData = useSelector((s) => s.course);
  const courseDataState = useCourseData(courseId);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { isLoading } = useCourseRegistrationsData(
    courseId,
    searchQuery,
    sortType
  );

  const { count, page, setPage, sliceFinish, sliceInit } = usePagination(
    courseRegistrations.courseRegistrations.length,
    6
  );
  useAddCourseToLastSeen(courseId);
  const settingSortType = (type) => {
    if (type == null) return;
    setSortType(type);
    dispatch(
      updateCourseRegistrationsData({
        isDataLoadedBefore: false,
      })
    );
  };

  const startSearch = () => {
    if (searchQuery.trim() == "") return;
    dispatch(
      updateCourseRegistrationsData({
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

  const handleClose = () => {
    setAnchorEl(null);
  };

  const downloadExcel = () => {
    toast.promise(downloadAsExcel(courseRegistrations.courseRegistrations), {
      pending: "لطفا صبر کنید",
      error: "یه مشکلی پیش اومده لطفا دوباره امتحان کن",
      success: "با موفقیت فایل اکسل دانلود شد",
    });
  };

  return (
    <>
      {courseDataState.isLoading || isLoading ? (
        <Loader />
      ) : (
        <div className={styles.con}>
          <CourseHeadInfo
            courseData={courseData}
            setIsDialogOpen={setIsDialogOpen}
          />
          <div dir="rtl" className={styles.top}>
            <div className={styles.topHead}>
              <Typography>لیست ثبت نامی های این درس</Typography>
              <Button
                dir="ltr"
                startIcon={<FilterAltIcon />}
                onClick={handleClick}
              >
                فیلتر بر اساس
              </Button>
            </div>
            <div className={styles.searchBoxCon}>
              <SearchBox
                placeholder="جست جو بر اساس اسم"
                onChange={changeSearchBox}
                startSearch={startSearch}
                value={searchQuery}
              />

              <Button onClick={downloadExcel} sx={{ mt: 2 }} variant="outlined">
                دانلود اکسل
              </Button>
            </div>
          </div>
          <div dir="rtl" className={styles.items}>
            {courseRegistrations.courseRegistrations.length == 0 ? (
              <Empty />
            ) : (
              courseRegistrations.courseRegistrations
                .slice(sliceInit, sliceFinish)
                .map((course, i) => {
                  return (
                    <UserCard
                      isItControlled
                      key={i}
                      {...course}
                      term={courseData.name}
                    />
                  );
                })
            )}
          </div>
          <Pagination count={count} page={page} setPage={setPage} />

          <CourseDialogData
            courseData={courseData}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
          />
          <FilterMenu
            anchorEl={anchorEl}
            handleClose={handleClose}
            menuItems={[
              { text: "جدید ترین", sortType: "new" },
              { text: "قدیمی ترین", sortType: "old" },
            ]}
            settingSortType={settingSortType}
          />
        </div>
      )}
    </>
  );
};

export default ManagerCourseRegistrations;
