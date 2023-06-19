/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Divider, Typography } from "@mui/material";
import styles from "./terms.module.css";
import Empty from "../empty/empty";
import useTermsData from "../../../hooks/useTermsData";
import Loader from "../loader/loader";
import { useSelector } from "react-redux";
import TermCard from "../termCard/termCard";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Terms = ({ userType }) => {
  const terms = useSelector((s) => s.terms);
  const { isLoading, isError } = useTermsData();
  const navigate = useNavigate();
  return (
    <div className={styles.con}>
      <div className={styles.head}>
        {userType === "manager" && (
          <Button
            onClick={() => navigate("/dashboard/manager/terms/add")}
            startIcon={<Add />}
          >
            افزودن ترم
          </Button>
        )}
        <Typography sx={{ m: 1 }} variant="h5">
          لیست ترم ها
        </Typography>
      </div>
      <Divider />
      {isLoading ? (
        <Loader />
      ) : (
        <div dir="rtl" className={styles.items}>
          {terms.terms.length == 0 ? (
            <Empty />
          ) : (
            terms.terms.map((term, i) => {
              return (
                <TermCard
                  url={`/dashboard/${userType}/terms/${term.id}`}
                  key={i}
                  {...term}
                  userType={userType}
                />
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Terms;
