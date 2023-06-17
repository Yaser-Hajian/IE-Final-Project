const getLoginToken = () => {
  return JSON.parse(localStorage.getItem("token")).hash;
};
export default getLoginToken;
