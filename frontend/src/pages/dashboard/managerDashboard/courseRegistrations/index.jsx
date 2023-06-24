import { useParams } from "react-router-dom";
import styles from "./index.module.css";
import Loader from "../../../../components/dashboard/loader/loader";
import { useSelector } from "react-redux";
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
import useAddCourseToLastSeen from "../../../../hooks/useAddCourseToLastSeen";
import downloadAsExcel from "../../../../utils/downloadExcel";

const ManagerCourseRegistrations = () => {
  const courseRegistrations = useSelector((s) => s.courseRegistrations);
  const { courseId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState(null);
  const courseData = useSelector((s) => s.course);
  const courseDataState = useCourseData(courseId);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { isLoading } = useCourseRegistrationsData(courseId);

  const { count, page, setPage, sliceFinish, sliceInit } = usePagination(
    courseRegistrations.courseRegistrations.length,
    6
  );
  useAddCourseToLastSeen(courseId);
  const settingSortType = (type) => {
    if (type == null) return;
    setSortType(type);
  };

  const filter = (p) => {
    const regex = new RegExp(`${searchQuery}`);
    if (regex.test(p.name) || regex.test(p.courseId)) {
      return true;
    }
    return false;
  };

  const sort = (a, b) => {
    if (sortType == null) return 1;
    if (sortType == "new") {
      return a.date < b.date ? 1 : -1;
    }

    if (sortType == "old") {
      return a.date > b.date ? 1 : -1;
    }
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
              <div className={styles.headTitle}>
                <Typography sx={{ m: 0.5 }}>
                  لیست ثبت نامی های این درس
                </Typography>
                <Typography variant="caption">
                  ({courseRegistrations.courseRegistrations.length})
                </Typography>
              </div>
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
                .filter(filter)
                .sort(sort)
                .slice(sliceInit, sliceFinish)
                .map((registration, i) => {
                  return (
                    <UserCard
                      isItControlled
                      key={i}
                      {...registration}
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
