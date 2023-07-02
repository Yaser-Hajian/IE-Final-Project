/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getPreregistrationCourses from "../utils/dashboard/getPreregistrationCourses";
import { updatePreregistrationCoursesData } from "../redux/preregistrationCourses";

const usePreregistrationCoursesData = (termId) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { isDataLoadedBefore } = useSelector((s) => s.preregistrationCourses);
  useEffect(() => {
    async function fetchData() {
      if (isDataLoadedBefore) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const preregisterCoursesData = await getPreregistrationCourses(termId);
        if (preregisterCoursesData.error) {
          setIsError(true);
        }

        const apiCallData = { ...preregisterCoursesData.data };
        dispatch(
          updatePreregistrationCoursesData({
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

export default usePreregistrationCoursesData;
