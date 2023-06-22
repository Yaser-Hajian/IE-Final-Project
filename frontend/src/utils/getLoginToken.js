const getLoginToken = () => {
  const isExist = JSON.parse(localStorage.getItem("token"));
  if (isExist != null) {
    return isExist.hash;
  }
  return null;
};
export default getLoginToken;
