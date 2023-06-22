import { useParams } from "react-router-dom";
import styles from "./index.module.css";
import Loader from "../../../../components/dashboard/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import useTermIdData from "../../../../hooks/useTermId";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import * as XLSX from "xlsx";
import { Button, Typography } from "@mui/material";
import Empty from "../../../../components/dashboard/empty/empty";
import SearchBox from "../../../../components/dashboard/searchBox";
import CourseCard from "../../../../components/dashboard/manager/courseCard";
import { toast } from "react-toastify";
import { updateRegistrationCoursesData } from "../../../../redux/registrationCourses";
import useRegistrationCoursesData from "../../../../hooks/useRegistrationCourses";
import AddCourse from "../../../../components/dashboard/manager/addCourse";
import TermHeadInfo from "../../../../components/dashboard/termHeadInfo";
import TermDialogData from "../../../../components/dashboard/termDialogData";
import FilterMenu from "../../../../components/dashboard/filterMenu";
import { Add } from "@mui/icons-material";
import usePagination from "../../../../hooks/usePagination";
import Pagination from "../../../../components/dashboard/pagination";

const ManagerRegistrationCourses = () => {
  const registrationCoursesData = useSelector((s) => s.registrationCourses);
  const dispatch = useDispatch();
  const { termId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState(null);
  const termIdData = useSelector((s) => s.termId);
  const termIdState = useTermIdData(termId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAddCourseVisible, setIsAddCourseVisible] = useState(false);
  const { isLoading } = useRegistrationCoursesData(
    termId,
    searchQuery,
    sortType
  );
  const { count, page, setPage, sliceFinish, sliceInit } = usePagination(
    registrationCoursesData.registrationCourses.length,
    6
  );
  const settingSortType = (type) => {
    if (type == null) return;
    setSortType(type);
    dispatch(
      updateRegistrationCoursesData({
        isDataLoadedBefore: false,
      })
    );
  };

  const startSearch = () => {
    if (searchQuery.trim() == "") return;
    dispatch(
      updateRegistrationCoursesData({
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
        registrationCoursesData.registrationCourses
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
                <Typography>لیست دروس ارایه شده ثبت نامی</Typography>
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
              <SearchBox
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
            {registrationCoursesData.registrationCourses.length == 0 ? (
              <Empty />
            ) : (
              registrationCoursesData.registrationCourses
                .slice(sliceInit, sliceFinish)
                .map((course, i) => {
                  return (
                    <CourseCard
                      url={`/dashboard/manager/course/${course.id}/registrations`}
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
              type={"registration"}
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
              { text: "کمترین تعداد ثبت نام", sortType: "logRegister" },
            ]}
            settingSortType={settingSortType}
          />
        </div>
      )}
    </>
  );
};

export default ManagerRegistrationCourses;
