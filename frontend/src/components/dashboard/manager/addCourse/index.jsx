/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import {
  AppBar,
  Autocomplete,
  Button,
  Container,
  Dialog,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import styles from "./index.module.css";
import { Close } from "@mui/icons-material";
import useProfessorsData from "../../../../hooks/useProfessors";
import { useDispatch, useSelector } from "react-redux";
import useCoursesData from "../../../../hooks/useCourses";
import Loader from "../../loader/loader";
import { updateCourseData } from "../../../../redux/course";
import { updateProfessorsData } from "../../../../redux/professors";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { toast } from "react-toastify";
import addCourse from "../../../../utils/dashboard/addCourse";
import { updatePreregistrationCoursesData } from "../../../../redux/preregistrationCourses";
import { updateRegistrationCoursesData } from "../../../../redux/registrationCourses";

const AddCourse = ({ open, closeHandle, type, termId }) => {
  const professorsData = useSelector((s) => s.professors);
  const coursesData = useSelector((s) => s.courses);
  const coursesDataState = useCoursesData();
  const { isLoading } = useProfessorsData();
  const courseData = useSelector((s) => s.course);
  const dispatch = useDispatch();

  const checkInputs = () => {
    if (courseData.course == null) {
      toast.error("اسم درس را وارد کنید", { position: "top-left" });
      return false;
    }
    if (courseData.professor == null) {
      toast.error("اسم استاد را وارد کنید", { position: "top-left" });
      return false;
    }
    if (courseData.capacity == null) {
      toast.error("ظرفیت درس را وارد کنید", { position: "top-left" });
      return false;
    } else if (isNaN(Number(courseData.capacity))) {
      toast.error("لطفا از عدد صحیح برای ظرفیت استفاده کنید", {
        position: "top-left",
      });
      return false;
    } else if (Number(courseData.capacity) < 0) {
      toast.error("لطفا از عدد بالای 0 برای ظرفیت استفاده کنید", {
        position: "top-left",
      });
      return false;
    }
    if (courseData.classTimes.length == 0) {
      toast.error("ساعات و روز کلاس را وارد کنید", { position: "top-left" });
      return false;
    }
    if (courseData.examDate == null) {
      console.log(courseData.examDate);
      toast.error("تاریخ امتحان را وارد کنید", { position: "top-left" });
      return false;
    }
    return true;
  };

  const addCourseProcess = async () => {
    if (!checkInputs()) return;
    const loadingToast = toast("لطفا صبر کنید ...", {
      autoClose: true,
      position: "top-left",
      theme: "light",
      isLoading: true,
    });
    const data = await addCourse(type, termId, courseData);
    if (data.error === true) {
      toast.update(loadingToast, {
        render:
          data.errorMessage ?? "یه مشکلی پیش اومده ، لطفا دوباره امتحان کنید",
        autoClose: true,
        position: "top-left",
        isLoading: false,
        type: "error",
      });
    } else {
      toast.update(loadingToast, {
        render: data.message ?? "ورود موفقیت آمیز ",
        type: "success",
        autoClose: true,
        position: "top-left",
        isLoading: false,
      });

      setTimeout(() => {
        toast.dismiss(loadingToast);
        closeHandle();
        dispatch(
          updatePreregistrationCoursesData({ isDataLoadedBefore: false })
        );
        dispatch(updateRegistrationCoursesData({ isDataLoadedBefore: false }));
      }, 1500);
    }
  };

  console.log(courseData);
  return (
    <Dialog dir="rtl" fullScreen open={open} onClose={closeHandle}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
              dispatch(updateCourseData({ isDataLoadedBefore: false }));
              dispatch(updateProfessorsData({ isDataLoadedBefore: false }));
              closeHandle();
            }}
            aria-label="close"
          >
            <Close />
          </IconButton>
          <Typography sx={{ mr: 2, flex: 1 }} variant="h6" component="div">
            اضافه کردن درس
          </Typography>
        </Toolbar>
      </AppBar>
      <br />
      {isLoading || coursesDataState.isLoading ? (
        <Loader />
      ) : (
        <>
          <Container className={styles.formHolder}>
            <Autocomplete
              fullWidth
              disablePortal
              // value={courseData}
              onChange={(e, newData) => {
                dispatch(updateCourseData({ course: newData }));
              }}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => `${option.name}`}
              options={coursesData.courses}
              renderInput={(params) => <TextField {...params} label="درس" />}
            />
            <Autocomplete
              fullWidth
              onChange={(e, newData) => {
                dispatch(updateCourseData({ professor: newData }));
              }}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => `${option.name} ${option.familyName}`}
              options={professorsData.professors}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="استاد"
                  InputProps={{
                    ...params.InputProps,
                  }}
                />
              )}
            />
          </Container>
          <br />
          <Container className={styles.formHolder}>
            <TextField
              onChange={(e) => {
                dispatch(updateCourseData({ capacity: e.currentTarget.value }));
              }}
              type="number"
              label="ظرفیت"
              fullWidth
            />
            <DatePicker
              value={courseData.classTimes}
              onChange={(e) => {
                dispatch(updateCourseData({ classTimes: e }));
              }}
              format="MM/DD/YYYY HH:mm:ss"
              plugins={[<TimePicker position="bottom" />]}
              locale={persian_fa}
              calendar={persian}
              multiple
              name="classTimes"
            />
          </Container>
          <Container>
            <DatePicker
              value={courseData.examDate}
              onChange={(e) => {
                dispatch(updateCourseData({ examDate: e }));
              }}
              format="MM/DD/YYYY HH:mm:ss"
              plugins={[<TimePicker position="bottom" />]}
              locale={persian_fa}
              calendar={persian}
              name="examDay"
            />
          </Container>
          <Container>
            <Button onClick={addCourseProcess} variant="contained">
              ثبت درس
            </Button>
          </Container>
        </>
      )}
    </Dialog>
  );
};

export default AddCourse;
