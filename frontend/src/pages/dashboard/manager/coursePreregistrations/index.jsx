import { useParams } from "react-router-dom";
import styles from "./index.module.css";
import Loader from "../../../../components/dashboard/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import * as XLSX from "xlsx";
import { Button, Typography } from "@mui/material";
import Empty from "../../../../components/dashboard/empty/empty";
import SearchBox from "../../../../components/dashboard/searchBox";
import { toast } from "react-toastify";
import useCoursePreregistrations from "../../../../hooks/useCoursePreregistrations";
import useCourseData from "../../../../hooks/useCourseData";
import StudentCard from "../../../../components/dashboard/studentCard";
import { updateCoursePreregistrationsData } from "../../../../redux/coursePreregistrations";
import FilterMenu from "../../../../components/dashboard/filterMenu";
import CourseHeadInfo from "../../../../components/dashboard/courseHeadInfo";
import CourseDialogData from "../../../../components/dashboard/courseDialogData";
import usePagination from "../../../../hooks/usePagination";
import Pagination from "../../../../components/dashboard/pagination";

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
    const loadingToast = toast("لطفا صبر کنید ...", {
      autoClose: true,
      position: "top-left",
      theme: "light",
      isLoading: true,
    });

    try {
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(
        coursePreregistrations.coursePreregistrations
      );
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      const excelFile = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "binary",
      });
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(
        new Blob([s2ab(excelFile)], { type: "application/octet-stream" })
      );
      downloadLink.download = "data.xlsx";
      downloadLink.click();
      toast.update(loadingToast, {
        render: "ورود موفقیت آمیز ",
        type: "success",
        autoClose: true,
        position: "top-left",
        isLoading: false,
      });

      setTimeout(() => {
        toast.dismiss(loadingToast);
      }, 1500);
    } catch (err) {
      toast.update(loadingToast, {
        render: "یه مشکلی پیش اومده ، لطفا دوباره امتحان کنید",
        autoClose: true,
        position: "top-left",
        isLoading: false,
        type: "error",
      });
    }
  };
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  }

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
            {coursePreregistrations.coursePreregistrations.length == 0 ? (
              <Empty />
            ) : (
              coursePreregistrations.coursePreregistrations
                .slice(sliceInit, sliceFinish)
                .map((course, i) => {
                  return (
                    <StudentCard
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
