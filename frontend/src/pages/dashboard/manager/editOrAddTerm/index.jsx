/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import styles from "./index.module.css";
import Loader from "../../../../components/dashboard/loader/loader";
import { useNavigate, useParams } from "react-router-dom";
import useEditOrAddData from "../../../../hooks/useAddOrEditData";
import { updateEditOrAddTermData } from "../../../../redux/editOrAddTerm";
import { useState } from "react";
import { Add, Delete } from "@mui/icons-material";
import useStudentsData from "../../../../hooks/useStudents";
import { toast } from "react-toastify";
import updateTerm from "../../../../utils/dashboard/updateTerm";
import addTerm from "../../../../utils/dashboard/addTerm";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import readExcel from "../../../../utils/readExcel";

const EditOrAddTerm = ({ type }) => {
  const editOrAddData = useSelector((s) => s.editOrAddTerm);
  const { termId } = useParams();
  const { name, startDate, endDate } = useSelector((s) => s.editOrAddTerm);
  const { students } = useSelector((s) => s.students);
  const getStudentsState = useStudentsData();
  const { isLoading } = useEditOrAddData(termId);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogType, setDialogType] = useState("students");
  const [isAddingPerson, setIsAddingPerson] = useState(false);
  const theme = useTheme();
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickOpen = (e, type, isAdd) => {
    setAnchorEl(e.currentTarget);
    setDialogType(type);
    if (isAdd) {
      setIsAddingPerson(true);
      return;
    }
    setIsAddingPerson(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleInputsChange = (e) => {
    const { name, value } = e.currentTarget;
    dispatch(updateEditOrAddTermData({ [name]: value }));
  };

  const datePickerChangeHandle = (e) => {
    dispatch(
      updateEditOrAddTermData({
        startDate: new Date(e[0]).getTime(),
        endDate: new Date(e[1]).getTime() ?? null,
      })
    );
  };

  const addPersonProcess = (dialogType, personId) => {
    const item = students.filter((i) => i.id == personId)[0];
    const newList = [...editOrAddData[dialogType]];
    newList.push(item);
    dispatch(updateEditOrAddTermData({ [dialogType]: newList }));
  };

  const removePersonProcess = (dialogType, personId) => {
    const newList = editOrAddData[dialogType].filter((p) => p.id !== personId);
    dispatch(updateEditOrAddTermData({ [dialogType]: newList }));
  };

  const checkInputs = () => {
    if (editOrAddData.name.trim() == "") {
      toast.error("اسم ترم را وارد کنید", { position: "top-left" });
      return false;
    }
    if (editOrAddData.startDate == null || editOrAddData.endDate == null) {
      toast.error("زمان شروع و پایان ترم را وارد کنید", {
        position: "top-left",
      });
      return false;
    }
    if (editOrAddData.students.length === 0) {
      toast.error("دانشجویان را وارد کنید", { position: "top-left" });
      return false;
    }
    if (editOrAddData.professors.length === 0) {
      toast.error("اساتید را وارد کنید", { position: "top-left" });
      return false;
    }
    return true;
  };

  const updateTermProcess = () => {
    if (!checkInputs()) return;
    toast.promise(
      updateTerm(termId, editOrAddData).then(() => {
        navigate("/dashboard/manager/terms");
      }),
      {
        error: "یه مشکلی پیش اومده لطفا دوباره تلاش کنید",
        success: "با موفقیت ترم آپدیت شد",
        pending: "لطفا منتظر بمانید",
      }
    );
  };

  const AddTermProcess = () => {
    if (!checkInputs()) return;
    toast.promise(
      addTerm(editOrAddData).then(() => {
        navigate("/dashboard/manager/terms");
      }),
      {
        error: "یه مشکلی پیش اومده لطفا دوباره تلاش کنید",
        success: "با موفقیت ترم اضافه شد",
        pending: "لطفا منتظر بمانید",
      }
    );
  };

  const excelAddHandle = async (e, type) => {
    const file = e.currentTarget.files[0];
    toast.promise(
      readExcel(file).then((res) => {
        const newData = [...res, ...editOrAddData[type]];
        dispatch(updateEditOrAddTermData({ [type]: newData }));
      }),
      {
        error: "یه مشکلی پیش اومده لطفا دوباره تلاش کن",
        pending: "لطفا منتظر بمانید",
        success: "با موفقیت فایل اکسل بارگذاری شد",
      }
    );
  };

  return (
    <div className={styles.con}>
      <Box borderBottom={1} dir="rtl" className={styles.head}>
        <Typography sx={{ m: 1 }} variant="h5">
          {type === "edit" ? "ویرایش ترم" : "افزودن ترم"}
        </Typography>
      </Box>
      {getStudentsState.isLoading || isLoading ? (
        <Loader />
      ) : (
        <div dir="rtl" className={styles.main}>
          <TextField
            dir="rtl"
            value={name}
            label={"نام ترم"}
            onChange={handleInputsChange}
            name="name"
          />
          <div className={styles.datePickerCon}>
            <Typography>تاریخ شروع و پایان ترم</Typography>
            <DatePicker
              dateSeparator=" تا "
              range
              rangeHover
              locale={persian_fa}
              calendar={persian}
              value={[new Date(startDate), new Date(endDate)]}
              onChange={datePickerChangeHandle}
              containerClassName={styles.datePickerCon}
              inputClass={
                theme.palette.mode == "dark"
                  ? styles.datePickerInputDark
                  : styles.datePickerInputLight
              }
            />
          </div>

          <div>
            <div
              onClick={(e) => handleClickOpen(e, "students")}
              className={styles.dialogOpener}
            >
              لیست دانشجویان
            </div>
            <div>
              <Button onClick={(e) => handleClickOpen(e, "students", "add")}>
                اضافه کردن دانشجو
              </Button>
              <Button className={styles.fileInputCon}>
                آپلود اکسل
                {
                  <input
                    accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    onChange={(e) => excelAddHandle(e, "students")}
                    className={styles.fileInput}
                    type="file"
                  />
                }
              </Button>
            </div>
          </div>

          <div>
            <div
              onClick={(e) => handleClickOpen(e, "professors")}
              className={styles.dialogOpener}
            >
              لیست اساتید
            </div>
            <div>
              <Button onClick={(e) => handleClickOpen(e, "professors", "add")}>
                اضافه کردن استاد
              </Button>
              <Button className={styles.fileInputCon}>
                آپلود اکسل
                {
                  <input
                    accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    onChange={(e) => excelAddHandle(e, "professors")}
                    className={styles.fileInput}
                    type="file"
                  />
                }
              </Button>
            </div>
          </div>
          <Button
            variant="contained"
            onClick={type == "edit" ? updateTermProcess : AddTermProcess}
          >
            {type == "edit" ? "ثبت تغییرات" : "ثبت ترم جدید"}
          </Button>
          <Dialog
            fullWidth
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            scroll={"paper"}
          >
            <DialogTitle className={styles.dialogTitle}>
              {dialogType == "students"
                ? "دانشجویان این ترم"
                : "اساتید این ترم"}
            </DialogTitle>
            <DialogContent dividers>
              <List>
                {(!isAddingPerson ? editOrAddData[dialogType] : students).map(
                  (d, i) => {
                    if (isAddingPerson) {
                      for (let item of editOrAddData[dialogType]) {
                        if (item.id === d.id) return;
                      }
                    }
                    return (
                      <ListItem
                        key={i}
                        className={styles.dialogListItems}
                        dir=""
                      >
                        <IconButton
                          onClick={() => {
                            !isAddingPerson
                              ? removePersonProcess(dialogType, d.id)
                              : addPersonProcess(dialogType, d.id);
                          }}
                        >
                          {!isAddingPerson ? <Delete /> : <Add />}
                        </IconButton>

                        <div className={styles.dialogListItemName}>
                          <Typography sx={{ ml: 7 }}>
                            {d.name} {d.familyName}
                          </Typography>
                          <Avatar sx={{ ml: 2 }} />
                        </div>
                      </ListItem>
                    );
                  }
                )}
              </List>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default EditOrAddTerm;
