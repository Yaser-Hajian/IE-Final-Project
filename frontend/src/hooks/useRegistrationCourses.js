/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getRegistrationCourses from "../utils/dashboard/getRegistrationCourses";
import { updateRegistrationCoursesData } from "../redux/registrationCourses";

const useRegistrationCoursesData = (termId, searchQuery) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { isDataLoadedBefore } = useSelector((s) => s.registrationCourses);
  useEffect(() => {
    async function fetchData() {
      if (isDataLoadedBefore) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const registerData = await getRegistrationCourses(termId, searchQuery);
        if (registerData.error) {
          setIsError(true);
        }

        const apiCallData = { ...registerData.data };
        dispatch(
          updateRegistrationCoursesData({
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

export default useRegistrationCoursesData;
