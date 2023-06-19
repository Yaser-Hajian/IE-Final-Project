/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getCourses from "../utils/dashboard/getCourses";
import { updateCoursesData } from "../redux/courses";

const useCoursesData = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { isDataLoadedBefore } = useSelector((s) => s.courses);
  useEffect(() => {
    async function fetchData() {
      if (isDataLoadedBefore) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const preregisterData = await getCourses();
        if (preregisterData.error) {
          setIsError(true);
        }

        const apiCallData = { ...preregisterData.data };
        dispatch(
          updateCoursesData({
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
  }, [dispatch, isDataLoadedBefore]);

  return { isLoading, isError };
};

export default useCoursesData;
