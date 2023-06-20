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

const AddOrEditStudent = ({ open, closeHandle, type, studentId }) => {
  const studentData = useSelector((s) => s.student);
  const studentDataState = useStudentData(studentId, type);
  const collegesData = useSelector((s) => s.colleges);
  const collegesDataState = useCollegesData();
  const coursesData = useSelector((s) => s.courses);
  const coursesDataState = useCoursesData();
  const majorsData = useSelector((s) => s.majors);

  const professorsData = useSelector((s) => s.professors);
  const professorsDataState = useProfessorsData();
  const dispatch = useDispatch();

  const checkInputs = () => {
    console.log(studentData);
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

  const addOrEditStudentProcess = async () => {
    if (!checkInputs()) return;
    const loadingToast = toast("لطفا صبر کنید ...", {
      autoClose: true,
      position: "top-left",
      theme: "light",
      isLoading: true,
    });
    const data = type
      ? await updateStudent(studentId, studentData)
      : await addStudent(studentData);
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
        dispatch(updateStudentsData({ isDataLoadedBefore: false }));
      }, 1500);
    }
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
            اضافه کردن دانشجو
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
                value={studentData.college}
                onChange={(e, newData) => {
                  dispatch(
                    updateStudentData({
                      college: newData == null ? { name: "" } : newData,
                    })
                  );

                  dispatch(
                    updateMajorsData({
                      majors: newData == null ? [] : newData.majors,
                    })
                  );
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
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
                onChange={(e, newData) => {
                  dispatch(updateStudentData({ major: newData }));
                }}
                placeholder="رشته ها"
                isOptionEqualToValue={(option, value) => option.id === value.id}
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
              onClick={addOrEditStudentProcess}
              variant="contained"
            >
              ثبت درس
            </Button>
          </Container>
        </>
      )}

      {/* <List>
        <ListItem button>
          <ListItemText primary="Phone ringtone" secondary="Titania" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText
            primary="Default notification ringtone"
            secondary="Tethys"
          />
        </ListItem>
      </List> */}
    </Dialog>
    // <Dialog fullScreen onClose={closeHandle} open={open} className={styles.con}>
    //   <DialogTitle>افزودن درس</DialogTitle>
    //   <DialogContent>
    //     <TextField label="نام درس" />
    //   </DialogContent>
    // </Dialog>
  );
};

export default AddOrEditStudent;
