const useUserType = () => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    return token.type.toLowerCase();
  } catch (err) {
    return false;
  }
};

export { useUserType };
