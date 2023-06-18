import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getPreregistrationCourses from "../utils/dashboard/getPreregistrationCourses";
import { updatePreregistrationCoursesData } from "../redux/preregistrationCourses";

const usePreregistrationCoursesData = (termId, searchQuery) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { isDataLoadedBefore } = useSelector((s) => s.preregistrationCourses);
  useEffect(() => {
    async function fetchData() {
      if (isDataLoadedBefore) {
        return;
      }
      setIsLoading(true);
      try {
        const termIdData = await getPreregistrationCourses(termId, searchQuery);
        if (termIdData.error) {
          setIsError(true);
        }

        const apiCallData = { ...termIdData.data };
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
