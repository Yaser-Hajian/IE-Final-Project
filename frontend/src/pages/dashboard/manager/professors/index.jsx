import styles from "./index.module.css";
import Loader from "../../../../components/dashboard/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import * as XLSX from "xlsx";
import { Box, Button, Typography } from "@mui/material";
import Empty from "../../../../components/dashboard/empty/empty";
import SearchBox from "../../../../components/dashboard/searchBox";
import { toast } from "react-toastify";
import StudentCard from "../../../../components/dashboard/studentCard";
import useProfessorsData from "../../../../hooks/useProfessors";
import { updateProfessorsData } from "../../../../redux/professors";
import Pagination from "../../../../components/dashboard/pagination";
import usePagination from "../../../../hooks/usePagination";

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
    const loadingToast = toast("لطفا صبر کنید ...", {
      autoClose: true,
      position: "top-left",
      theme: "light",
      isLoading: true,
    });

    try {
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(professorsData.professors);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      const excelFile = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "binary",
      });
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(
        new Blob([s2ab(excelFile)], { type: "application/octet-stream" })
      );
      downloadLink.download = "data.xlsx";
      downloadLink.click();
      toast.update(loadingToast, {
        render: "ورود موفقیت آمیز ",
        type: "success",
        autoClose: true,
        position: "top-left",
        isLoading: false,
      });

      setTimeout(() => {
        toast.dismiss(loadingToast);
      }, 1500);
    } catch (err) {
      toast.update(loadingToast, {
        render: "یه مشکلی پیش اومده ، لطفا دوباره امتحان کنید",
        autoClose: true,
        position: "top-left",
        isLoading: false,
        type: "error",
      });
    }
  };
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  }

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
                    <StudentCard
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
