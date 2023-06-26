/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import {
  AppBar,
  Autocomplete,
  Button,
  Chip,
  Container,
  Dialog,
  IconButton,
  MenuItem,
  Select,
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
import { resetCourseData, updateCourseData } from "../../../../redux/course";
import { updateProfessorsData } from "../../../../redux/professors";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { toast } from "react-toastify";
import addCourse from "../../../../utils/dashboard/addCourse";
import { updatePreregistrationCoursesData } from "../../../../redux/preregistrationCourses";
import { updateRegistrationCoursesData } from "../../../../redux/registrationCourses";
import RtlInput from "../../rtlInput";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { TimePicker as TimePick } from "@mui/x-date-pickers/TimePicker";
import { useState } from "react";
import dayjs from "dayjs";
import getDayName from "../../../../utils/getDayName";
import formatTime from "../../../../utils/formatTime";
import { v4 as uuid } from "uuid";

const AddCourse = ({ open, closeHandle, type, termId }) => {
  const professorsData = useSelector((s) => s.professors);
  const coursesData = useSelector((s) => s.courses);
  const coursesDataState = useCoursesData();
  const { isLoading } = useProfessorsData();
  const courseData = useSelector((s) => s.course);
  const [classTime, setClassTime] = useState({
    time: new Date().toISOString(),
    day: 0,
  });
  const dispatch = useDispatch();

  const removeClassTime = (time) => {
    const newClassTimes = courseData.classTimes.filter((c) => {
      return c.id !== time.id;
    });
    dispatch(updateCourseData({ classTimes: newClassTimes }));
  };

  const checkInputs = () => {
    if (courseData.course == null) {
      toast.error("اسم درس را وارد کنید");
      return false;
    }
    if (courseData.professor == null) {
      toast.error("اسم استاد را وارد کنید");
      return false;
    }
    if (courseData.capacity == null) {
      toast.error("ظرفیت درس را وارد کنید");
      return false;
    } else if (isNaN(Number(courseData.capacity))) {
      toast.error("لطفا از عدد صحیح برای ظرفیت استفاده کنید");
      return false;
    } else if (Number(courseData.capacity) < 0) {
      toast.error("لطفا از عدد بالای 0 برای ظرفیت استفاده کنید");
      return false;
    }
    if (courseData.classTimes.length == 0) {
      toast.error("ساعات و روز کلاس را وارد کنید");
      return false;
    }
    if (courseData.examDate == null) {
      toast.error("تاریخ امتحان را وارد کنید");
      return false;
    }
    return true;
  };

  const addCourseProcess = async () => {
    if (!checkInputs()) return;
    toast.promise(
      addCourse(type, termId, courseData).then(() => {
        closeHandle();
        dispatch(resetCourseData());
        dispatch(
          updatePreregistrationCoursesData({ isDataLoadedBefore: false })
        );
        dispatch(updateRegistrationCoursesData({ isDataLoadedBefore: false }));
      }),
      {
        pending: "لطفا منتظر بمانید",
        error: "مشکلی پیش آمده لطفا مجددا تلاش کنید",
        success: "با موفقیت درس مورد نظر اضافه شد",
      }
    );
  };

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
              dispatch(resetCourseData());
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
            <RtlInput label={"درس"}>
              <Autocomplete
                fullWidth
                disablePortal
                onChange={(e, newData) => {
                  dispatch(updateCourseData({ course: newData }));
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => `${option.name}`}
                options={coursesData.courses}
                renderInput={(params) => <TextField {...params} />}
              />
            </RtlInput>

            <RtlInput label="استاد">
              <Autocomplete
                fullWidth
                onChange={(e, newData) => {
                  dispatch(updateCourseData({ professor: newData }));
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) =>
                  `${option.name} ${option.familyName}`
                }
                options={professorsData.professors}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputProps={{
                      ...params.InputProps,
                    }}
                  />
                )}
              />
            </RtlInput>
          </Container>
          <br />
          <Container className={styles.formHolder}>
            <RtlInput label="ظرفیت">
              <TextField
                onChange={(e) => {
                  dispatch(
                    updateCourseData({ capacity: e.currentTarget.value })
                  );
                }}
                type="number"
                fullWidth
              />
            </RtlInput>
            <RtlInput label={"تاریخ کلاس ها"}>
              <div className={styles.chooseClassTimesCon}>
                <div className={styles.chooseClassTimesSelect}>
                  <Select
                    onChange={(e) => {
                      setClassTime((s) => ({ ...s, day: e.target.value }));
                    }}
                    value={classTime.day}
                    fullWidth
                    sx={{ ml: 1 }}
                  >
                    <MenuItem value={0}>شنبه</MenuItem>
                    <MenuItem value={1}>یک شنبه</MenuItem>
                    <MenuItem value={2}>دوشنبه</MenuItem>
                    <MenuItem value={3}>سه شنبه</MenuItem>
                    <MenuItem value={4}>چهار شنبه</MenuItem>
                    <MenuItem value={5}>پنج شنبه</MenuItem>
                    <MenuItem value={6}>جمعه</MenuItem>
                  </Select>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["TimePicker"]}>
                      <TimePick
                        onChange={(e) => {
                          setClassTime((s) => ({
                            ...s,
                            time: dayjs(e).toISOString(),
                          }));
                        }}
                        value={dayjs(classTime.time)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <Button
                  sx={{ mt: 1, mb: 1 }}
                  onClick={() => {
                    dispatch(
                      updateCourseData({
                        classTimes: [
                          ...courseData.classTimes,
                          {
                            ...classTime,
                            time: new Date(classTime.time).getTime(),
                            id: uuid(),
                          },
                        ],
                      })
                    );
                  }}
                >
                  اضافه کردن تایم
                </Button>
                <div>
                  {courseData.classTimes.length != 0 &&
                    courseData.classTimes.map((times, i) => {
                      return (
                        <Chip
                          onDelete={() => {
                            removeClassTime(times);
                          }}
                          sx={{ mb: 1, ml: 1 }}
                          key={i}
                          label={`${getDayName(times.day)} ${formatTime(
                            times.time
                          )}`}
                        />
                      );
                    })}
                </div>
              </div>
            </RtlInput>
          </Container>
          <Container className={styles.formHolder}>
            <RtlInput label="تاریخ امتحان">
              <DatePicker
                render={<TextField fullWidth />}
                value={new Date(courseData.examDate)}
                onChange={(e) => {
                  dispatch(updateCourseData({ examDate: e.toJSON() }));
                }}
                format=" HH:mm YYYY/MM/DD"
                plugins={[<TimePicker position="bottom" />]}
                locale={persian_fa}
                calendar={persian}
                name="examDay"
              />
            </RtlInput>
          </Container>

          <Container sx={{ mt: 2 }}>
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
