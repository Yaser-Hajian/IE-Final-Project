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
import { toast } from "react-toastify";
import useStudentData from "../../../../hooks/useStudent";
import { resetStudentData, updateStudentData } from "../../../../redux/student";
import useCollegesData from "../../../../hooks/useColleges";
import { updateMajorsData } from "../../../../redux/majors";
import updateStudent from "../../../../utils/dashboard/updateStudent";
import addStudent from "../../../../utils/dashboard/addStudent";
import { updateStudentsData } from "../../../../redux/students";

const AddOrEditStudent = ({ open, closeHandle, type, id }) => {
  const studentData = useSelector((s) => s.student);
  const studentDataState = useStudentData(id, type);
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
      toast.error("اسم دانشجو را وارد کنید", { position: "top-left" });
      return false;
    }
    if (studentData.familyName == "") {
      toast.error("فامیل را وارد کنید", { position: "top-left" });
      return false;
    }
    if (studentData.nationId == "") {
      toast.error("کد ملی را وارد کنید", { position: "top-left" });
      return false;
    }
    if (studentData.studentId == "") {
      toast.error("کد دانشجویی را وارد کنید", { position: "top-left" });
      return false;
    }
    if (studentData.college == "") {
      toast.error("دانشکده را وارد کنید", { position: "top-left" });
      return false;
    }

    if (studentData.major == "") {
      toast.error("رشته را وارد کنید", { position: "top-left" });
      return false;
    }
    if (studentData.entryYear == "") {
      toast.error("سال ورود را وارد کنید", { position: "top-left" });
      return false;
    }
    if (studentData.professor == "") {
      toast.error("استاد راهنما را وارد کنید", { position: "top-left" });
      return false;
    }
    return true;
  };

  const addStudentProcess = () => {
    if (!checkInputs()) return;
    toast.promise(
      addStudent(studentData).then(() => {
        closeHandle();
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
        closeHandle();
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
    <Dialog dir="rtl" fullScreen open={open} onClose={closeHandle}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
              dispatch(resetStudentData());
              closeHandle();
            }}
            aria-label="close"
          >
            <Close />
          </IconButton>
          <Typography sx={{ mr: 2, flex: 1 }} variant="h6" component="div">
            {type ? "تغییر اطلاعات دانشجو " : "ثبت دانشجو جدید"}
          </Typography>
        </Toolbar>
      </AppBar>
      <br />
      {collegesDataState.isLoading ||
      professorsDataState.isLoading ||
      coursesDataState.isLoading ||
      studentDataState.isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.formHolder}>
            <Container className={styles.formHolderRight}>
              <TextField
                fullWidth
                label="اسم دانشجو"
                value={studentData.name}
                onChange={(e) => {
                  dispatch(updateStudentData({ name: e.currentTarget.value }));
                }}
              />

              <TextField
                fullWidth
                label="فامیل دانشجو"
                value={studentData.familyName}
                onChange={(e) => {
                  dispatch(
                    updateStudentData({ familyName: e.currentTarget.value })
                  );
                }}
              />

              <TextField
                fullWidth
                label="کد ملی"
                value={studentData.nationId}
                onChange={(e) => {
                  dispatch(
                    updateStudentData({ nationId: e.currentTarget.value })
                  );
                }}
              />
              <TextField
                fullWidth
                label="شماره دانشجویی"
                value={studentData.studentId}
                onChange={(e) => {
                  dispatch(
                    updateStudentData({ studentId: e.currentTarget.value })
                  );
                }}
              />
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
                  <TextField {...params} label="دروس پاس کرده" />
                )}
              />
            </Container>
            <Container className={styles.formHolderLeft}>
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
                    label="دانشکده"
                    InputProps={{
                      ...params.InputProps,
                    }}
                  />
                )}
              />
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
                    label="رشته"
                    InputProps={{
                      ...params.InputProps,
                    }}
                  />
                )}
              />
              <TextField
                fullWidth
                label="سال ورود"
                value={studentData.entryYear}
                onChange={(e) => {
                  dispatch(
                    updateStudentData({ entryYear: e.currentTarget.value })
                  );
                }}
              />

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
                    label="استاد"
                    InputProps={{
                      ...params.InputProps,
                    }}
                  />
                )}
              />
            </Container>
          </div>
          <Container className={styles.buttonCon}>
            <Button
              fullWidth
              onClick={type ? updateStudentProcess : addStudentProcess}
              variant="contained"
            >
              {type ? "ثبت تغییرات" : "ثبت دانشجو"}
            </Button>
          </Container>
        </>
      )}
    </Dialog>
  );
};

export default AddOrEditStudent;
