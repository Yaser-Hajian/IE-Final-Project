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
import styles from "./termCard.module.css";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import { MoreVert } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateTermsData } from "../../../redux/terms";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import deleteTerm from "../../../utils/dashboard/deleteTerm";

const TermCard = ({
  name,
  startDate,
  endDate,
  courseNum,
  studentNum,
  id,
  url,
  userType,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    const data = await deleteTerm(id);
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
        dispatch(updateTermsData({ isDataLoadedBefore: false }));
      }, 1500);
    }
  };

  return (
    <Paper className={styles.con} variant="outlined">
      <div className={styles.top}>
        <div className={styles.topText}>
          <Link href={url} variant="body1">
            {name}
          </Link>
          <Typography variant="caption" sx={{ lineHeight: "5px" }}>
            {endDate}-{startDate}
          </Typography>
        </div>
        {userType == "manager" && (
          <IconButton onClick={handleOpen}>
            <MoreVert />
          </IconButton>
        )}
      </div>

      <div className={styles.bottom}>
        <Typography variant="body2">
          {courseNum}درس
          <LibraryBooksOutlinedIcon />
        </Typography>

        <Typography variant="body2">
          {studentNum}دانشجو
          <PersonRoundedIcon />
        </Typography>
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
            navigate(`edit/${id}`);
          }}
        >
          ویرایش ترم
        </MenuItem>
        <MenuItem onClick={deleteTermProcess}>حذف ترم</MenuItem>
      </Menu>
    </Paper>
  );
};

export default TermCard;
