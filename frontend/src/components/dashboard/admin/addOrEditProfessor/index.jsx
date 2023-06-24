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
import RtlInput from "../../rtlInput";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";

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

  const addProfessorProcess = () => {
    if (!checkInputs()) return;
    toast.promise(
      addProfessor(professorData).then(() => {
        closeHandle();
        dispatch(updateProfessorsData({ isDataLoadedBefore: false }));
        setTimeout(() => {
          dispatch(resetProfessorData());
        }, 50);
      }),
      {
        pending: "لطفا منتظر بمانید",
        error: "مشکلی پیش آمده لطفا مجددا تلاش کنید",
        success: "با موفقیت استاد اضافه شد",
      }
    );
  };

  const updateProfessorProcess = () => {
    if (!checkInputs()) return;
    toast.promise(
      updateProfessor(professorData).then(() => {
        closeHandle();
        dispatch(updateProfessorsData({ isDataLoadedBefore: false }));
        setTimeout(() => {
          dispatch(resetProfessorData());
        }, 50);
      }),
      {
        pending: "لطفا منتظر بمانید",
        error: "مشکلی پیش آمده لطفا مجددا تلاش کنید",
        success: "با موفقیت اطلاعات استاد آپدیت شد",
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
              <RtlInput label="اسم استاد">
                <TextField
                  fullWidth
                  placeholder="اسم استاد را وارد کنید"
                  value={professorData.name}
                  onChange={(e) => {
                    dispatch(
                      updateProfessorData({ name: e.currentTarget.value })
                    );
                  }}
                />
              </RtlInput>

              <RtlInput label="فامیل استاد">
                <TextField
                  fullWidth
                  placeholder="فامیل استاد را وارد کنید"
                  value={professorData.familyName}
                  onChange={(e) => {
                    dispatch(
                      updateProfessorData({ familyName: e.currentTarget.value })
                    );
                  }}
                />
              </RtlInput>
              <RtlInput label="کد ملی">
                <TextField
                  fullWidth
                  placeholder="کد ملی استاد را وارد کنید"
                  value={professorData.nationId}
                  onChange={(e) => {
                    dispatch(
                      updateProfessorData({ nationId: e.currentTarget.value })
                    );
                  }}
                />
              </RtlInput>
              <RtlInput label="شماره کارمندی">
                <TextField
                  fullWidth
                  placeholder="شماره کارمندی را وارد کنید"
                  value={professorData.professorId}
                  onChange={(e) => {
                    dispatch(
                      updateProfessorData({
                        professorId: e.currentTarget.value,
                      })
                    );
                  }}
                />
              </RtlInput>
            </Container>
            <Container className={styles.formHolderLeft}>
              <RtlInput label="دانشکده">
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
                    professorData.entryYear == null
                      ? new Date()
                      : new Date(professorData.entryYear)
                  }
                  onChange={(e) => {
                    dispatch(
                      updateProfessorData({
                        entryYear: e.toJSON(),
                      })
                    );
                  }}
                />
              </RtlInput>
              <RtlInput label="سطح">
                <TextField
                  fullWidth
                  placeholder="سطح استاد را وارد کنید"
                  value={professorData.level}
                  onChange={(e) => {
                    dispatch(
                      updateProfessorData({ level: e.currentTarget.value })
                    );
                  }}
                />
              </RtlInput>
            </Container>
          </div>
          <Container className={styles.buttonCon}>
            <Button
              fullWidth
              onClick={type ? updateProfessorProcess : addProfessorProcess}
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
