/* eslint-disable no-unused-vars */
import { Link, useParams } from "react-router-dom";
import styles from "./index.module.css";
import useTermIdData from "../../../../hooks/useTermId";
import Loader from "../../../../components/dashboard/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogTitle,
  Fade,
  List,
  ListItem,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import SearchBox from "../../../../components/dashboard/searchBox";
import useCourseRegistrationsData from "../../../../hooks/useRegistrations";
import { updateRegistrationsData } from "../../../../redux/registrations";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CourseCard from "../../../../components/dashboard/courseCard/courseCard";
import Empty from "../../../../components/dashboard/empty/empty";

const ProfessorDashboardTermId = () => {
  const { termId } = useParams();
  const registrationData = useSelector((s) => s.registrations);
  const [sortType, setSortType] = useState(null);
  const termIdData = useSelector((s) => s.termId);
  const termIdState = useTermIdData(termId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoading, isError } = useCourseRegistrationsData(
    termId,
    searchQuery,
    sortType
  );
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const settingSortType = (type) => {
    if (type == null) return;
    setSortType(type);
    dispatch(
      updateRegistrationsData({
        isDataLoadedBefore: false,
      })
    );
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  const startSearch = () => {
    if (searchQuery.trim() == "") return;
    dispatch(
      updateRegistrationsData({
        isDataLoadedBefore: false,
      })
    );
  };

  const changeSearchBox = (e) => {
    setSearchQuery(e.currentTarget.value);
  };
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  return (
    <>
      {termIdState.isLoading || isLoading ? (
        <Loader />
      ) : (
        <div dir="rtl" className={styles.con}>
          <div className={styles.head}>
            <div>
              <Typography variant="h5">{termIdData.name}</Typography>
              <Typography variant="caption">
                {termIdData.startDate}-{termIdData.endDate}
              </Typography>
            </div>

            <Button onClick={() => setIsDialogOpen(true)}>اطلاعات ترم</Button>
          </div>
          <div dir="ltr" className={styles.top}>
            <SearchBox
              onChange={changeSearchBox}
              startSearch={startSearch}
              value={searchQuery}
            />
            <div dir="rtl">
              <Typography>لیست دروس ترم {termIdData.name}</Typography>
              <Typography
                sx={{ display: "flex", alignItems: "center" }}
                onClick={handleClick}
                variant="caption"
              >
                فیلتر بر اساس
                <FilterAltIcon />
              </Typography>
            </div>
          </div>
          <div className={styles.items}>
            {registrationData.registrations.length == 0 ? (
              <Empty />
            ) : (
              registrationData.registrations.map((course, i) => {
                return (
                  <CourseCard
                    url={`/dashboard/professor/course/${course.id}/registrations`}
                    key={i}
                    {...course}
                    term={termIdData.name}
                  />
                );
              })
            )}
          </div>
          <Dialog
            dir="ltr"
            open={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
          >
            <DialogTitle className={styles.dialogTitle}>
              {termIdData.name}
            </DialogTitle>
            <List>
              <ListItem>
                <div className={styles.dialogItems}>
                  <Typography>{termIdData.startDate}</Typography>
                  <Typography>تاریخ شروع</Typography>
                </div>
              </ListItem>
              <ListItem>
                <div className={styles.dialogItems}>
                  <Typography>{termIdData.endDate}</Typography>
                  <Typography>تاریخ پایان</Typography>
                </div>
              </ListItem>

              <ListItem>
                <div className={styles.dialogItems}>
                  <Typography>{termIdData.courseNum}</Typography>
                  <Typography>تعداد دروس</Typography>
                </div>
              </ListItem>

              <ListItem>
                <div className={styles.dialogItems}>
                  <Typography>{termIdData.studentNum}</Typography>
                  <Typography>تعداد دانشجویان</Typography>
                </div>
              </ListItem>
            </List>
          </Dialog>
          <Menu
            dir="rtl"
            anchorEl={anchorEl}
            onClose={handleClose}
            onClick={handleClose}
            open={open}
            PaperProps={{
              elevation: 0,
              className: styles.menuPaper,
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={() => settingSortType("mostRegister")}>
              بیشترین تعداد ثبت نام
            </MenuItem>
            <MenuItem onClick={() => settingSortType("lowRegister")}>
              کمترین تعداد ثبت نام
            </MenuItem>
            <MenuItem onClick={() => settingSortType(null)}>هیچ کدام</MenuItem>
          </Menu>
        </div>
      )}
    </>
  );
};

export default ProfessorDashboardTermId;
