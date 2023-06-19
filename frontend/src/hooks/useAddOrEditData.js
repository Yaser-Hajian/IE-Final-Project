import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import getTermId from "../utils/dashboard/getTermId";
import { updateEditOrAddTermData } from "../redux/editOrAddTerm";

const useEditOrAddData = (termId) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (termId == null) {
        console.log(termId);
        setIsLoading(false);
        return;
      }
      try {
        const termIdData = await getTermId(termId);
        if (termIdData.error) {
          setIsError(true);
        }

        const apiCallData = { ...termIdData.data };
        dispatch(
          updateEditOrAddTermData({ ...apiCallData, isDataLoadedBefore: true })
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

export default useEditOrAddData;
