/* eslint-disable react/prop-types */
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./index.module.css";
import useProfessorsData from "../../../../hooks/useProfessors";
import { useDispatch, useSelector } from "react-redux";
import useCoursesData from "../../../../hooks/useCourses";
import { toast } from "react-toastify";
import useStudentData from "../../../../hooks/useStudent";
import { resetStudentData, updateStudentData } from "../../../../redux/student";
import useCollegesData from "../../../../hooks/useColleges";
import { updateMajorsData } from "../../../../redux/majors";
import updateStudent from "../../../../utils/dashboard/updateStudent";
import addStudent from "../../../../utils/dashboard/addStudent";
import { updateStudentsData } from "../../../../redux/students";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useParams } from "react-router-dom";
import Loader from "../../../../components/dashboard/loader/loader";
import RtlInput from "../../../../components/dashboard/rtlInput";

const AddOrEditStudent = ({ type }) => {
  const { studentId } = useParams();
  const studentData = useSelector((s) => s.student);
  const studentDataState = useStudentData(studentId, type == "edit");
  const collegesData = useSelector((s) => s.colleges);
  const collegesDataState = useCollegesData();
  const coursesData = useSelector((s) => s.courses);
  const coursesDataState = useCoursesData();
  const majorsData = useSelector((s) => s.majors);
  const professorsData = useSelector((s) => s.professors);
  const professorsDataState = useProfessorsData();
  const dispatch = useDispatch();
  const checkInputs = () => {
    if (studentData.name == "") {
      toast.error("اسم دانشجو را وارد کنید");
      return false;
    }
    if (studentData.familyName == "") {
      toast.error("فامیل را وارد کنید");
      return false;
    }
    if (studentData.nationId == "") {
      toast.error("کد ملی را وارد کنید");
      return false;
    }
    if (studentData.studentId == "") {
      toast.error("کد دانشجویی را وارد کنید");
      return false;
    }
    if (studentData.college == "") {
      toast.error("دانشکده را وارد کنید");
      return false;
    }

    if (studentData.major == "") {
      toast.error("رشته را وارد کنید");
      return false;
    }
    if (studentData.entryYear == "") {
      toast.error("سال ورود را وارد کنید");
      return false;
    }
    if (studentData.professor == "") {
      toast.error("استاد راهنما را وارد کنید");
      return false;
    }
    return true;
  };

  const addStudentProcess = () => {
    if (!checkInputs()) return;
    toast.promise(
      addStudent(studentData).then(() => {
        dispatch(updateStudentsData({ isDataLoadedBefore: false }));
        setTimeout(() => {
          dispatch(resetStudentData());
        }, 50);
      }),
      {
        pending: "لطفا منتظر بمانید",
        error: "مشکلی پیش آمده لطفا مجددا تلاش کنید",
        success: "با موفقیت دانشجو اضافه شد",
      }
    );
  };

  const updateStudentProcess = () => {
    if (!checkInputs()) return;
    toast.promise(
      updateStudent(studentData).then(() => {
        dispatch(updateStudentsData({ isDataLoadedBefore: false }));
        setTimeout(() => {
          dispatch(resetStudentData());
        }, 50);
      }),
      {
        pending: "لطفا منتظر بمانید",
        error: "مشکلی پیش آمده لطفا مجددا تلاش کنید",
        success: "با موفقیت اطلاعات دانشجو آپدیت شد",
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
      {collegesDataState.isLoading ||
      professorsDataState.isLoading ||
      coursesDataState.isLoading ||
      studentDataState.isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.formHolder}>
            <RtlInput label="اسم دانشجو">
              <TextField
                fullWidth
                placeholder="اسم دانشجو را وارد کنید"
                value={studentData.name}
                onChange={(e) => {
                  dispatch(updateStudentData({ name: e.currentTarget.value }));
                }}
              />
            </RtlInput>

            <RtlInput label="فامیل دانشجو">
              <TextField
                placeholder="فامیل دانشجو را وارد کنید"
                fullWidth
                value={studentData.familyName}
                onChange={(e) => {
                  dispatch(
                    updateStudentData({ familyName: e.currentTarget.value })
                  );
                }}
              />
            </RtlInput>

            <RtlInput label="کد ملی">
              <TextField
                fullWidth
                placeholder="کد ملی دانشجو را وارد کنید"
                value={studentData.nationId}
                onChange={(e) => {
                  dispatch(
                    updateStudentData({ nationId: e.currentTarget.value })
                  );
                }}
              />
            </RtlInput>
            <RtlInput label="شماره دانشجویی">
              <TextField
                fullWidth
                placeholder="شماره دانشجویی را وارد کنید"
                value={studentData.studentId}
                onChange={(e) => {
                  dispatch(
                    updateStudentData({ studentId: e.currentTarget.value })
                  );
                }}
              />
            </RtlInput>
            <RtlInput label="دروس پاس کرده">
              <Autocomplete
                fullWidth
                disablePortal
                value={studentData.passedCourses}
                onChange={(e, newData) => {
                  dispatch(updateStudentData({ passedCourses: newData }));
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => `${option.name}`}
                options={coursesData.courses}
                multiple
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="دروس پاس کرده را انتخاب کنید"
                  />
                )}
              />
            </RtlInput>
            <RtlInput label="دانشکده">
              <Autocomplete
                fullWidth
                value={studentData.college == "" ? null : studentData.college}
                onChange={(e, newData) => {
                  dispatch(
                    updateStudentData({
                      college: newData == null ? { name: "" } : newData,
                      major: null,
                    })
                  );

                  dispatch(
                    updateMajorsData({
                      majors: newData == null ? [] : newData.majors,
                    })
                  );
                }}
                isOptionEqualToValue={(option, value) =>
                  option.collegeId === value.collegeId
                }
                getOptionLabel={(option) => `${option.name}`}
                options={collegesData.colleges}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="دانشکده را انتخاب کنید"
                    InputProps={{
                      ...params.InputProps,
                    }}
                  />
                )}
              />
            </RtlInput>
            <RtlInput label="رشته">
              <Autocomplete
                fullWidth
                value={studentData.major == "" ? null : studentData.major}
                onChange={(e, newData) => {
                  dispatch(updateStudentData({ major: newData }));
                }}
                placeholder="رشته ها"
                isOptionEqualToValue={(option, value) =>
                  option.majorId === value.majorId
                }
                getOptionLabel={(option) => `${option.name}`}
                options={majorsData.majors}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="رشته را انتخاب کنید"
                    InputProps={{
                      ...params.InputProps,
                    }}
                  />
                )}
              />
            </RtlInput>
            <RtlInput label={"سال ورودی"}>
              <DatePicker
                onlyYearPicker
                format="YYYY"
                render={
                  <TextField fullWidth placeholder="سال ورودی را وارد کنید" />
                }
                locale={persian_fa}
                calendar={persian}
                value={
                  studentData.entryYear == null
                    ? new Date()
                    : new Date(studentData.entryYear)
                }
                onChange={(e) => {
                  dispatch(
                    updateStudentData({
                      entryYear: e.toJSON(),
                    })
                  );
                }}
              />
            </RtlInput>

            <RtlInput label="استاد">
              <Autocomplete
                fullWidth
                value={
                  studentData.professor == "" ? null : studentData.professor
                }
                onChange={(e, newData) => {
                  dispatch(updateStudentData({ professor: newData }));
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) =>
                  `${option.name} ${option.familyName}`
                }
                options={professorsData.professors}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="استاد را انتخاب کنید"
                    InputProps={{
                      ...params.InputProps,
                    }}
                  />
                )}
              />
            </RtlInput>
            <Button
              sx={{ mt: 2 }}
              fullWidth
              onClick={type ? updateStudentProcess : addStudentProcess}
              variant="contained"
            >
              {type ? "ثبت تغییرات" : "ثبت دانشجو"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddOrEditStudent;
