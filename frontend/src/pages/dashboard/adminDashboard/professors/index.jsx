import styles from "./index.module.css";
import Loader from "../../../../components/dashboard/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Empty from "../../../../components/dashboard/empty/empty";
import SearchBox from "../../../../components/dashboard/searchBox";
import { toast } from "react-toastify";
import useProfessorsData from "../../../../hooks/useProfessors";
import { updateProfessorsData } from "../../../../redux/professors";
import AddOrEditProfessor from "../../../../components/dashboard/admin/addOrEditProfessor";
import addProfessors from "../../../../utils/dashboard/addProfessors";
import usePagination from "../../../../hooks/usePagination";
import Pagination from "../../../../components/dashboard/pagination";
import { Add } from "@mui/icons-material";
import readExcel from "../../../../utils/readExcel";
import UserCard from "../../../../components/dashboard/userCard";

const AdminProfessor = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const professorsData = useSelector((s) => s.professors);
  const { isLoading } = useProfessorsData(searchQuery);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState({ isEdit: false, id: null });
  const { count, page, setPage, sliceFinish, sliceInit } = usePagination(
    professorsData.professors.length,
    6
  );
  const closeHandle = () => {
    setOpen(false);
    setIsEdit({ isEdit: false });
  };
  const filter = (p) => {
    const regex = new RegExp(`${searchQuery}`);
    if (
      regex.test(p.name) ||
      regex.test(p.familyName) ||
      regex.test(p.professorId)
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
        addProfessorsProcess(res);
      }),
      {
        error: "یه مشکلی پیش اومده لطفا دوباره تلاش کن",
        pending: "لطفا منتظر بمانید",
        success: "با موفقیت فایل اکسل بارگذاری شد",
      }
    );
  };

  const addProfessorsProcess = (professors) => {
    toast.promise(
      addProfessors(professors).then(() => {
        dispatch(updateProfessorsData({ isDataLoadedBefore: false }));
      }),
      {
        error: "یه مشکلی پیش اومده لطفا دوباره تلاش کن",
        pending: "لطفا منتظر بمانید در حال اضافه کردن استاد ها به دیتابیس",
        success: "با موفقیت استاد ها به دیتابیس اضافه شدند",
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
                لیست اساتید
              </Typography>
              <Typography variant="caption">
                ({professorsData.professors.length})
              </Typography>
            </div>
            <Button
              dir="ltr"
              startIcon={<Add />}
              onClick={() => {
                setIsEdit({ isEdit: false });
                setOpen(true);
              }}
            >
              افزودن استاد
            </Button>
          </Box>
          <div className={styles.top}>
            <SearchBox
              placeholder="جست جوی استاد بر اساس اسم"
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
            {professorsData.professors.length == 0 ? (
              <Empty />
            ) : (
              professorsData.professors
                .filter(filter)
                .slice(sliceInit, sliceFinish)
                .map((professor, i) => {
                  return (
                    <UserCard
                      editOrAdd={setIsEdit}
                      openDialog={setOpen}
                      isITControlled
                      isPreregistrationCard
                      key={i}
                      {...professor}
                      userType={"professor"}
                    />
                  );
                })
            )}
          </div>
          <Pagination count={count} page={page} setPage={setPage} />

          {open && (
            <AddOrEditProfessor
              id={isEdit.id}
              type={isEdit.isEdit}
              open={open}
              closeHandle={closeHandle}
            />
          )}
        </div>
      )}
    </>
  );
};

export default AdminProfessor;
