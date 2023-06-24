import styles from "./index.module.css";
import Loader from "../../../../components/dashboard/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Empty from "../../../../components/dashboard/empty/empty";
import SearchBox from "../../../../components/dashboard/searchBox";
import { toast } from "react-toastify";
import UserCard from "../../../../components/dashboard/userCard";
import useProfessorsData from "../../../../hooks/useProfessors";
import { updateProfessorsData } from "../../../../redux/professors";
import Pagination from "../../../../components/dashboard/pagination";
import usePagination from "../../../../hooks/usePagination";
import downloadAsExcel from "../../../../utils/downloadExcel";

const ManagerProfessors = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const professorsData = useSelector((s) => s.professors);
  const { isLoading } = useProfessorsData(searchQuery);
  const { count, page, setPage, sliceFinish, sliceInit } = usePagination(
    professorsData.professors.length,
    6
  );
  const startSearch = () => {
    if (searchQuery.trim() == "") return;
    dispatch(
      updateProfessorsData({
        isDataLoadedBefore: false,
      })
    );
  };

  const changeSearchBox = (e) => {
    setSearchQuery(e.currentTarget.value);
  };
  const downloadExcel = () => {
    toast.promise(downloadAsExcel(professorsData.professors), {
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
          <Box dir="rtl" borderBottom={1} className={styles.head}>
            <Typography variant="h5">لیست اساتید</Typography>
          </Box>
          <div dir="rtl" className={styles.top}>
            <SearchBox
              onChange={changeSearchBox}
              startSearch={startSearch}
              value={searchQuery}
            />

            <Button onClick={downloadExcel} variant="outlined">
              دانلود اکسل
            </Button>
          </div>
          <div dir="rtl" className={styles.items}>
            {professorsData.professors.length == 0 ? (
              <Empty />
            ) : (
              professorsData.professors
                .slice(sliceInit, sliceFinish)
                .map((professor, i) => {
                  return (
                    <UserCard
                      isItControlled
                      isPreregistrationCard
                      key={i}
                      {...professor}
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

export default ManagerProfessors;