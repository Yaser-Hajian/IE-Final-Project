/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStudentData } from "../redux/student";
import getStudent from "../utils/dashboard/getStudent";

const useStudentData = (studentId, type) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { isDataLoadedBefore } = useSelector((s) => s.student);
  useEffect(() => {
    async function fetchData() {
      if (!type) {
        setIsLoading(false);
        return;
      }
      if (isDataLoadedBefore) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const studentData = await getStudent(studentId);
        if (studentData.error) {
          setIsError(true);
        }

        const apiCallData = { ...studentData.data };
        dispatch(
          updateStudentData({
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

export default useStudentData;
