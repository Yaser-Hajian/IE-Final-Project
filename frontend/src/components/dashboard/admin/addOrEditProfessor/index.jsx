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
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../loader/loader";
import { toast } from "react-toastify";
import useCollegesData from "../../../../hooks/useColleges";
import { updateMajorsData } from "../../../../redux/majors";
import useProfessorData from "../../../../hooks/useProfessor";
import {
  resetProfessorData,
  updateProfessorData,
} from "../../../../redux/professor";
import updateProfessor from "../../../../utils/dashboard/updateProfessor";
import addProfessor from "../../../../utils/dashboard/addProfessor";
import { updateProfessorsData } from "../../../../redux/professors";

const AddOrEditProfessor = ({ open, closeHandle, type, id }) => {
  const professorData = useSelector((s) => s.professor);
  const professorDataState = useProfessorData(id, type);
  const collegesData = useSelector((s) => s.colleges);
  const collegesDataState = useCollegesData();
  const majorsData = useSelector((s) => s.majors);

  const dispatch = useDispatch();
  const checkInputs = () => {
    if (professorData.name == "") {
      toast.error("اسم استاد را وارد کنید", { position: "top-left" });
      return false;
    }
    if (professorData.familyName == "") {
      toast.error("فامیل را وارد کنید", { position: "top-left" });
      return false;
    }
    if (professorData.nationId == "") {
      toast.error("کد ملی را وارد کنید", { position: "top-left" });
      return false;
    }
    if (professorData.professorId == "") {
      toast.error("کد استادیی را وارد کنید", { position: "top-left" });
      return false;
    }
    if (professorData.college == "") {
      toast.error("دانشکده را وارد کنید", { position: "top-left" });
      return false;
    }

    if (professorData.major == "") {
      toast.error("رشته را وارد کنید", { position: "top-left" });
      return false;
    }
    if (professorData.entryYear == "") {
      toast.error("سال ورود را وارد کنید", { position: "top-left" });
      return false;
    }
    if (professorData.level == "") {
      toast.error("سطح را وارد کنید", { position: "top-left" });
      return false;
    }
    return true;
  };

  const addOrEditProfessorProcess = async () => {
    if (!checkInputs()) return;
    const loadingToast = toast("لطفا صبر کنید ...", {
      autoClose: true,
      position: "top-left",
      theme: "light",
      isLoading: true,
    });
    const data = type
      ? await updateProfessor(id, professorData)
      : await addProfessor(professorData);
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

      closeHandle();
      dispatch(updateProfessorsData({ isDataLoadedBefore: false }));
      toast.dismiss(loadingToast);
      setTimeout(() => {
        dispatch(resetProfessorData());
      }, 50);
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
              dispatch(resetProfessorData());
              closeHandle();
            }}
            aria-label="close"
          >
            <Close />
          </IconButton>
          <Typography sx={{ mr: 2, flex: 1 }} variant="h6" component="div">
            {type ? "تغییر اطلاعات استاد " : "ثبت استاد جدید"}
          </Typography>
        </Toolbar>
      </AppBar>
      <br />
      {collegesDataState.isLoading || professorDataState.isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.formHolder}>
            <Container className={styles.formHolderRight}>
              <TextField
                fullWidth
                label="اسم استاد"
                value={professorData.name}
                onChange={(e) => {
                  dispatch(
                    updateProfessorData({ name: e.currentTarget.value })
                  );
                }}
              />

              <TextField
                fullWidth
                label="فامیل استاد"
                value={professorData.familyName}
                onChange={(e) => {
                  dispatch(
                    updateProfessorData({ familyName: e.currentTarget.value })
                  );
                }}
              />

              <TextField
                fullWidth
                label="کد ملی"
                value={professorData.nationId}
                onChange={(e) => {
                  dispatch(
                    updateProfessorData({ nationId: e.currentTarget.value })
                  );
                }}
              />
              <TextField
                fullWidth
                label="شماره کارمندی"
                value={professorData.professorId}
                onChange={(e) => {
                  dispatch(
                    updateProfessorData({ professorId: e.currentTarget.value })
                  );
                }}
              />
            </Container>
            <Container className={styles.formHolderLeft}>
              <Autocomplete
                fullWidth
                value={
                  professorData.college == "" ? null : professorData.college
                }
                onChange={(e, newData) => {
                  dispatch(
                    updateProfessorData({
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
                value={professorData.major == "" ? null : professorData.major}
                onChange={(e, newData) => {
                  dispatch(updateProfessorData({ major: newData }));
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
                value={professorData.entryYear}
                onChange={(e) => {
                  dispatch(
                    updateProfessorData({ entryYear: e.currentTarget.value })
                  );
                }}
              />
              <TextField
                fullWidth
                label="سطح"
                value={professorData.level}
                onChange={(e) => {
                  dispatch(
                    updateProfessorData({ level: e.currentTarget.value })
                  );
                }}
              />
            </Container>
          </div>
          <Container className={styles.buttonCon}>
            <Button
              fullWidth
              onClick={addOrEditProfessorProcess}
              variant="contained"
            >
              {type ? "ثبت تغییرات" : "ثبت استاد"}
            </Button>
          </Container>
        </>
      )}
    </Dialog>
  );
};

export default AddOrEditProfessor;
