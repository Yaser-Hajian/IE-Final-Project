/* eslint-disable no-unused-vars */
import { Link, useParams } from "react-router-dom";
import styles from "./index.module.css";
import useTermIdData from "../../../../hooks/useTermId";
import Loader from "../../../../components/dashboard/loader/loader";
import { useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { useState } from "react";

const TermId = () => {
  const { termId } = useParams();
  const termIdData = useSelector((s) => s.termId);
  const { isLoading, isError } = useTermIdData(termId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      {isLoading ? (
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
          <div className={styles.main}>
            <Link to={"registrations"}>
              <div className={styles.items}>
                <AssignmentOutlinedIcon />
                <Typography>لیست دروس ثبت نامی</Typography>
              </div>
            </Link>
            <Link to={"registration_courses"}>
              <div className={styles.items}>
                <AssignmentOutlinedIcon />
                <Typography>لیست دروس ارایه شده ثبت نامی</Typography>
              </div>
            </Link>
            <Link to={"preregistrations"}>
              <div className={styles.items}>
                <AssignmentOutlinedIcon />
                <Typography>لیست دروس پیش ثبت نامی</Typography>
              </div>
            </Link>
            <Link to={"preregistration_courses"}>
              <div className={styles.items}>
                <AssignmentOutlinedIcon />
                <Typography>لیست دروس ارایه شده پیش ثبت نامی</Typography>
              </div>
            </Link>
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

export default TermId;
