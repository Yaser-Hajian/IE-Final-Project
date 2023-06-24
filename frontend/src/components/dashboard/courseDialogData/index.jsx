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
