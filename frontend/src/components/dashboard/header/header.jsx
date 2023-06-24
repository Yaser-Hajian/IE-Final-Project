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
import getLoginToken from "../../../utils/getLoginToken";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import userNavigation from "../../../utils/userNavigation";
import { useSelector } from "react-redux";
import useThemeSwitch from "../../../hooks/useThemeSwitch";
import ThemeSwitch from "../themeSwitch";

const DashboardHeader = ({ userType }) => {
  const loggedStudent = useSelector((s) => s.loggedUser);
  const navigation = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const switchTheme = useThemeSwitch();
  const theme = useTheme().palette.mode;
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const signoutProcess = async () => {
    const token = getLoginToken();
    const loadingToast = toast("لطفا صبر کنید ...", {
      isLoading: true,
    });
    const data = await signout(token);
    if (data.error === true) {
      toast.update(loadingToast, {
        render: data.message ?? "یه مشکلی پیش اومده ، لطفا دوباره امتحان کنید",
        isLoading: false,
        type: "error",
      });
    } else {
      toast.update(loadingToast, {
        render: data.message ?? "با موفقیت از داشبورد خارج شدی ",
        type: "success",
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
    switchTheme();
  };

  return (
    <>
      <Paper className={styles.con} variant="outlined">
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
        <MenuItem
          onClick={() =>
            navigation(`/dashboard/${userType}`, { replace: true })
          }
        >
          داشبورد
        </MenuItem>
        {userNavigation[userType].menuItems.map((navItem, i) => {
          return (
            <MenuItem
              key={i}
              onClick={() => {
                navigation(navItem.url, { replace: true });
              }}
            >
              {navItem.name}
            </MenuItem>
          );
        })}

        <Divider />
        {/* <MenuItem onClick={changeTheme}>تغییر تم</MenuItem>
        <Divider /> */}
        <MenuItem onClick={signoutProcess}>خروج از اکانت</MenuItem>
      </Menu>
    </>
  );
};

export default DashboardHeader;
