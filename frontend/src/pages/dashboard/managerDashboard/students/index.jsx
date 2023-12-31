import styles from "./index.module.css";
import Loader from "../../../../components/dashboard/loader/loader";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Empty from "../../../../components/dashboard/empty/empty";
import SearchBox from "../../../../components/dashboard/searchBox";
import { toast } from "react-toastify";
import useStudentsData from "../../../../hooks/useStudents";
import Pagination from "../../../../components/dashboard/pagination";
import usePagination from "../../../../hooks/usePagination";
import downloadAsExcel from "../../../../utils/downloadExcel";
import UserCard from "../../../../components/dashboard/userCard";

const ManagerStudents = () => {
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

  const downloadExcel = () => {
    toast.promise(downloadAsExcel(studentsData.students), {
      pending: "لطفا صبر کنید",
      error: "یه مشکلی پیش اومده لطفا دوباره امتحان کن",
      success: "با موفقیت فایل اکسل دانلود شد",
    });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.con}>
          <Box borderBottom={1} dir="rtl" className={styles.head}>
            <div className={styles.headTitle}>
              <Typography sx={{ m: 0.5 }} variant="h5">
                لیست دانشجویان
              </Typography>
              <Typography variant="caption">
                ({studentsData.students.length})
              </Typography>
            </div>
          </Box>
          <div dir="rtl" className={styles.top}>
            <SearchBox onChange={changeSearchBox} value={searchQuery} />

            <Button onClick={downloadExcel} variant="outlined">
              دانلود اکسل
            </Button>
          </div>
          <div dir="rtl" className={styles.items}>
            {studentsData.students.length == 0 ? (
              <Empty />
            ) : (
              studentsData.students
                .filter(filter)
                .slice(sliceInit, sliceFinish)
                .map((student, i) => {
                  return (
                    <UserCard
                      isItControlled
                      isPreregistrationCard
                      key={i}
                      {...student}
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

export default ManagerStudents;
