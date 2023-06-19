/* eslint-disable react/prop-types */
import { Avatar, Button, Typography } from "@mui/material";
import styles from "./index.module.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateCourseIdData } from "../../../redux/courseId";
import acceptCourseRegistration from "../../../utils/dashboard/acceptCourseRegistration";
import rejectCourseRegistration from "../../../utils/dashboard/rejectCourseRegistration";

const StudentCard = ({ name, familyName, id }) => {
  const dispatch = useDispatch();
  const acceptOrDisagree = async (type) => {
    const loadingToast = toast("لطفا صبر کنید ...", {
      autoClose: true,
      position: "top-left",
      theme: "light",
      isLoading: true,
    });
    const data =
      type == "agree"
        ? await acceptCourseRegistration(id)
        : await rejectCourseRegistration(id);

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
        dispatch(updateCourseIdData({ isDataLoadedBefore: false }));
      }, 1500);
    }
  };

  return (
    <div className={styles.con}>
      <div className={styles.top}>
        <Avatar />
        <Typography>
          {name} {familyName}
        </Typography>
      </div>
      <div className={styles.bottom}>
        <Button onClick={() => acceptOrDisagree("accept")} variant="outlined">
          تایید دانشجو
        </Button>
        <Button onClick={() => acceptOrDisagree("Disagree")} color="error">
          رد دانشجو
        </Button>
      </div>
    </div>
  );
};

export default StudentCard;
