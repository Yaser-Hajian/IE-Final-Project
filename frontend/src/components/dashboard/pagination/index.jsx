/* eslint-disable react/prop-types */
import { Pagination as MuiPagination } from "@mui/material";

const Pagination = ({ count, page, setPage }) => {
  return (
    <>
      {count != 1 && (
        <MuiPagination
          count={count}
          page={page}
          onChange={(e, v) => setPage(v)}
          sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}
        />
      )}
    </>
  );
};

export default Pagination;
