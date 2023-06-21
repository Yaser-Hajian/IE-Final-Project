/* eslint-disable react/prop-types */
import {
  Avatar,
  Divider,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import styles from "./header.module.css";
import { useState } from "react";
import signout from "../../../utils/dashboard/signout";
import getLoginToken from "../../../utils/getLoginToken";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import userNavigation from "../../../utils/userNavigation";
import { useDispatch, useSelector } from "react-redux";
import { switchTheme } from "../../../redux";

const DashboardHeader = ({ userType }) => {
  const loggedStudent = useSelector((s) => s.loggedUser);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signoutProcess = async () => {
    const token = getLoginToken();
    const loadingToast = toast("لطفا صبر کنید ...", {
      autoClose: true,
      position: "top-left",
      theme: "light",
      isLoading: true,
    });
    const data = await signout(token);
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
        render: data.message ?? "با موفقیت از داشبورد خارج شدی ",
        type: "success",
        autoClose: true,
        position: "top-left",
        isLoading: false,
      });

      localStorage.removeItem("token");
      setTimeout(() => {
        toast.dismiss(loadingToast);
        navigation("/login", { replace: true });
      }, 1500);
    }
  };

  const changeTheme = () => {
    dispatch(switchTheme());
  };

  return (
    <>
      <div className={styles.con}>
        <Typography variant="h6">دانشگاه شریف</Typography>
        <div className={styles.right}>
          <div className={styles.name}>
            <Typography>
              {loggedStudent.name} {loggedStudent.familyName}
            </Typography>
            <Typography variant="caption">
              {userNavigation[userType].position ?? "Unknown"}
            </Typography>
          </div>
          <IconButton onClick={handleClick}>
            <Avatar />
          </IconButton>
        </div>
      </div>
      <Menu
        dir="rtl"
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        open={open}
        PaperProps={{
          elevation: 0,
          className: styles.menuPaper,
        }}
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
          onClick={() =>
            navigation(`/dashboard/${userType}`, { replace: true })
          }
        >
          داشبورد
        </MenuItem>
        {userNavigation[userType].menuItems.map((item, i) => {
          return (
            <MenuItem
              key={i}
              onClick={() => {
                navigation(item.url, { replace: true });
              }}
            >
              {item.name}
            </MenuItem>
          );
        })}

        <Divider />
        <MenuItem onClick={changeTheme}>تغییر تم</MenuItem>
        <Divider />
        <MenuItem onClick={signoutProcess}>خروج از اکانت</MenuItem>
      </Menu>
    </>
  );
};

export default DashboardHeader;
