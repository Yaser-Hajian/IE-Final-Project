/* eslint-disable react/prop-types */
import { Avatar, Button, Container, Typography } from "@mui/material";
import styles from "./index.module.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateCourseIdData } from "../../../redux/courseId";
import acceptCourseRegistration from "../../../utils/dashboard/acceptCourseRegistration";
import rejectCourseRegistration from "../../../utils/dashboard/rejectCourseRegistration";
import deleteStudent from "../../../utils/dashboard/deleteStudent";
import { updateStudentsData } from "../../../redux/students";
import deleteProfessor from "../../../utils/dashboard/deleteProfessor";
import deleteManager from "../../../utils/dashboard/deleteManager";
import { updateProfessorsData } from "../../../redux/professors";
import { updateManagersData } from "../../../redux/managers";

const StudentCard = ({
  name,
  familyName,
  id,
  isPreregistrationCard = false,
  isItControlled = false,
  userType,
  editOrAdd,
  openDialog,
}) => {
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

  const removePerson = async () => {
    const loadingToast = toast("لطفا صبر کنید ...", {
      autoClose: true,
      position: "top-left",
      theme: "light",
      isLoading: true,
    });
    let data;
    if (userType == "student") {
      data = await deleteStudent(id);
    }
    if (userType == "professor") {
      data = await deleteProfessor(id);
    }
    if (userType == "manager") {
      data = await deleteManager(id);
    }
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
        dispatch(updateStudentsData({ isDataLoadedBefore: false }));
        dispatch(updateProfessorsData({ isDataLoadedBefore: false }));
        dispatch(updateManagersData({ isDataLoadedBefore: false }));
      }, 1500);
    }
  };

  return (
    <div className={styles.con}>
      <div className={styles.top}>
        <div>
          <Avatar />
          <Typography>
            {name} {familyName}
          </Typography>
        </div>
        <div></div>
      </div>
      {!isPreregistrationCard && (
        <div className={styles.bottom}>
          <Button onClick={() => acceptOrDisagree("accept")} variant="outlined">
            تایید دانشجو
          </Button>
          <Button onClick={() => acceptOrDisagree("Disagree")} color="error">
            رد دانشجو
          </Button>
        </div>
      )}
      {!isItControlled && (
        <Container sx={{ justifyContent: "space-between", display: "flex" }}>
          <Button
            onClick={() => {
              editOrAdd({ isEdit: true, id: id });
              openDialog(true);
            }}
          >
            ویرایش
          </Button>
          <Button color="error" onClick={removePerson}>
            حذف
          </Button>
        </Container>
      )}
    </div>
  );
};

export default StudentCard;
