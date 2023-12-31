import styles from "./index.module.css";
import Loader from "../../../../components/dashboard/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Empty from "../../../../components/dashboard/empty/empty";
import SearchBox from "../../../../components/dashboard/searchBox";
import { toast } from "react-toastify";
import useManagersData from "../../../../hooks/useManagers";
import { updateManagersData } from "../../../../redux/managers";
import addManagers from "../../../../utils/dashboard/addManagers";
import Pagination from "../../../../components/dashboard/pagination";
import usePagination from "../../../../hooks/usePagination";
import { Add } from "@mui/icons-material";
import readExcel from "../../../../utils/readExcel";
import UserCard from "../../../../components/dashboard/userCard";
import { useNavigate } from "react-router-dom";
import { resetManagerData } from "../../../../redux/manager";

const AdminManager = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const managersData = useSelector((s) => s.managers);
  const { isLoading } = useManagersData(searchQuery);
  const { count, page, setPage, sliceFinish, sliceInit } = usePagination(
    managersData.managers.length,
    6
  );

  const filter = (p) => {
    const regex = new RegExp(`${searchQuery}`);
    if (
      regex.test(p.name) ||
      regex.test(p.familyName) ||
      regex.test(p.managerId)
    ) {
      return true;
    }
    return false;
  };

  const changeSearchBox = (e) => {
    if (e.currentTarget.value == "\\") {
      return;
    }
    setSearchQuery(e.currentTarget.value);
  };

  const readExcelProcess = (e) => {
    const file = e.currentTarget.files[0];
    toast.promise(
      readExcel(file).then((res) => {
        addManagersProcess(res);
      }),
      {
        error: "یه مشکلی پیش اومده لطفا دوباره تلاش کن",
        pending: "لطفا منتظر بمانید",
        success: "با موفقیت فایل اکسل بارگذاری شد",
      }
    );
  };

  const addManagersProcess = (managers) => {
    toast.promise(
      addManagers(managers).then(() => {
        dispatch(updateManagersData({ isDataLoadedBefore: false }));
      }),
      {
        error: "یه مشکلی پیش اومده لطفا دوباره تلاش کن",
        pending: "لطفا منتظر بمانید در حال اضافه کردن مدیر ها به دیتابیس",
        success: "با موفقیت مدیر ها به دیتابیس اضافه شدند",
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
                لیست مدیران
              </Typography>
              <Typography variant="caption">
                ({managersData.managers.length})
              </Typography>
            </div>
            <Button
              dir="ltr"
              startIcon={<Add />}
              onClick={() => {
                dispatch(resetManagerData());
                navigate(`/dashboard/admin/manager/add`);
              }}
            >
              افزودن مدیر
            </Button>
          </Box>
          <div className={styles.top}>
            <SearchBox
              placeholder="جست جوی مدیر بر اساس اسم"
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
            {managersData.managers.length == 0 ? (
              <Empty />
            ) : (
              managersData.managers
                .filter(filter)
                .slice(sliceInit, sliceFinish)
                .map((manager, i) => {
                  return (
                    <UserCard
                      isITControlled
                      isPreregistrationCard
                      key={i}
                      {...manager}
                      userType={"manager"}
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

export default AdminManager;
