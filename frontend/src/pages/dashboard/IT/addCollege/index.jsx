import styles from "./index.module.css";
import Loader from "../../../../components/dashboard/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import useMajors from "../../../../hooks/useMajors";
import { resetCollegeData, updateCollegeData } from "../../../../redux/college";
import { toast } from "react-toastify";
import addCollege from "../../../../utils/dashboard/addCollege";

const ITAddCollege = () => {
  const dispatch = useDispatch();
  const majorsData = useSelector((s) => s.majors);
  const collegeData = useSelector((s) => s.college);
  const majorsDataState = useMajors();

  const checkInputs = () => {
    if (collegeData.name.trim() == "") {
      toast.error("اسم دانشکده را وارد کنید", { position: "top-left" });
      return false;
    }

    if (collegeData.majors.length == 0) {
      toast.error("رشته های داشنکده را وارد کنید", { position: "top-left" });
      return false;
    }

    return true;
  };

  const addCollegeProcess = async () => {
    if (!checkInputs()) return;
    const loadingToast = toast("لطفا صبر کنید ...", {
      autoClose: true,
      position: "top-left",
      theme: "light",
      isLoading: true,
    });

    const apiCallData = await addCollege(collegeData);
    if (apiCallData.error === true) {
      toast.update(loadingToast, {
        render:
          apiCallData.errorMessage ??
          "یه مشکلی پیش اومده ، لطفا دوباره امتحان کنید",
        autoClose: true,
        position: "top-left",
        isLoading: false,
        type: "error",
      });
    } else {
      toast.update(loadingToast, {
        render: apiCallData.message ?? "ورود موفقیت آمیز ",
        type: "success",
        autoClose: true,
        position: "top-left",
        isLoading: false,
      });

      setTimeout(() => {
        toast.dismiss(loadingToast);

        dispatch(resetCollegeData());
      }, 1500);
    }
  };

  return (
    <>
      {majorsDataState.isLoading ? (
        <Loader />
      ) : (
        <div dir="rtl" className={styles.con}>
          <div className={styles.head}>
            <Typography variant="h5">افزودن دانشکده</Typography>
          </div>

          <div className={styles.items}>
            <TextField
              value={collegeData.name}
              onChange={(e) => {
                dispatch(updateCollegeData({ name: e.currentTarget.value }));
              }}
              label="نام دانشکده"
            />
            <Autocomplete
              multiple
              value={collegeData.majors == "" ? [] : collegeData.majors}
              onChange={(e, newData) => {
                dispatch(updateCollegeData({ majors: newData }));
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
                  label=" رشته ها"
                  InputProps={{
                    ...params.InputProps,
                  }}
                />
              )}
            />
            <Button onClick={addCollegeProcess} variant="contained">
              ثبت دانشکده
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ITAddCollege;
