import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getTerms from "../utils/dashboard/getTerms";
import { updateTermsData } from "../redux/terms";

const useTermsData = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { isDataLoadedBefore } = useSelector((s) => s.terms);
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const termsData = await getTerms();
        if (termsData.error) {
          setIsError(true);
        }

        const apiCallData = { ...termsData.data };
        dispatch(updateTermsData({ ...apiCallData, isDataLoadedBefore: true }));
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
      }
    }
    fetchData();
  }, [dispatch, isDataLoadedBefore]);

  return { isLoading, isError };
};

export default useTermsData;
