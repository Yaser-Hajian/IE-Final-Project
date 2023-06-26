/* eslint-disable react/prop-types */
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useCollegesData from "../../../../hooks/useColleges";
import { updateMajorsData } from "../../../../redux/majors";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../../components/dashboard/loader/loader";
import RtlInput from "../../../../components/dashboard/rtlInput";
import useManagerData from "../../../../hooks/useManager";
import { resetManagerData, updateManagerData } from "../../../../redux/manager";
import { updateManagersData } from "../../../../redux/managers";
import updateManager from "../../../../utils/dashboard/updateManager";
import addManager from "../../../../utils/dashboard/addManager";

const AddOrEditManager = ({ type }) => {
  const { managerId } = useParams();
  const managerData = useSelector((s) => s.manager);
  const managerDataState = useManagerData(managerId, type == "edit");
  const collegesData = useSelector((s) => s.colleges);
  const collegesDataState = useCollegesData();
  const majorsData = useSelector((s) => s.majors);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkInputs = () => {
    if (managerData.name == "") {
      toast.error("اسم مدیر را وارد کنید");
      return false;
    }
    if (managerData.familyName == "") {
      toast.error("فامیل را وارد کنید");
      return false;
    }
    if (managerData.nationId == "") {
      toast.error("کد ملی را وارد کنید");
      return false;
    }
    if (managerData.managerId == "") {
      toast.error("شماره پرسنلی را وارد کنید");
      return false;
    }
    if (managerData.college == "") {
      toast.error("دانشکده را وارد کنید");
      return false;
    }

    if (managerData.major == "") {
      toast.error("رشته را وارد کنید");
      return false;
    }
    if (managerData.entryYear == "") {
      toast.error("سال ورود را وارد کنید");
      return false;
    }
    if (managerData.level == "") {
      toast.error("سطح را وارد کنید");
      return false;
    }
    return true;
  };
  const addManagerProcess = () => {
    if (!checkInputs()) return;
    toast.promise(
      addManager(managerData).then(() => {
        dispatch(updateManagersData({ isDataLoadedBefore: false }));
        dispatch(resetManagerData());
        navigate("/dashboard/admin/managers");
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
      updateManager(managerId, managerData).then(() => {
        dispatch(updateManagersData({ isDataLoadedBefore: false }));
        dispatch(resetManagerData());
        navigate("/dashboard/admin/managers");
      }),
      {
        pending: "لطفا منتظر بمانید",
        error: "مشکلی پیش آمده لطفا مجددا تلاش کنید",
        success: "با موفقیت اطلاعات استاد آپدیت شد",
      }
    );
  };
  return (
    <div className={styles.con}>
      <Box borderBottom={1} dir="rtl" className={styles.head}>
        <Typography sx={{ m: 1 }} variant="h5">
          {type === "edit" ? "ویرایش مدیر آموزش" : "افزودن مدیر آموزش"}
        </Typography>
      </Box>
      {collegesDataState.isLoading || managerDataState.isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.formHolder}>
            <RtlInput label="اسم مدیر">
              <TextField
                fullWidth
                placeholder="اسم مدیر را وارد کنید"
                value={managerData.name}
                onChange={(e) => {
                  dispatch(updateManagerData({ name: e.currentTarget.value }));
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
                isOptionEqualToValue={(option, value) => option.id === value.id}
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
                isOptionEqualToValue={(option, value) => option.id === value.id}
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
                  dispatch(updateManagerData({ level: e.currentTarget.value }));
                }}
              />
            </RtlInput>
            <Button
              sx={{ mt: 2 }}
              fullWidth
              onClick={
                type == "edit" ? updateManagerProcess : addManagerProcess
              }
              variant="contained"
            >
              {type == "edit" ? "ثبت تغییرات" : "ثبت دانشجو"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddOrEditManager;
