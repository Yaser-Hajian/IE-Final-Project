import { useParams } from "react-router-dom";
import styles from "./index.module.css";
import usePreregistrationCoursesData from "../../../../hooks/usePreregistrationCourses";
import Loader from "../../../../components/dashboard/loader/loader";
import { useSelector } from "react-redux";
import { useState } from "react";
import useTermIdData from "../../../../hooks/useTermId";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Button, Typography } from "@mui/material";
import Empty from "../../../../components/dashboard/empty/empty";
import SearchBox from "../../../../components/dashboard/searchBox";
import CourseCard from "../../../../components/dashboard/manager/courseCard";
import { toast } from "react-toastify";
import AddCourse from "../../../../components/dashboard/manager/addCourse";
import TermHeadInfo from "../../../../components/dashboard/termHeadInfo";
import TermDialogData from "../../../../components/dashboard/termDialogData";
import FilterMenu from "../../../../components/dashboard/filterMenu";
import Pagination from "../../../../components/dashboard/pagination";
import usePagination from "../../../../hooks/usePagination";
import { Add } from "@mui/icons-material";
import downloadAsExcel from "../../../../utils/downloadExcel";

const ManagerPreregistrationCourses = () => {
  const preregistrationCoursesData = useSelector(
    (s) => s.preregistrationCourses
  );
  const { termId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState(null);
  const termIdData = useSelector((s) => s.termId);
  const termIdState = useTermIdData(termId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAddCourseVisible, setIsAddCourseVisible] = useState(false);
  const { isLoading } = usePreregistrationCoursesData(termId);
  const { count, page, setPage, sliceFinish, sliceInit } = usePagination(
    preregistrationCoursesData.preregistrationCourses.length,
    6
  );
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
    if (sortType == "mostRegister") {
      return a.occupiedCapacity < b.occupiedCapacity ? 1 : -1;
    }

    if (sortType == "minimumRegister") {
      return a.occupiedCapacity > b.occupiedCapacity ? 1 : -1;
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
    toast.promise(
      downloadAsExcel(preregistrationCoursesData.preregistrationCourses),
      {
        pending: "لطفا صبر کنید",
        error: "یه مشکلی پیش اومده لطفا دوباره امتحان کن",
        success: "با موفقیت فایل اکسل دانلود شد",
      }
    );
  };

  const closeHandle = () => {
    setIsAddCourseVisible(false);
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
              <div className={styles.topHead}>
                <div className={styles.headTitle}>
                  <Typography sx={{ m: 0.5 }}>
                    لیست دروس ارایه شده پیش ثبت نامی
                  </Typography>
                  <Typography variant="caption">
                    ({preregistrationCoursesData.preregistrationCourses.length})
                  </Typography>
                </div>
                <Button
                  dir="ltr"
                  onClick={() => {
                    setIsAddCourseVisible(true);
                  }}
                  startIcon={<Add />}
                >
                  افزودن درس
                </Button>
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
              <SearchBox onChange={changeSearchBox} value={searchQuery} />

              <Button onClick={downloadExcel} sx={{ mt: 2 }} variant="outlined">
                دانلود اکسل
              </Button>
            </div>
          </div>
          <div dir="rtl" className={styles.items}>
            {preregistrationCoursesData.preregistrationCourses.length == 0 ? (
              <Empty />
            ) : (
              preregistrationCoursesData.preregistrationCourses
                .filter(filter)
                .sort(sort)
                .slice(sliceInit, sliceFinish)
                .map((course, i) => {
                  return (
                    <CourseCard
                      url={`/dashboard/manager/course/${course.id}/preregistrations`}
                      key={i}
                      {...course}
                      term={termIdData.name}
                    />
                  );
                })
            )}
          </div>
          <Pagination count={count} page={page} setPage={setPage} />
          {isAddCourseVisible && (
            <AddCourse
              type={"preregistration"}
              termId={termId}
              open={isAddCourseVisible}
              closeHandle={closeHandle}
            />
          )}
          <TermDialogData
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            termData={termIdData}
          />
          <FilterMenu
            anchorEl={anchorEl}
            handleClose={handleClose}
            menuItems={[
              { text: "بیشترین تعداد ثبت نام", sortType: "mostRegister" },
              { text: "کمترین تعداد ثبت نام", sortType: "minimumRegister" },
            ]}
            settingSortType={settingSortType}
          />
        </div>
      )}
    </>
  );
};

export default ManagerPreregistrationCourses;
