import getLoginToken from "./getLoginToken";

const generateHeaders = () => {
  const loginToken = getLoginToken();
  return {
    Authorization: loginToken,
  };
};

export default generateHeaders;
