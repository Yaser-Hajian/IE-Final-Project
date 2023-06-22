/* eslint-disable react/prop-types */
import { Avatar, Button, Container, Paper, Typography } from "@mui/material";
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
import { updateCourseRegistrationsData } from "../../../redux/courseRegistrations";

const UserCard = ({
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

  const acceptingCourseSelection = () => {
    toast.promise(
      acceptCourseRegistration(id).then(() => {
        dispatch(updateCourseIdData({ isDataLoadedBefore: false }));
        dispatch(updateCourseRegistrationsData({ isDataLoadedBefore: false }));
      }),
      {
        error: "یه مشکلی هست لطفا دوباره امتحان کنید",
        pending: "لطفا منتظر بمانید",
        success: "با موفقیت با انتخاب رشته دانشجو موافقت شد",
      }
    );
  };
  const rejectingCourseSelection = () => {
    toast.promise(
      rejectCourseRegistration(id).then(() => {
        dispatch(updateCourseIdData({ isDataLoadedBefore: false }));
        dispatch(updateCourseRegistrationsData({ isDataLoadedBefore: false }));
      }),
      {
        error: "یه مشکلی هست لطفا دوباره امتحان کنید",
        pending: "لطفا منتظر بمانید",
        success: "با موفقیت با انتخاب رشته دانشجو مخالفت شد",
      }
    );
  };

  const removeStudentProcess = () => {
    toast.promise(
      deleteStudent(id).then(() => {
        dispatch(updateStudentsData({ isDataLoadedBefore: false }));
      }),
      {
        pending: "لطفا منتظر بمانید",
        error: "مشکلی به وجود آمده لطفا مجددا تلاش کنید",
        success: "با موفقیت دانشجو حذف شد",
      }
    );
  };

  const removeProfessorProcess = () => {
    toast.promise(
      deleteProfessor(id).then(() => {
        dispatch(updateProfessorsData({ isDataLoadedBefore: false }));
      }),
      {
        pending: "لطفا منتظر بمانید",
        error: "مشکلی به وجود آمده لطفا مجددا تلاش کنید",
        success: "با موفقیت استاد حذف شد",
      }
    );
  };

  const removeManagerProcess = () => {
    toast.promise(
      deleteManager(id).then(() => {
        dispatch(updateManagersData({ isDataLoadedBefore: false }));
      }),
      {
        pending: "لطفا منتظر بمانید",
        error: "مشکلی به وجود آمده لطفا مجددا تلاش کنید",
        success: "با موفقیت مدیر حذف شد",
      }
    );
  };

  const removeProcess = () => {
    if (userType === "student") {
      removeStudentProcess();
      return;
    }
    if (userType === "manager") {
      removeManagerProcess();
      return;
    }
    if (userType === "professor") {
      removeProfessorProcess();
      return;
    }
  };
  return (
    <Paper variant="outlined" className={styles.con}>
      <div className={styles.top}>
        <div>
          <Avatar />
          <Typography>
            {name} {familyName}
          </Typography>
        </div>
      </div>
      {!isPreregistrationCard && (
        <div className={styles.bottom}>
          <Button onClick={() => acceptingCourseSelection()} variant="outlined">
            تایید دانشجو
          </Button>
          <Button onClick={() => rejectingCourseSelection()} color="error">
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
          <Button color="error" onClick={removeProcess}>
            حذف
          </Button>
        </Container>
      )}
    </Paper>
  );
};

export default UserCard;
