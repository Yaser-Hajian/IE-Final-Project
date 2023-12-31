/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getProfessors from "../utils/dashboard/getProfessors";
import { updateProfessorsData } from "../redux/professors";

const useProfessorsData = (searchQuery) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { isDataLoadedBefore } = useSelector((s) => s.professors);
  useEffect(() => {
    async function fetchData() {
      if (isDataLoadedBefore) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const professorsData = await getProfessors(searchQuery);
        if (professorsData.error) {
          setIsError(true);
        }

        const apiCallData = { ...professorsData.data };
        dispatch(
          updateProfessorsData({
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

export default useProfessorsData;
