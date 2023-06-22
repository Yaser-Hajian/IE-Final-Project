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
    toast.promise(
      addCollege(collegeData).then(() => dispatch(resetCollegeData())),
      {
        error: "یه مشکلی پیش اومده لطفا مجددا تلاش کنید",
        pending: "لطفا منتظر بمانید",
        success: "با موفقیت دانشکده به دیتابیس اضافه شد",
      }
    );
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
