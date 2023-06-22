/* eslint-disable react/prop-types */
import { Button, Typography } from "@mui/material";
import styles from "./index.module.css";
const CourseHeadInfo = ({ setIsDialogOpen, courseData }) => {
  return (
    <div dir="rtl" className={styles.con}>
      <div>
        <Typography variant="h5">{courseData.name}</Typography>
        <Typography variant="caption">{courseData.professor}</Typography>
      </div>

      <Button onClick={() => setIsDialogOpen(true)}>اطلاعات درس</Button>
    </div>
  );
};

export default CourseHeadInfo;
