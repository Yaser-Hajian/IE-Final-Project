/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogTitle,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import styles from "./index.module.css";

const CourseDialogData = ({ isDialogOpen, setIsDialogOpen, courseData }) => {
  return (
    <Dialog
      dir="ltr"
      fullWidth
      open={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
    >
      <DialogTitle className={styles.dialogTitle}>
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
            <Typography>پر شده</Typography>
          </div>
        </ListItem>
        <Divider />
        <ListItem>
          <div className={styles.dialogItems}>
            <Typography>{courseData.term}</Typography>
            <Typography>ترم</Typography>
          </div>
        </ListItem>
      </List>
    </Dialog>
  );
};

export default CourseDialogData;
