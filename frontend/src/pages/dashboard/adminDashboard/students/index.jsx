import styles from "./index.module.css";
import Loader from "../../../../components/dashboard/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Empty from "../../../../components/dashboard/empty/empty";
import SearchBox from "../../../../components/dashboard/searchBox";
import { toast } from "react-toastify";
import UserCard from "../../../../components/dashboard/userCard";
import useStudentsData from "../../../../hooks/useStudents";
import { updateStudentsData } from "../../../../redux/students";
import addStudents from "../../../../utils/dashboard/addStudents";
import { Add } from "@mui/icons-material";
import usePagination from "../../../../hooks/usePagination";
import Pagination from "../../../../components/dashboard/pagination";
import readExcel from "../../../../utils/readExcel";
import { useNavigate } from "react-router-dom";
import { resetStudentData } from "../../../../redux/student";

const AdminStudent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const studentsData = useSelector((s) => s.students);
  const { isLoading } = useStudentsData(searchQuery);
  const { count, page, setPage, sliceFinish, sliceInit } = usePagination(
    studentsData.students.length,
    6
  );

  const filter = (p) => {
    const regex = new RegExp(`${searchQuery}`);
    if (
      regex.test(p.name) ||
      regex.test(p.familyName) ||
      regex.test(p.studentId)
    ) {
      return true;
    }
    return false;
  };
  const changeSearchBox = (e) => {
    setSearchQuery(e.currentTarget.value);
  };

  const readExcelProcess = (e) => {
    const file = e.currentTarget.files[0];
    toast.promise(
      readExcel(file).then((res) => {
        addStudentsProcess(res);
      }),
      {
        error: "یه مشکلی پیش اومده لطفا دوباره تلاش کن",
        pending: "لطفا منتظر بمانید",
        success: "با موفقیت فایل اکسل بارگذاری شد",
      }
    );
  };

  const addStudentsProcess = (students) => {
    toast.promise(
      addStudents(students).then(() => {
        dispatch(updateStudentsData({ isDataLoadedBefore: false }));
      }),
      {
        error: "یه مشکلی پیش اومده لطفا دوباره تلاش کن",
        pending: "لطفا منتظر بمانید در حال اضافه کردن دانشجو ها به دیتابیس",
        success: "با موفقیت دانشجو ها به دیتابیس اضافه شدند",
      }
    );
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div dir="rtl" className={styles.con}>
          <Box borderBottom={1} className={styles.head}>
            <div className={styles.headTitle}>
              <Typography variant="h5" sx={{ m: 0.5 }}>
                لیست دانشجویان
              </Typography>
              <Typography variant="caption">
                ({studentsData.students.length})
              </Typography>
            </div>
            <Button
              dir="ltr"
              startIcon={<Add />}
              onClick={() => {
                dispatch(resetStudentData());
                navigate(`/dashboard/admin/student/add`);
              }}
            >
              افزودن دانشجو
            </Button>
          </Box>
          <div className={styles.top}>
            <SearchBox
              placeholder="جست جوی دانشجو بر اساس اسم"
              onChange={changeSearchBox}
              value={searchQuery}
            />
            <Button className={styles.fileInputCon}>
              آپلود اکسل
              {
                <input
                  accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  onChange={readExcelProcess}
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
              studentsData.students
                .filter(filter)
                .slice(sliceInit, sliceFinish)
                .map((professor, i) => {
                  return (
                    <UserCard
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
          <Pagination count={count} page={page} setPage={setPage} />
        </div>
      )}
    </>
  );
};

export default AdminStudent;
