/* eslint-disable react/prop-types */
import { Typography } from "@mui/material";
import styles from "./courseCard.module.css";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";

const CourseCard = ({ name, professor, capacity, term, occupiedCapacity }) => {
  return (
    <div className={styles.con}>
      <div className={styles.top}>
        <Typography variant="body1">{name}</Typography>
        <Typography variant="caption" sx={{ lineHeight: "5px" }}>
          {term}
        </Typography>
      </div>

      <div className={styles.bottom}>
        <Typography variant="body2">
          {professor}
          <PersonRoundedIcon />
        </Typography>

        <Typography variant="body2">
          {capacity} از {occupiedCapacity}
          <PeopleAltOutlinedIcon />
        </Typography>
      </div>
    </div>
  );
};

export default CourseCard;
