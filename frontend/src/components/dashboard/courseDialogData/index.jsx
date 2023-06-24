/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import styles from "./index.module.css";
import { Close } from "@mui/icons-material";
import msToFullDate from "../../../utils/msToFullDate";
import getDayName from "../../../utils/getDayName";
import msToTime from "../../../utils/msToTime";

const CourseDialogData = ({ isDialogOpen, setIsDialogOpen, courseData }) => {
  const closeDialog = () => {
    setIsDialogOpen(false);
  };
  return (
    <Dialog dir="ltr" fullWidth open={isDialogOpen} onClose={closeDialog}>
      <DialogTitle className={styles.dialogTitle}>
        <IconButton onClick={closeDialog}>
          <Close />
        </IconButton>
        {courseData.name}
      </DialogTitle>
      <List>
        <ListItem>
          <div className={styles.dialogItems}>
            <Typography>{courseData.professor}</Typography>
            <Typography>استاد</Typography>
          </div>
        </ListItem>
        <Divider />
        <ListItem>
          <div className={styles.dialogItems}>
            <Typography>{courseData.capacity}</Typography>
            <Typography>ظرفیت</Typography>
          </div>
        </ListItem>
        <Divider />
        <ListItem>
          <div className={styles.dialogItems}>
            <Typography>{courseData.occupiedCapacity}</Typography>
            <Typography>تعداد ثبت نامی ها</Typography>
          </div>
        </ListItem>
        <Divider />
        <ListItem>
          <div className={styles.dialogItems}>
            <Typography>{courseData.term}</Typography>
            <Typography>ترم</Typography>
          </div>
        </ListItem>
        <Divider />
        <ListItem>
          <div className={styles.dialogItems}>
            <Typography>
              {msToFullDate(new Date(courseData.examTime).getTime())}
            </Typography>
            <Typography>تاریخ امتحان</Typography>
          </div>
        </ListItem>
        <Divider />
        <ListItem>
          <div className={styles.dialogItems}>
            <div className={styles.classTimesList}>
              {courseData.classTimes.map((c, i) => {
                return (
                  <Typography key={i}>
                    {getDayName(c.day)} ها
                    {msToTime(new Date(c.time).getTime())}
                  </Typography>
                );
              })}
            </div>
            <Typography>تاریخ کلاس ها</Typography>
          </div>
        </ListItem>
      </List>
    </Dialog>
  );
};

export default CourseDialogData;
