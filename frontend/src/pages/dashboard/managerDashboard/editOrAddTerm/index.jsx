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
import {
  resetEditOrAddTermData,
  updateEditOrAddTermData,
} from "../../../../redux/editOrAddTerm";
import { useEffect, useState } from "react";
import { Add, Close, Delete } from "@mui/icons-material";
import useStudentsData from "../../../../hooks/useStudents";
import { toast } from "react-toastify";
import updateTerm from "../../../../utils/dashboard/updateTerm";
import addTerm from "../../../../utils/dashboard/addTerm";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import readExcel from "../../../../utils/readExcel";
import RtlInput from "../../../../components/dashboard/rtlInput";
import useProfessorsData from "../../../../hooks/useProfessors";

const EditOrAddTerm = ({ type }) => {
  const editOrAddData = useSelector((s) => s.editOrAddTerm);
  const { termId } = useParams();
  const { name, startDate, endDate } = useSelector((s) => s.editOrAddTerm);
  const { students } = useSelector((s) => s.students);
  const getStudentsState = useStudentsData();
  const getProfessorsState = useProfessorsData();
  const { professors } = useSelector((s) => s.professors);
  const { isLoading } = useEditOrAddData(termId);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogType, setDialogType] = useState("students");
  const [isAddingPerson, setIsAddingPerson] = useState(false);
  const theme = useTheme().palette.mode;
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (type == "add") {
      dispatch(resetEditOrAddTermData());
    }
  }, [dispatch, type]);

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

  const addPersonProcess = (dialogType, personId) => {
    const item = (dialogType == "students" ? students : professors).filter(
      (i) => i.id == personId
    )[0];
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
      {getStudentsState.isLoading ||
      isLoading ||
      getProfessorsState.isLoading ? (
        <Loader />
      ) : (
        <div dir="rtl" className={styles.main}>
          <RtlInput label="نام ترم">
            <TextField
              dir="rtl"
              value={name}
              onChange={(e) => {
                dispatch(
                  updateEditOrAddTermData({ name: e.currentTarget.value })
                );
              }}
            />
          </RtlInput>

          <RtlInput label={"تاریخ شروع ترم"}>
            <DatePicker
              render={<TextField type="reset" fullWidth />}
              locale={persian_fa}
              calendar={persian}
              value={startDate == null ? new Date() : new Date(startDate)}
              onChange={(e) => {
                dispatch(
                  updateEditOrAddTermData({
                    startDate: e.toJSON() ?? new Date().getTime(),
                  })
                );
              }}
              containerClassName={styles.datePickerCon}
              inputClass={`${styles.datePickerInput} ${
                theme == "dark"
                  ? styles.datePickerInputDark
                  : styles.datePickerInputLight
              }`}
            />
          </RtlInput>

          <RtlInput label={"تاریخ پایان ترم"}>
            <DatePicker
              render={<TextField type="reset" fullWidth />}
              locale={persian_fa}
              calendar={persian}
              value={endDate == null ? new Date() : new Date(endDate)}
              onChange={(e) => {
                dispatch(
                  updateEditOrAddTermData({
                    endDate: e.toJSON(),
                  })
                );
              }}
              containerClassName={styles.datePickerCon}
              inputClass={`${styles.datePickerInput} ${
                theme == "dark"
                  ? styles.datePickerInputDark
                  : styles.datePickerInputLight
              }`}
            />
          </RtlInput>

          <div>
            <RtlInput label={"لیست دانشجویان"}>
              <TextField
                fullWidth
                onClick={(e) => handleClickOpen(e, "students")}
                value={`${editOrAddData.students.length} دانشجو`}
              />
            </RtlInput>

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
            <RtlInput label={"لیست اساتید"}>
              <TextField
                onClick={(e) => handleClickOpen(e, "professors")}
                value={`${editOrAddData.professors.length} استاد`}
              />
            </RtlInput>

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
            fullWidth
            variant="contained"
            onClick={type == "edit" ? updateTermProcess : AddTermProcess}
          >
            {type == "edit" ? "ثبت تغییرات" : "ثبت ترم جدید"}
          </Button>
          <Dialog
            dir="ltr"
            fullWidth
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            scroll={"paper"}
          >
            <DialogTitle className={styles.dialogTitle}>
              <IconButton onClick={handleClose}>
                <Close />
              </IconButton>
              {dialogType == "students"
                ? "دانشجویان این ترم"
                : "اساتید این ترم"}
            </DialogTitle>
            <DialogContent dividers>
              <List>
                {(!isAddingPerson
                  ? editOrAddData[dialogType]
                  : dialogType == "students"
                  ? students
                  : professors
                ).map((d, i) => {
                  console.log(d.id);
                  if (isAddingPerson) {
                    for (let item of editOrAddData[dialogType]) {
                      if (item.id === d.id) return;
                    }
                  }
                  return (
                    <ListItem key={i} className={styles.dialogListItems} dir="">
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
                })}
              </List>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default EditOrAddTerm;
