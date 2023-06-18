import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import getTermId from "../utils/dashboard/getTermId";
import { updateTermIdData } from "../redux/termId";

const useTermIdData = (termId) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const termIdData = await getTermId(termId);
        if (termIdData.error) {
          setIsError(true);
        }

        const apiCallData = { ...termIdData.data };
        dispatch(
          updateTermIdData({ ...apiCallData, isDataLoadedBefore: true })
        );
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
      }
    }
    fetchData();
  }, [dispatch, termId]);

  return { isLoading, isError };
};

export default useTermIdData;
