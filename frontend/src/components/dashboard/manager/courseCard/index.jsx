/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogTitle,
  Fade,
  IconButton,
  Link,
  List,
  ListItem,
  Menu,
  MenuItem,
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

const CourseCard = ({
  name,
  professor,
  capacity,
  term,
  occupiedCapacity,
  id,
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
  const deleteTermProcess = async () => {
    const loadingToast = toast("لطفا صبر کنید ...", {
      autoClose: true,
      position: "top-left",
      theme: "light",
      isLoading: true,
    });
    const data = await removePreregistrationCourse(termId, id);
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
      }, 1500);
    }
  };
  return (
    <div className={styles.con}>
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
        <MenuItem onClick={deleteTermProcess}>حذف درس</MenuItem>
      </Menu>

      <Dialog
        dir="ltr"
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      >
        <DialogTitle className={styles.dialogTitle}>{name}</DialogTitle>
        <List>
          <ListItem>
            <div className={styles.dialogItems}>
              <Typography>{professor}</Typography>
              <Typography>استاد</Typography>
            </div>
          </ListItem>
          <ListItem>
            <div className={styles.dialogItems}>
              <Typography>{capacity}</Typography>
              <Typography>ظرفیت</Typography>
            </div>
          </ListItem>

          <ListItem>
            <div className={styles.dialogItems}>
              <Typography>{occupiedCapacity}</Typography>
              <Typography>پر شده</Typography>
            </div>
          </ListItem>

          <ListItem>
            <div className={styles.dialogItems}>
              <Typography>{term}</Typography>
              <Typography>ترم</Typography>
            </div>
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
};

export default CourseCard;
