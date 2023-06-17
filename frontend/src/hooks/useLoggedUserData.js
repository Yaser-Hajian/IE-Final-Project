import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getLoggedUserData from "../utils/dashboard/getLoggedUserData";
import getLoginToken from "../utils/getLoginToken";
import { updateLoggedUserData } from "../redux/loggedUser";

const useLoggedUserInfo = () => {
  const { isDataLoadedBefore } = useSelector((s) => s.loggedUser);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const token = getLoginToken();
    const fetchData = async () => {
      const loggedUserData = await getLoggedUserData(token);
      if (loggedUserData.error) {
        setIsError(true);
      }

      dispatch(
        updateLoggedUserData({
          ...loggedUserData.data,
          isDataLoadedBefore: true,
        })
      );

      setIsLoading(false);
    };
    fetchData();
  }, [dispatch, isDataLoadedBefore]);

  if (isDataLoadedBefore) return { isLoading: false, isError: false };
  return { isLoading, isError };
};

export default useLoggedUserInfo;
