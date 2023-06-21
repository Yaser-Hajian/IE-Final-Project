/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import styles from "./index.module.css";
import usePreregistrationCoursesData from "../../../../hooks/usePreregistrationCourses";
import Loader from "../../../../components/dashboard/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import useTermIdData from "../../../../hooks/useTermId";
import {
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import CourseCard from "../../../../components/dashboard/courseCard";
import Empty from "../../../../components/dashboard/empty/empty";
import SearchBox from "../../../../components/dashboard/searchBox";
import { updatePreregistrationCoursesData } from "../../../../redux/preregistrationCourses";

const PreregistrationCourses = () => {
  const preregistrationCoursesData = useSelector(
    (s) => s.preregistrationCourses
  );
  const dispatch = useDispatch();
  const loggedUser = useSelector((s) => s.loggedUser);
  const { termId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const termIdData = useSelector((s) => s.termId);
  const termIdState = useTermIdData(termId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isLoading, isError } = usePreregistrationCoursesData(
    termId,
    searchQuery
  );

  const startSearch = () => {
    if (searchQuery.trim() == "") return;
    dispatch(
      updatePreregistrationCoursesData({
        isDataLoadedBefore: false,
      })
    );
  };

  const changeSearchBox = (e) => {
    setSearchQuery(e.currentTarget.value);
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
            <Typography>لیست دروس ارایه شده پیش ثبت نامی</Typography>
          </div>
          <div className={styles.items}>
            {preregistrationCoursesData.preregistrationCourses.length == 0 ? (
              <Empty />
            ) : (
              preregistrationCoursesData.preregistrationCourses.map(
                (term, i) => {
                  const isPreregistered = loggedUser.preregistrations.filter(
                    (id) => id == term.id
                  );
                  return (
                    <CourseCard
                      key={i}
                      {...term}
                      term={termIdData.name}
                      ispre={{
                        is: true,
                        preregistered: isPreregistered.length != 0,
                      }}
                    />
                  );
                }
              )
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
        </div>
      )}
    </>
  );
};

export default PreregistrationCourses;
