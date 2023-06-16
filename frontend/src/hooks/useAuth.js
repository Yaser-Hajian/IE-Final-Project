const useAuth = () => {
  const isAuthenticate = localStorage.getItem("token");
  console.log(isAuthenticate);
  return isAuthenticate != null;
};

export { useAuth };
