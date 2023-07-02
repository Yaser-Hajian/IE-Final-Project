/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Divider,
  Fade,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import styles from "./header.module.css";
import { useState } from "react";
import signout from "../../../utils/dashboard/signout";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import userNavigation from "../../../utils/userNavigation";
import { useDispatch, useSelector } from "react-redux";
import useThemeSwitch from "../../../hooks/useThemeSwitch";
import ThemeSwitch from "../themeSwitch";
import { resetMeDate } from "../../../redux/me";

const DashboardHeader = ({ userType }) => {
  const loggedStudent = useSelector((s) => s.me);
  const navigation = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const switchTheme = useThemeSwitch();
  const theme = useTheme().palette.mode;
  const dispatch = useDispatch();
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const signoutProcess = async () => {
    toast.promise(
      signout().then(() => {
        dispatch(resetMeDate());
        navigation(0);
        localStorage.removeItem("token");
      }),
      {
        pending: "لطفا صبر کنید",
        error: "یه مشکلی پیش اومده لطفا دوباره تلاش کنید",
        success: "با موفقیت از داشبورد خارج شدید",
      }
    );
  };

  const changeTheme = () => {
    switchTheme();
  };

  return (
    <>
      <Paper dir="rtl" className={styles.con} variant="outlined">
        <div className={styles.logo}>
          <Typography variant="h6">دانشگاه بهشتی</Typography>
          <FormControlLabel
            control={
              <ThemeSwitch
                className={styles.themeSwitch}
                sx={{ m: 1 }}
                checked={theme == "dark"}
                onChange={changeTheme}
              />
            }
          />
        </div>
        <Box className={styles.right}>
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
        </Box>
      </Paper>
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
        <MenuItem onClick={() => navigation(`/dashboard/${userType}`)}>
          داشبورد
        </MenuItem>
        {userNavigation[userType].menuItems.map((navItem, i) => {
          return (
            <MenuItem
              key={i}
              onClick={() => {
                navigation(navItem.url);
              }}
            >
              {navItem.name}
            </MenuItem>
          );
        })}

        <Divider />
        <MenuItem onClick={signoutProcess}>خروج از اکانت</MenuItem>
      </Menu>
    </>
  );
};

export default DashboardHeader;
