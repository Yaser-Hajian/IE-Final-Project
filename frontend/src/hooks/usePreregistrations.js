/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getPreregistrations from "../utils/dashboard/getPreregistrations";
import { updatePreregistrationsData } from "../redux/preregistrations";

const usePreregistrationsData = (termId, searchQuery) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { isDataLoadedBefore } = useSelector((s) => s.preregistrations);
  useEffect(() => {
    async function fetchData() {
      if (isDataLoadedBefore) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const preregisterData = await getPreregistrations(termId, searchQuery);
        console.log("data loaded? ", preregisterData);
        if (preregisterData.error) {
          setIsError(true);
        }

        const apiCallData = { ...preregisterData.data };
        dispatch(
          updatePreregistrationsData({
            ...apiCallData,
            isDataLoadedBefore: true,
          })
        );
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
      }
    }
    fetchData();
  }, [dispatch, termId, isDataLoadedBefore]);

  return { isLoading, isError };
};

export default usePreregistrationsData;
