/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCourseData } from "../redux/course";
import getCourse from "../utils/dashboard/getCourse";

const useCourseData = (courseId) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { isDataLoadedBefore } = useSelector((s) => s.course);
  useEffect(() => {
    async function fetchData() {
      if (isDataLoadedBefore) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const preregisterData = await getCourse(courseId);
        if (preregisterData.error) {
          setIsError(true);
        }

        const apiCallData = { ...preregisterData.data };
        dispatch(
          updateCourseData({
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
  }, [dispatch, courseId, isDataLoadedBefore]);

  return { isLoading, isError };
};

export default useCourseData;
