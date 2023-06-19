/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import styles from "./index.module.css";
import Loader from "../../../../components/dashboard/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
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
import { toast } from "react-toastify";
import useCoursePreregistrations from "../../../../hooks/useCoursePreregistrations";
import useCourseData from "../../../../hooks/useCourseData";
import StudentCard from "../../../../components/dashboard/studentCard";
import { updateCoursePreregistrationsData } from "../../../../redux/coursePreregistrations";

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
  const { isLoading, isError } = useCoursePreregistrations(
    courseId,
    searchQuery,
    sortType
  );

  const open = Boolean(anchorEl);
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
        <div dir="rtl" className={styles.con}>
          <div className={styles.head}>
            <div>
              <Typography variant="h5">{courseData.name}</Typography>
              <Typography variant="caption">{courseData.professor}</Typography>
            </div>

            <Button onClick={() => setIsDialogOpen(true)}>اطلاعات درس</Button>
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
              <Typography>لیست پیش ثبت نامی های این درس</Typography>

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
            {coursePreregistrations.coursePreregistrations.length == 0 ? (
              <Empty />
            ) : (
              coursePreregistrations.coursePreregistrations.map((course, i) => {
                return (
                  <StudentCard
                    isPreregistrationCard
                    key={i}
                    {...course}
                    term={courseData.name}
                  />
                );
              })
            )}
          </div>
          <Dialog
            dir="ltr"
            open={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
          >
            <DialogTitle className={styles.dialogTitle}>
              {courseData.name}
            </DialogTitle>
            <List>
              <ListItem>
                <div className={styles.dialogItems}>
                  <Typography>{courseData.professor}</Typography>
                  <Typography>استاد</Typography>
                </div>
              </ListItem>
              <ListItem>
                <div className={styles.dialogItems}>
                  <Typography>{courseData.term}</Typography>
                  <Typography>ترم</Typography>
                </div>
              </ListItem>

              <ListItem>
                <div className={styles.dialogItems}>
                  <Typography>{courseData.capacity}</Typography>
                  <Typography>ظرفیت</Typography>
                </div>
              </ListItem>

              <ListItem>
                <div className={styles.dialogItems}>
                  <Typography>{courseData.occupiedCapacity}</Typography>
                  <Typography>تعداد ثبت نامی ها</Typography>
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

export default ManagerCoursePreregistrations;
