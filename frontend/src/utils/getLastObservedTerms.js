const getLastObservedTerms = () => {
  try {
    return JSON.parse(localStorage.getItem("lastObservedTerms")) ?? [];
  } catch (err) {
    return [];
  }
};

export default getLastObservedTerms;
