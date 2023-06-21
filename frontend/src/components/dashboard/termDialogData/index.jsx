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
import msToDate from "../../../utils/msToDate";

const TermDialogData = ({ isDialogOpen, setIsDialogOpen, termData }) => {
  return (
    <Dialog
      dir="ltr"
      fullWidth
      open={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
    >
      <DialogTitle className={styles.dialogTitle}>{termData.name}</DialogTitle>
      <List>
        <ListItem>
          <div className={styles.dialogItems}>
            <Typography>{msToDate(termData.startDate)}</Typography>
            <Typography>تاریخ شروع</Typography>
          </div>
        </ListItem>
        <Divider />
        <ListItem>
          <div className={styles.dialogItems}>
            <Typography>{msToDate(termData.endDate)}</Typography>
            <Typography>تاریخ پایان</Typography>
          </div>
        </ListItem>
        <Divider />
        <ListItem>
          <div className={styles.dialogItems}>
            <Typography>{termData.courseNum}</Typography>
            <Typography>تعداد دروس</Typography>
          </div>
        </ListItem>
        <Divider />
        <ListItem>
          <div className={styles.dialogItems}>
            <Typography>{termData.studentNum}</Typography>
            <Typography>تعداد دانشجویان</Typography>
          </div>
        </ListItem>
      </List>
    </Dialog>
  );
};

export default TermDialogData;
