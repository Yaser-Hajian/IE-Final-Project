const getLoginToken = () => {
  const isExist = JSON.parse(localStorage.getItem("token"));
  if (isExist != null) {
    return isExist.token;
  }
  return null;
};
export default getLoginToken;
