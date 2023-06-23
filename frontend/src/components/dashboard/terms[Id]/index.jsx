/* eslint-disable react/prop-types */
import { Link, useParams } from "react-router-dom";
import styles from "./index.module.css";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { useState } from "react";
import useTermIdData from "../../../hooks/useTermId";
import Loader from "../loader/loader";
import TermDialogData from "../termDialogData";
import TermHeadInfo from "../termHeadInfo";
import useAddTermToLastSeen from "../../../hooks/useAddTermToLastSeen";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
const TermId = ({ userType }) => {
  const { termId } = useParams();
  const termIdData = useSelector((s) => s.termId);
  const { isLoading } = useTermIdData(termId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  useAddTermToLastSeen(termId);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div dir="" className={styles.con}>
          <TermHeadInfo
            setIsDialogOpen={setIsDialogOpen}
            termData={termIdData}
          />

          <div dir="ltr" className={styles.main}>
            {userType != "manager" && (
              <Link to={"preregistrations"}>
                <div className={styles.items}>
                  <PlaylistAddCheckIcon />
                  <Typography>لیست دروس پیش ثبت نامی</Typography>
                </div>
              </Link>
            )}
            <Link to={"preregistration_courses"}>
              <div className={styles.items}>
                <ListAltIcon />
                <Typography>لیست دروس ارایه شده پیش ثبت نامی</Typography>
              </div>
            </Link>
            {userType != "manager" && (
              <Link to={"registrations"}>
                <div className={styles.items}>
                  <HowToRegIcon />
                  <Typography>لیست دروس ثبت نامی</Typography>
                </div>
              </Link>
            )}
            <Link to={"registration_courses"}>
              <div className={styles.items}>
                <FormatListBulletedIcon />
                <Typography>لیست دروس ارایه شده ثبت نامی</Typography>
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
