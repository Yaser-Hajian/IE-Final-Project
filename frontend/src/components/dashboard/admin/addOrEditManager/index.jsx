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
import useManagerData from "../../../../hooks/useManager";
import updateManager from "../../../../utils/dashboard/updateManager";
import addManager from "../../../../utils/dashboard/addManager";
import { updateManagersData } from "../../../../redux/managers";
import { resetManagerData, updateManagerData } from "../../../../redux/manager";
import RtlInput from "../../rtlInput";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const AddOrEditManager = ({ open, closeHandle, type, id }) => {
  const managerData = useSelector((s) => s.manager);
  const managerDataState = useManagerData(id, type);
  const collegesData = useSelector((s) => s.colleges);
  const collegesDataState = useCollegesData();
  const majorsData = useSelector((s) => s.majors);
  const dispatch = useDispatch();
  const checkInputs = () => {
    if (managerData.name == "") {
      toast.error("اسم مدیر را وارد کنید", { position: "top-left" });
      return false;
    }
    if (managerData.familyName == "") {
      toast.error("فامیل را وارد کنید", { position: "top-left" });
      return false;
    }
    if (managerData.nationId == "") {
      toast.error("کد ملی را وارد کنید", { position: "top-left" });
      return false;
    }
    if (managerData.managerId == "") {
      toast.error("شماره پرسنلی را وارد کنید", { position: "top-left" });
      return false;
    }
    if (managerData.college == "") {
      toast.error("دانشکده را وارد کنید", { position: "top-left" });
      return false;
    }

    if (managerData.major == "") {
      toast.error("رشته را وارد کنید", { position: "top-left" });
      return false;
    }
    if (managerData.entryYear == "") {
      toast.error("سال ورود را وارد کنید", { position: "top-left" });
      return false;
    }
    if (managerData.level == "") {
      toast.error("سطح را وارد کنید", { position: "top-left" });
      return false;
    }
    return true;
  };
  const addManagerProcess = () => {
    if (!checkInputs()) return;
    toast.promise(
      addManager(managerData).then(() => {
        closeHandle();
        dispatch(updateManagersData({ isDataLoadedBefore: false }));
        setTimeout(() => {
          dispatch(resetManagerData());
        }, 50);
      }),
      {
        pending: "لطفا منتظر بمانید",
        error: "مشکلی پیش آمده لطفا مجددا تلاش کنید",
        success: "با موفقیت استاد اضافه شد",
      }
    );
  };

  const updateManagerProcess = () => {
    if (!checkInputs()) return;
    toast.promise(
      updateManager(managerData).then(() => {
        closeHandle();
        dispatch(updateManagersData({ isDataLoadedBefore: false }));
        setTimeout(() => {
          dispatch(resetManagerData());
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
              dispatch(resetManagerData());
              closeHandle();
            }}
            aria-label="close"
          >
            <Close />
          </IconButton>
          <Typography sx={{ mr: 2, flex: 1 }} variant="h6" component="div">
            {type ? "تغییر اطلاعات مدیر " : "ثبت مدیر جدید"}
          </Typography>
        </Toolbar>
      </AppBar>
      <br />
      {collegesDataState.isLoading || managerDataState.isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.formHolder}>
            <Container className={styles.formHolderRight}>
              <RtlInput label="اسم مدیر">
                <TextField
                  fullWidth
                  placeholder="اسم مدیر را وارد کنید"
                  value={managerData.name}
                  onChange={(e) => {
                    dispatch(
                      updateManagerData({ name: e.currentTarget.value })
                    );
                  }}
                />
              </RtlInput>

              <RtlInput label="فامیل مدیر">
                <TextField
                  fullWidth
                  placeholder="فامیل مدیر را وارد کنید"
                  value={managerData.familyName}
                  onChange={(e) => {
                    dispatch(
                      updateManagerData({ familyName: e.currentTarget.value })
                    );
                  }}
                />
              </RtlInput>
              <RtlInput label="کد ملی">
                <TextField
                  fullWidth
                  placeholder="کد ملی مدیر را وارد کنید"
                  value={managerData.nationId}
                  onChange={(e) => {
                    dispatch(
                      updateManagerData({ nationId: e.currentTarget.value })
                    );
                  }}
                />
              </RtlInput>
              <RtlInput label={"کد کارمندی"}>
                <TextField
                  fullWidth
                  placeholder="کد کارمندی را وارد کنید"
                  value={managerData.managerId}
                  onChange={(e) => {
                    dispatch(
                      updateManagerData({ managerId: e.currentTarget.value })
                    );
                  }}
                />
              </RtlInput>
            </Container>
            <Container className={styles.formHolderLeft}>
              <RtlInput label="دانشکده">
                <Autocomplete
                  fullWidth
                  value={managerData.college == "" ? null : managerData.college}
                  onChange={(e, newData) => {
                    dispatch(
                      updateManagerData({
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
                  value={managerData.major == "" ? null : managerData.major}
                  onChange={(e, newData) => {
                    dispatch(updateManagerData({ major: newData }));
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
                    managerData.entryYear == null
                      ? new Date()
                      : new Date(managerData.entryYear)
                  }
                  onChange={(e) => {
                    dispatch(
                      updateManagerData({
                        entryYear: e.toJSON(),
                      })
                    );
                  }}
                />
              </RtlInput>
              <RtlInput label="سطح">
                <TextField
                  fullWidth
                  placeholder="سطح را وارد کنید"
                  value={managerData.level}
                  onChange={(e) => {
                    dispatch(
                      updateManagerData({ level: e.currentTarget.value })
                    );
                  }}
                />
              </RtlInput>
            </Container>
          </div>
          <Container className={styles.buttonCon}>
            <Button
              fullWidth
              onClick={type ? updateManagerProcess : addManagerProcess}
              variant="contained"
            >
              {type ? "ثبت تغییرات" : "ثبت مدیر"}
            </Button>
          </Container>
        </>
      )}
    </Dialog>
  );
};

export default AddOrEditManager;
