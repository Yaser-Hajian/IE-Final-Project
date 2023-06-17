const useAuth = () => {
  const isAuthenticate = localStorage.getItem("token");
  return isAuthenticate != null;
};

export { useAuth };
