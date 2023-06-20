/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getProfessor from "../utils/dashboard/getProfessor";
import { updateProfessorData } from "../redux/professor";

const useProfessorData = (professorId, type) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { isDataLoadedBefore } = useSelector((s) => s.professor);
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
        const professorData = await getProfessor(professorId);
        if (professorData.error) {
          setIsError(true);
        }

        const apiCallData = { ...professorData.data };
        dispatch(
          updateProfessorData({
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

export default useProfessorData;
