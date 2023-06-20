/* eslint-disable no-unused-vars */
import styles from "./index.module.css";
import Loader from "../../../../components/dashboard/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import * as XLSX from "xlsx";
import { Button, Typography } from "@mui/material";
import Empty from "../../../../components/dashboard/empty/empty";
import SearchBox from "../../../../components/dashboard/searchBox";
import { toast } from "react-toastify";
import StudentCard from "../../../../components/dashboard/studentCard";
import useStudentsData from "../../../../hooks/useStudents";
import { updateStudentsData } from "../../../../redux/students";
import addStudents from "../../../../utils/dashboard/addStudents";
import AddOrEdit from "../../../../components/dashboard/IT/addStudent";

const ITStudents = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const studentsData = useSelector((s) => s.students);
  const { isLoading, isError } = useStudentsData(searchQuery);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const closeHandle = () => {
    setOpen(false);
  };

  const startSearch = () => {
    if (searchQuery.trim() == "") return;
    dispatch(
      updateStudentsData({
        isDataLoadedBefore: false,
      })
    );
  };

  const changeSearchBox = (e) => {
    setSearchQuery(e.currentTarget.value);
  };

  const uploadExcel = async (e) => {
    const loadingToast = toast("لطفا صبر کنید ...", {
      autoClose: true,
      position: "top-left",
      theme: "light",
      isLoading: true,
    });

    const file = e.currentTarget.files[0];
    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const newList = [];
      for (let row in excelData) {
        if (row != 0 && excelData[row].length != 0) {
          const newPerson = {};
          for (let item in excelData[row]) {
            newPerson[excelData[0][item]] = excelData[row][item];
          }
          newList.push(newPerson);
        }
      }
      const apiCallData = await addStudents(newList);
      if (apiCallData.error === true) {
        toast.update(loadingToast, {
          render:
            apiCallData.errorMessage ??
            "یه مشکلی پیش اومده ، لطفا دوباره امتحان کنید",
          autoClose: true,
          position: "top-left",
          isLoading: false,
          type: "error",
        });
      } else {
        toast.update(loadingToast, {
          render: apiCallData.message ?? "ورود موفقیت آمیز ",
          type: "success",
          autoClose: true,
          position: "top-left",
          isLoading: false,
        });

        setTimeout(() => {
          toast.dismiss(loadingToast);
          dispatch(updateStudentsData({ isDataLoadedBefore: false }));
        }, 1500);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div dir="rtl" className={styles.con}>
          <div className={styles.head}>
            <Typography variant="h5">لیست دانشجویان</Typography>
            <Button
              onClick={() => {
                setOpen(true);
                setIsEdit(false);
              }}
            >
              افزودن دانشجو
            </Button>
          </div>
          <div className={styles.top}>
            <SearchBox
              onChange={changeSearchBox}
              startSearch={startSearch}
              value={searchQuery}
            />

            <Button className={styles.fileInputCon}>
              آپلود اکسل
              {
                <input
                  accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  onChange={(e) => uploadExcel(e)}
                  className={styles.fileInput}
                  type="file"
                />
              }
            </Button>
          </div>
          <div className={styles.items}>
            {studentsData.students.length == 0 ? (
              <Empty />
            ) : (
              studentsData.students.map((professor, i) => {
                return (
                  <StudentCard
                    editOrAdd={setIsEdit}
                    openDialog={setOpen}
                    isITControlled
                    isPreregistrationCard
                    key={i}
                    {...professor}
                    userType={"student"}
                  />
                );
              })
            )}
          </div>
          <AddOrEdit
            // type={"preregistration"}
            // termId={termId}
            type={isEdit}
            open={open}
            closeHandle={closeHandle}
          />
        </div>
      )}
    </>
  );
};

export default ITStudents;
