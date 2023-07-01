/* eslint-disable react/prop-types */
import {
  Fade,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import styles from "./index.module.css";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { MoreVert } from "@mui/icons-material";
import { toast } from "react-toastify";
import { updatePreregistrationCoursesData } from "../../../../redux/preregistrationCourses";
import { useDispatch } from "react-redux";
import removeRegistrationCourse from "../../../../utils/dashboard/removeRegistrationCourse";
import CourseDialogData from "../../courseDialogData";
import { updateRegistrationCoursesData } from "../../../../redux/registrationCourses";
import removePreregistrationCourse from "../../../../utils/dashboard/removePreregistrationCourse copy";

const CourseCard = ({
  name,
  professor,
  capacity,
  term,
  occupiedCapacity,
  id,
  classTimes,
  examTime,
  url = null,
  isPreregistration,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const { termId } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const deletePreregistrationCourseProcess = async () => {
    toast.promise(
      removePreregistrationCourse(termId, id).then(() => {
        dispatch(
          updatePreregistrationCoursesData({ isDataLoadedBefore: false })
        );
      }),
      {
        pending: "لطفا منتظر بمانید",
        error: "مشکلی پیش آمده لطفا مجددا تلاش کنید",
        success: "با موفقیت درس پیش ثبت نامی مورد نظر حذف شد",
      }
    );
  };
  const deleteRegistrationCourseProcess = async () => {
    toast.promise(
      removeRegistrationCourse(termId, id).then(() => {
        dispatch(updateRegistrationCoursesData({ isDataLoadedBefore: false }));
      }),
      {
        pending: "لطفا منتظر بمانید",
        error: "مشکلی پیش آمده لطفا مجددا تلاش کنید",
        success: "با موفقیت درس ثبت نامی مورد نظر حذف شد",
      }
    );
  };
  return (
    <Paper className={styles.con} variant="outlined">
      <div className={styles.top}>
        <div className={styles.topText}>
          <Link href={url}>
            <Typography variant="body1">{name}</Typography>
          </Link>
          <Typography variant="caption">{professor}</Typography>
        </div>
        <IconButton onClick={handleOpen}>
          <MoreVert />
        </IconButton>
      </div>

      <div className={styles.bottom}>
        <>
          <Typography variant="body2">
            {professor}
            <PersonRoundedIcon />
          </Typography>

          <Typography variant="body2">
            {occupiedCapacity} از {capacity}
            <PeopleAltOutlinedIcon />
          </Typography>
        </>
      </div>

      <Menu
        dir="rtl"
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        open={open}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        TransitionComponent={Fade}
      >
        <MenuItem
          onClick={() => {
            setIsDialogOpen(true);
          }}
        >
          اطلاعات کامل
        </MenuItem>
        <MenuItem
          onClick={
            isPreregistration
              ? deletePreregistrationCourseProcess
              : deleteRegistrationCourseProcess
          }
        >
          حذف درس
        </MenuItem>
      </Menu>

      <CourseDialogData
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        courseData={{
          professor,
          name,
          capacity,
          occupiedCapacity,
          term,
          classTimes,
          examTime,
        }}
      />
    </Paper>
  );
};

export default CourseCard;
