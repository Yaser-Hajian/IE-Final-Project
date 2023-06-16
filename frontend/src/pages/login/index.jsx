import styles from "./index.module.css";
import uni from "../../assets/university_front.jpeg";
import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import login from "../../utils/login/login";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [isLoadApiData, SetIsLoadApiData] = useState(false);
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    username: {
      value: "",
      error: false,
      message: "برای ورود از نام کاربری / ایمیل / شماره دانشجویی استفاده کنید",
    },
    password: { value: "", error: false, message: "" },
  });

  const handleFormChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormData((s) => ({
      ...s,
      [name]: { ...s[name], value, error: false, message: "" },
    }));
  };

  const checkInputs = () => {
    let isEmpty = false;
    Object.keys(formData).forEach((key) => {
      if (formData[key].value.trim().length === 0) {
        isEmpty = true;
        setFormData((s) => ({
          ...s,
          [key]: {
            ...s[key],
            error: true,
            message: "این فیلد نمیتواند خالی باشد.",
          },
        }));
      }
    });
    return isEmpty;
  };

  const processLogin = async () => {
    if (checkInputs()) {
      return;
    }
    const loadingToast = toast("لطفا صبر کنید ...", {
      autoClose: true,
      position: "top-left",
      theme: "light",
      isLoading: true,
    });
    SetIsLoadApiData(true);
    console.log(formData);
    const data = await login(formData.username.value, formData.password.value);
    toast.dismiss(loadingToast);
    if (data.error === true) {
      toast.error(
        data.errorMessage ?? "یه مشکلی پیش اومده ، لطفا دوباره امتحان کنید",
        { autoClose: true, position: "top-left" }
      );
      SetIsLoadApiData(false);
    } else {
      toast.success(data.message ?? "ورود موفقیت آمیز ", {
        autoClose: true,
        position: "top-left",
      });
      localStorage.setItem("token", JSON.stringify(data.data));
      setTimeout(() => {
        toast.dismiss();
        navigation("/dashboard", { replace: true });
      }, 1500);
    }
  };

  return (
    <div className={styles.con}>
      <div className={styles.formCon}>
        <Typography className={styles.formHeader} variant="h3">
          دانشگاه شریف
        </Typography>
        <Typography variant="h6">ورود به داشبورد</Typography>

        <TextField
          value={formData.username.value}
          error={formData.username.error}
          helperText={formData.username.message}
          fullWidth
          onChange={handleFormChange}
          variant="outlined"
          name="username"
          label="نام کاربری"
        />

        <TextField
          value={formData.password.value}
          helperText={formData.password.message}
          error={formData.password.error}
          fullWidth
          name="password"
          onChange={handleFormChange}
          variant="outlined"
          label="رمز عبور"
          type="password"
        />

        <Button
          disabled={isLoadApiData}
          onClick={processLogin}
          fullWidth
          disableElevation
          className={styles.submitButton}
          variant="contained"
        >
          ورود به اکانت
        </Button>
      </div>
      <div className={styles.imageCon}>
        <img src={uni} alt="university" />
      </div>
    </div>
  );
};

export default LoginPage;