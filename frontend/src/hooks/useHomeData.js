import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import getTerms from "../utils/dashboard/getTerms";
import getLastObservedCourses from "../utils/getLastObservedCourses";
import getLastObservedTerms from "../utils/getLastObservedTerms";
import getCourses from "../utils/dashboard/getCourses";
import { updateHomeData } from "../redux/home";

const useHomeData = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const coursesList = getLastObservedCourses();
        const termsList = getLastObservedTerms();
        const termsData = await getTerms(termsList);
        if (termsData.error) {
          setIsError(true);
        }
        const courseData = await getCourses(coursesList);
        if (courseData.error) {
          setIsError(true);
        }

        dispatch(
          updateHomeData({
            lastObservedTerms: termsData.data.terms,
            lastObservedCourses: courseData.data.courses,
            isDataLoadedBefore: true,
          })
        );
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
      }
    }
    fetchData();
  }, [dispatch]);

  return { isLoading, isError };
};

export default useHomeData;
