import { useState } from "react";

const usePagination = (itemLength, perPage) => {
  const [page, setPage] = useState(1);
  const count = Math.ceil(itemLength / perPage);
  const sliceInit = page * perPage - perPage;
  const sliceFinish = page * perPage;
  return { page, setPage, count, sliceInit, sliceFinish };
};

export default usePagination;
