const useAuth = () => {
  const isAuthenticate = JSON.parse(localStorage.getItem("token"));
  return isAuthenticate != null && isAuthenticate.token != null;
};

export { useAuth };
