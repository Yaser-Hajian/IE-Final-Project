/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getCoursePreregistrations from "../utils/dashboard/getCoursePreregistrations";
import { updateCoursePreregistrationsData } from "../redux/coursePreregistrations";

const useCoursePreregistrations = (termId, searchQuery, sortType) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { isDataLoadedBefore } = useSelector((s) => s.coursePreregistrations);
  useEffect(() => {
    async function fetchData() {
      if (isDataLoadedBefore) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const preregisterData = await getCoursePreregistrations(
          termId,
          searchQuery,
          sortType
        );
        if (preregisterData.error) {
          setIsError(true);
        }

        const apiCallData = { ...preregisterData.data };
        dispatch(
          updateCoursePreregistrationsData({
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

export default useCoursePreregistrations;
