/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Divider, Typography } from "@mui/material";
import styles from "./terms.module.css";
import Empty from "../empty/empty";
import useTermsData from "../../../hooks/useTermsData";
import Loader from "../loader/loader";
import { useSelector } from "react-redux";
import TermCard from "../termCard/termCard";

const Terms = ({ userType }) => {
  const terms = useSelector((s) => s.terms);
  const { isLoading, isError } = useTermsData();
  return (
    <div dir="rtl" className={styles.con}>
      <Typography sx={{ m: 1 }} variant="h5">
        لیست ترم ها
      </Typography>
      <Divider />
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.items}>
          {terms.terms.length == 0 ? (
            <Empty />
          ) : (
            terms.terms.map((term, i) => {
              return (
                <TermCard
                  url={`/dashboard/${userType}/terms/${term.id}`}
                  key={i}
                  {...term}
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
