/* eslint-disable react/prop-types */
import { Typography } from "@mui/material";
import styles from "./termCard.module.css";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import { useNavigate } from "react-router-dom";

const TermCard = ({ name, startDate, endDate, courseNum, studentNum, url }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(url, { replace: true });
      }}
      className={styles.con}
    >
      <div className={styles.top}>
        <Typography variant="body1">{name}</Typography>
        <Typography variant="caption" sx={{ lineHeight: "5px" }}>
          {endDate}-{startDate}
        </Typography>
      </div>

      <div className={styles.bottom}>
        <Typography variant="body2">
          {courseNum}درس
          <LibraryBooksOutlinedIcon />
        </Typography>

        <Typography variant="body2">
          {studentNum}دانشجو
          <PersonRoundedIcon />
        </Typography>
      </div>
    </div>
  );
};

export default TermCard;
