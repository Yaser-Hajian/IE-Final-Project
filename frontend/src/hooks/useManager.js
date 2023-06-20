/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getManager from "../utils/dashboard/getManager";
import { updateManagerData } from "../redux/manager";

const useManagerData = (managerId, type) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { isDataLoadedBefore } = useSelector((s) => s.manager);
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
        console.log(isDataLoadedBefore, type);
        const managerData = await getManager(managerId);
        if (managerData.error) {
          setIsError(true);
        }

        const apiCallData = { ...managerData.data };
        dispatch(
          updateManagerData({
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

export default useManagerData;
