/* eslint-disable no-unused-vars */
import { useNavigate, useParams } from "react-router-dom";
import styles from "./index.module.css";
import usePreregistrationCoursesData from "../../../../hooks/usePreregistrationCourses";
import Loader from "../../../../components/dashboard/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import useTermIdData from "../../../../hooks/useTermId";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import * as XLSX from "xlsx";
import {
  Button,
  Dialog,
  DialogTitle,
  Fade,
  List,
  ListItem,
  Menu,
  Typography,
  MenuItem,
} from "@mui/material";
import Empty from "../../../../components/dashboard/empty/empty";
import SearchBox from "../../../../components/dashboard/searchBox";
import { updatePreregistrationCoursesData } from "../../../../redux/preregistrationCourses";
import CourseCard from "../../../../components/dashboard/manager/courseCard";
import { toast } from "react-toastify";
import AddCourse from "../../../../components/dashboard/manager/addCourse";

const ManagerPreregistrationCourses = () => {
  const preregistrationCoursesData = useSelector(
    (s) => s.preregistrationCourses
  );
  const dispatch = useDispatch();
  const { termId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState(null);
  const termIdData = useSelector((s) => s.termId);
  const termIdState = useTermIdData(termId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAddCourseVisible, setIsAddCourseVisible] = useState(false);
  const { isLoading, isError } = usePreregistrationCoursesData(
    termId,
    searchQuery,
    sortType
  );
  const open = Boolean(anchorEl);
  const settingSortType = (type) => {
    if (type == null) return;
    setSortType(type);
    dispatch(
      updatePreregistrationCoursesData({
        isDataLoadedBefore: false,
      })
    );
  };

  const startSearch = () => {
    if (searchQuery.trim() == "") return;
    dispatch(
      updatePreregistrationCoursesData({
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
        preregistrationCoursesData.preregistrationCourses
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
        <div dir="rtl" className={styles.con}>
          <div className={styles.head}>
            <div>
              <Typography variant="h5">{termIdData.name}</Typography>
              <Typography variant="caption">
                {Intl.DateTimeFormat("fa-IR").format(termIdData.startDate)}-
                {Intl.DateTimeFormat("fa-IR").format(termIdData.endDate)}
              </Typography>
            </div>

            <Button onClick={() => setIsDialogOpen(true)}>اطلاعات ترم</Button>
          </div>
          <div dir="ltr" className={styles.top}>
            <div>
              <SearchBox
                onChange={changeSearchBox}
                startSearch={startSearch}
                value={searchQuery}
              />

              <Button onClick={downloadExcel} sx={{ mt: 2 }} variant="outlined">
                دانلود اکسل
              </Button>
            </div>
            <div dir="rtl">
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography>لیست دروس ارایه شده پیش ثبت نامی</Typography>
                <Button
                  onClick={() => {
                    setIsAddCourseVisible(true);
                    // navigate("addCourse");
                  }}
                >
                  افزودن درس
                </Button>
              </div>
              <Typography
                sx={{ display: "flex", alignItems: "center" }}
                onClick={handleClick}
                variant="caption"
              >
                فیلتر بر اساس
                <FilterAltIcon />
              </Typography>
            </div>
          </div>
          <div className={styles.items}>
            {preregistrationCoursesData.preregistrationCourses.length == 0 ? (
              <Empty />
            ) : (
              preregistrationCoursesData.preregistrationCourses.map(
                (course, i) => {
                  return (
                    <CourseCard
                      url={`/dashboard/manager/course/${course.id}/preregistrations`}
                      key={i}
                      {...course}
                      term={termIdData.name}
                    />
                  );
                }
              )
            )}
          </div>
          <AddCourse
            type={"preregistration"}
            termId={termId}
            open={isAddCourseVisible}
            closeHandle={closeHandle}
          />
          <Dialog
            dir="ltr"
            open={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
          >
            <DialogTitle className={styles.dialogTitle}>
              {termIdData.name}
            </DialogTitle>
            <List>
              <ListItem>
                <div className={styles.dialogItems}>
                  <Typography>
                    {Intl.DateTimeFormat("fa-IR").format(termIdData.startDate)}
                  </Typography>
                  <Typography>تاریخ شروع</Typography>
                </div>
              </ListItem>
              <ListItem>
                <div className={styles.dialogItems}>
                  <Typography>
                    {Intl.DateTimeFormat("fa-IR").format(termIdData.endDate)}
                  </Typography>
                  <Typography>تاریخ پایان</Typography>
                </div>
              </ListItem>

              <ListItem>
                <div className={styles.dialogItems}>
                  <Typography>{termIdData.courseNum}</Typography>
                  <Typography>تعداد دروس</Typography>
                </div>
              </ListItem>

              <ListItem>
                <div className={styles.dialogItems}>
                  <Typography>{termIdData.studentNum}</Typography>
                  <Typography>تعداد دانشجویان</Typography>
                </div>
              </ListItem>
            </List>
          </Dialog>

          <Menu
            dir="rtl"
            anchorEl={anchorEl}
            onClose={handleClose}
            onClick={handleClose}
            open={open}
            PaperProps={{
              elevation: 0,
              className: styles.menuPaper,
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={() => settingSortType("mostRegister")}>
              بیشترین تعداد ثبت نام
            </MenuItem>
            <MenuItem onClick={() => settingSortType("lowRegister")}>
              کمترین تعداد ثبت نام
            </MenuItem>
            <MenuItem onClick={() => settingSortType(null)}>هیچ کدام</MenuItem>
          </Menu>
        </div>
      )}
    </>
  );
};

export default ManagerPreregistrationCourses;
