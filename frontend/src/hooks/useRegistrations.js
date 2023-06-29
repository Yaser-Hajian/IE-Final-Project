/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRegistrationsData } from "../redux/registrations";
import getRegistrations from "../utils/dashboard/getRegistrations";

const useCourseRegistrationsData = (termId) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { isDataLoadedBefore } = useSelector((s) => s.registrations);
  useEffect(() => {
    async function fetchData() {
      if (isDataLoadedBefore) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const registerData = await getRegistrations(termId);
        if (registerData.error) {
          setIsError(true);
        }

        const apiCallData = { ...registerData.data };
        dispatch(
          updateRegistrationsData({
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

export default useCourseRegistrationsData;
