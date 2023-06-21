/* eslint-disable react/prop-types */
import { Box, Button, Typography } from "@mui/material";
import styles from "./index.module.css";
import msToDate from "../../../utils/msToDate";

const TermHeadInfo = ({ setIsDialogOpen, termData }) => {
  return (
    <Box borderBottom={1} className={styles.head}>
      <Button onClick={() => setIsDialogOpen(true)}>اطلاعات ترم</Button>
      <div>
        <Typography variant="h5">{termData.name}</Typography>
        <Typography variant="caption">
          {msToDate(termData.startDate)} - {msToDate(termData.endDate)}
        </Typography>
      </div>
    </Box>
  );
};

export default TermHeadInfo;
