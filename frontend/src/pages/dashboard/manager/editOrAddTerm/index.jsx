/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Input,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import styles from "./index.module.css";
import Loader from "../../../../components/dashboard/loader/loader";
import { useNavigate, useParams } from "react-router-dom";
import useEditOrAddData from "../../../../hooks/useAddOrEditData";
import { updateEditOrAddTermData } from "../../../../redux/editOrAddTerm";
import { DatePicker } from "zaman";
import { useState } from "react";
import { Add, Delete } from "@mui/icons-material";
import useStudentsData from "../../../../hooks/useStudents";
import { toast } from "react-toastify";
import updateTerm from "../../../../utils/dashboard/updateTerm";
import addTerm from "../../../../utils/dashboard/addTerm";
import * as XLSX from "xlsx";

const EditOrAddTerm = ({ type }) => {
  const editOrAddData = useSelector((s) => s.editOrAddTerm);
  const { termId } = useParams();
  const dispatch = useDispatch();
  const { name, startDate, endDate } = useSelector((s) => s.editOrAddTerm);
  const navigate = useNavigate();
  const { students } = useSelector((s) => s.students);
  const getStudentsState = useStudentsData();
  const { isLoading, isError } = useEditOrAddData(termId);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogType, setDialogType] = useState("students");
  const [isAddingPerson, setIsAddingPerson] = useState(false);
  const open = Boolean(anchorEl);
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
        startDate: e.from.getTime(),
        endDate: e.to.getTime(),
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

  const addOrEditTermProcess = async () => {
    if (!checkInputs()) return;
    const loadingToast = toast("لطفا صبر کنید ...", {
      autoClose: true,
      position: "top-left",
      theme: "light",
      isLoading: true,
    });
    const data =
      type == "edit"
        ? await updateTerm(termId, editOrAddData)
        : await addTerm(editOrAddData);
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
        navigate("/dashboard/manager/terms");
      }, 1500);
    }
  };

  const excelAddHandle = (e, type) => {
    const file = e.currentTarget.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      console.log(excelData);
      const newList = [...editOrAddData[type]];
      for (let row in excelData) {
        if (row != 0 && excelData[row].length != 0) {
          const newPerson = {};
          for (let item in row) {
            newPerson[excelData[0][item]] = excelData[row][item];
          }
          newList.push(newPerson);
        }
      }
      dispatch(updateEditOrAddTermData({ [type]: newList }));
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className={styles.con}>
      <div dir="rtl" className={styles.head}>
        <Typography sx={{ m: 1 }} variant="h5">
          {type === "edit" ? "ویرایش ترم" : "افزودن ترم"}
        </Typography>
        <Divider />
      </div>
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
          <div className={styles.datepickerCon}>
            <Typography>زمان شروع و پایان ترم</Typography>
            <DatePicker
              defaultValue={new Date()}
              className={styles.datepicker}
              range
              from={startDate}
              to={endDate}
              onChange={datePickerChangeHandle}
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
          <Button variant="contained" onClick={addOrEditTermProcess}>
            {type == "edit" ? "ثبت تغییرات" : "ثبت ترم جدید"}
          </Button>
          <Dialog
            dir=""
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            scroll={"paper"}
          >
            <DialogTitle>
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