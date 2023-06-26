/* eslint-disable react/prop-types */
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./index.module.css";
import useProfessorsData from "../../../../hooks/useProfessors";
import { useDispatch, useSelector } from "react-redux";
import useCoursesData from "../../../../hooks/useCourses";
import { resetCourseData, updateCourseData } from "../../../../redux/course";

import { toast } from "react-toastify";
import addCourse from "../../../../utils/dashboard/addCourse";
import { updatePreregistrationCoursesData } from "../../../../redux/preregistrationCourses";
import { updateRegistrationCoursesData } from "../../../../redux/registrationCourses";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { TimePicker as TimePick } from "@mui/x-date-pickers/TimePicker";
import { useState } from "react";
import dayjs from "dayjs";
import getDayName from "../../../../utils/getDayName";
import formatTime from "../../../../utils/formatTime";
import { v4 as uuid } from "uuid";
import { useParams } from "react-router-dom";
import Loader from "../../../../components/dashboard/loader/loader";
import RtlInput from "../../../../components/dashboard/rtlInput";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const AddCourse = ({ type }) => {
  const { termId } = useParams();
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
        dispatch(resetCourseData());
        dispatch(
          updatePreregistrationCoursesData({ isDataLoadedBefore: false })
        );
        dispatch(updateRegistrationCoursesData({ isDataLoadedBefore: false }));
        history.go(-1);
      }),
      {
        pending: "لطفا منتظر بمانید",
        error: "مشکلی پیش آمده لطفا مجددا تلاش کنید",
        success: "با موفقیت درس مورد نظر اضافه شد",
      }
    );
  };

  return (
    <div className={styles.con}>
      <Box borderBottom={1} dir="rtl" className={styles.head}>
        <Typography sx={{ m: 1 }} variant="h5">
          {type === "edit" ? "ویرایش دانشجو" : "افزودن دانشجو"}
        </Typography>
      </Box>
      {isLoading || coursesDataState.isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.formHolder}>
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
            <RtlInput label="تاریخ امتحان">
              <DatePicker
                render={<TextField fullWidth />}
                value={new Date(courseData.examDate)}
                onChange={(e) => {
                  dispatch(updateCourseData({ examDate: e.toJSON() }));
                }}
                format=" HH:mm YYYY/MM/DD"
                plugins={[<TimePicker key={1} position="bottom" />]}
                locale={persian_fa}
                calendar={persian}
                name="examDay"
              />
            </RtlInput>
            <Button
              sx={{ mt: 2 }}
              onClick={addCourseProcess}
              variant="contained"
            >
              ثبت درس
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddCourse;
