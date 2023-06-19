/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getCourseRegistrations from "../utils/dashboard/getCourseRegistrations";
import { updateCourseRegistrationsData } from "../redux/courseRegistrations";

const useCourseRegistrationsData = (termId, searchQuery, sortType) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { isDataLoadedBefore } = useSelector((s) => s.courseRegistrations);
  useEffect(() => {
    async function fetchData() {
      if (isDataLoadedBefore) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const registerData = await getCourseRegistrations(
          termId,
          searchQuery,
          sortType
        );
        if (registerData.error) {
          setIsError(true);
        }

        const apiCallData = { ...registerData.data };
        dispatch(
          updateCourseRegistrationsData({
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
