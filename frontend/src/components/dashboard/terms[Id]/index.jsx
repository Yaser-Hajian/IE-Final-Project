/* eslint-disable react/prop-types */
import { Link, useParams } from "react-router-dom";
import styles from "./index.module.css";

import { useSelector } from "react-redux";
import { Button, Typography } from "@mui/material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { useState } from "react";
import useTermIdData from "../../../hooks/useTermId";
import Loader from "../loader/loader";
import msToDate from "../../../utils/msToDate";
import TermDialogData from "../termDialogData";

const TermId = ({ userType }) => {
  const { termId } = useParams();
  const termIdData = useSelector((s) => s.termId);
  const { isLoading } = useTermIdData(termId);
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
                {msToDate(termIdData.startDate)} -{" "}
                {msToDate(termIdData.endDate)}
              </Typography>
            </div>

            <Button onClick={() => setIsDialogOpen(true)}>اطلاعات ترم</Button>
          </div>
          <div className={styles.main}>
            {userType != "manager" && (
              <Link to={"registrations"}>
                <div className={styles.items}>
                  <AssignmentOutlinedIcon />
                  <Typography>لیست دروس ثبت نامی</Typography>
                </div>
              </Link>
            )}
            <Link to={"registration_courses"}>
              <div className={styles.items}>
                <AssignmentOutlinedIcon />
                <Typography>لیست دروس ارایه شده ثبت نامی</Typography>
              </div>
            </Link>
            {userType != "manager" && (
              <Link to={"preregistrations"}>
                <div className={styles.items}>
                  <AssignmentOutlinedIcon />
                  <Typography>لیست دروس پیش ثبت نامی</Typography>
                </div>
              </Link>
            )}
            <Link to={"preregistration_courses"}>
              <div className={styles.items}>
                <AssignmentOutlinedIcon />
                <Typography>لیست دروس ارایه شده پیش ثبت نامی</Typography>
              </div>
            </Link>
          </div>
          <TermDialogData
            termData={termIdData}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
          />
        </div>
      )}
    </>
  );
};

export default TermId;
