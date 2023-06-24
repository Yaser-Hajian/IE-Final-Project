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
import useCoursePreregistrations from "../../../../hooks/useCoursePreregistrations";
import useCourseData from "../../../../hooks/useCourseData";
import UserCard from "../../../../components/dashboard/userCard";
import { updateCoursePreregistrationsData } from "../../../../redux/coursePreregistrations";
import FilterMenu from "../../../../components/dashboard/filterMenu";
import CourseHeadInfo from "../../../../components/dashboard/courseHeadInfo";
import CourseDialogData from "../../../../components/dashboard/courseDialogData";
import usePagination from "../../../../hooks/usePagination";
import Pagination from "../../../../components/dashboard/pagination";
import useAddCourseToLastSeen from "../../../../hooks/useAddCourseToLastSeen";
import downloadAsExcel from "../../../../utils/downloadExcel";

const ManagerCoursePreregistrations = () => {
  const coursePreregistrations = useSelector((s) => s.coursePreregistrations);
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState(null);
  const courseData = useSelector((s) => s.course);
  const courseDataState = useCourseData(courseId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { isLoading } = useCoursePreregistrations(
    courseId,
    searchQuery,
    sortType
  );
  const { count, page, setPage, sliceFinish, sliceInit } = usePagination(
    coursePreregistrations.coursePreregistrations.length,
    6
  );
  useAddCourseToLastSeen(courseId);
  const settingSortType = (type) => {
    if (type == null) return;
    setSortType(type);
    dispatch(
      updateCoursePreregistrationsData({
        isDataLoadedBefore: false,
      })
    );
  };

  const startSearch = () => {
    if (searchQuery.trim() == "") return;
    dispatch(
      updateCoursePreregistrationsData({
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
    toast.promise(
      downloadAsExcel(coursePreregistrations.coursePreregistrations),
      {
        pending: "لطفا صبر کنید",
        error: "یه مشکلی پیش اومده لطفا دوباره امتحان کن",
        success: "با موفقیت فایل اکسل دانلود شد",
      }
    );
  };

  return (
    <>
      {courseDataState.isLoading || isLoading ? (
        <Loader />
      ) : (
        <div className={styles.con}>
          <CourseHeadInfo
            setIsDialogOpen={setIsDialogOpen}
            courseData={courseData}
          />
          <div dir="rtl" className={styles.top}>
            <div className={styles.topHead}>
              <Typography>لیست پیش ثبت نامی های این درس</Typography>
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
            {coursePreregistrations.coursePreregistrations.length == 0 ? (
              <Empty />
            ) : (
              coursePreregistrations.coursePreregistrations
                .slice(sliceInit, sliceFinish)
                .map((course, i) => {
                  return (
                    <UserCard
                      isItControlled
                      isPreregistrationCard
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

export default ManagerCoursePreregistrations;