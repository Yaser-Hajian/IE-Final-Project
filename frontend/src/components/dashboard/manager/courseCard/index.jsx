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
import removePreregistrationCourse from "../../../../utils/dashboard/removePreregistrationCourse";
import CourseDialogData from "../../courseDialogData";
import { updateRegistrationCoursesData } from "../../../../redux/registrationCourses";

const CourseCard = ({
  name,
  professor,
  capacity,
  term,
  occupiedCapacity,
  id,
  courseId,
  url = null,
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
  const deleteCourseProcess = async () => {
    toast.promise(
      removePreregistrationCourse(termId, id).then(() => {
        dispatch(
          updatePreregistrationCoursesData({ isDataLoadedBefore: false })
        );
        dispatch(updateRegistrationCoursesData({ isDataLoadedBefore: false }));
      }),
      {
        pending: "لطفا منتظر بمانید",
        error: "مشکلی پیش آمده لطفا مجددا تلاش کنید",
        success: "با موفقیت درس مورد نظر حذف شد",
      }
    );
  };
  return (
    <Paper className={styles.con} variant="outlined">
      <div className={styles.top}>
        <div className={styles.topText}>
          <Link href={url}>
            <Typography variant="body1">
              {name} ({courseId})
            </Typography>
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
            {capacity} از {occupiedCapacity}
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
        <MenuItem onClick={deleteCourseProcess}>حذف درس</MenuItem>
      </Menu>

      <CourseDialogData
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        courseData={{ professor, name, capacity, occupiedCapacity, term }}
      />
    </Paper>
  );
};

export default CourseCard;
