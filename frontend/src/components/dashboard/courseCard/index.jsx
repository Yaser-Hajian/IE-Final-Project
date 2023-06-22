/* eslint-disable react/prop-types */
import { Button, Link, Paper, Typography } from "@mui/material";
import styles from "./index.module.css";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { useState } from "react";
import preregisterCourse from "../../../utils/dashboard/preregisterCourse";
import cancelPreregisterCourse from "../../../utils/dashboard/cancelPreregisterCourse";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updatePreregistrationCoursesData } from "../../../redux/preregistrationCourses";
import { updateTermIdData } from "../../../redux/termId";
import cancelRegisterCourse from "../../../utils/dashboard/cancelRegisterCourse";
import registerCourse from "../../../utils/dashboard/registerCourse";
import { updateRegistrationCoursesData } from "../../../redux/registrationCourses";
import { updateRegistrationsData } from "../../../redux/registrations";
import { updatePreregistrationsData } from "../../../redux/preregistrations";
import { useNavigate } from "react-router-dom";
import CourseDialogData from "../courseDialogData";

const CourseCard = ({
  name,
  professor,
  capacity,
  term,
  occupiedCapacity,
  id,
  url = null,
  ispre = { is: false },
  isreg = { is: false },
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registrationProcess = async (type, isCancel) => {
    const loadingToast = toast("لطفا صبر کنید ...", {
      autoClose: true,
      position: "top-left",
      theme: "light",
      isLoading: true,
    });
    const data =
      type == "preregister"
        ? isCancel
          ? await cancelPreregisterCourse(id)
          : await preregisterCourse(id)
        : isCancel
        ? await cancelRegisterCourse(id)
        : await registerCourse(id);
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
        dispatch(
          updatePreregistrationCoursesData({ isDataLoadedBefore: false })
        );
        dispatch(updateRegistrationCoursesData({ isDataLoadedBefore: false }));
        dispatch(updatePreregistrationsData({ isDataLoadedBefore: false }));
        dispatch(updateRegistrationsData({ isDataLoadedBefore: false }));
        dispatch(updateTermIdData({ isDataLoadedBefore: false }));
      }, 1500);
    }
  };
  return (
    <Paper className={styles.con} variant="outlined">
      <div dir="rtl" className={styles.top}>
        <Link href={url}>
          <Typography variant="body1">{name}</Typography>
        </Link>
        {ispre.is || isreg.is ? (
          <Typography variant="caption">{professor}</Typography>
        ) : (
          <Typography variant="caption" sx={{ lineHeight: "5px" }}>
            {term}
          </Typography>
        )}
      </div>

      <div className={styles.bottom}>
        {ispre.is || isreg.is ? (
          ispre.is ? (
            <>
              <Button
                variant="outlined"
                color={ispre.preregistered ? "error" : "primary"}
                onClick={() => {
                  registrationProcess("preRegister", ispre.preregistered);
                }}
              >
                {ispre.preregistered ? "لغو پیش ثبت نام" : "پیش ثبت نام"}
              </Button>
              <Button onClick={() => setIsDialogOpen(true)}>
                اطلاعات کامل
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                color={isreg.registered ? "error" : "primary"}
                onClick={() => {
                  registrationProcess("register", isreg.registered);
                }}
              >
                {isreg.registered ? "لغو ثبت نام" : "ثبت نام"}
              </Button>
              <Button onClick={() => setIsDialogOpen(true)}>
                اطلاعات کامل
              </Button>
            </>
          )
        ) : (
          <>
            <Typography variant="body2">
              {professor}
              <PersonRoundedIcon />
            </Typography>

            <Typography variant="body2">
              {capacity} از {occupiedCapacity}
              <PeopleAltOutlinedIcon />
            </Typography>
          </>
        )}
      </div>
      <CourseDialogData
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        courseData={{ professor, capacity, occupiedCapacity, term, name }}
      />
    </Paper>
  );
};

export default CourseCard;
