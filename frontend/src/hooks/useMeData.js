import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getMe from "../utils/dashboard/getMe";
import getLoginToken from "../utils/getLoginToken";
import { updateMeData } from "../redux/me";

const useMeData = () => {
  const { isDataLoadedBefore } = useSelector((s) => s.me);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const token = getLoginToken();
    const fetchData = async () => {
      const loggedUserData = await getMe(token);
      if (loggedUserData.error) {
        setIsError(true);
      }

      dispatch(
        updateMeData({
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

export default useMeData;
