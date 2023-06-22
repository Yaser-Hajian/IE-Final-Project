const getLastObservedTerms = () => {
  try {
    return JSON.parse(localStorage.getItem("lastSeen")).terms ?? [];
  } catch (err) {
    return [];
  }
};

export default getLastObservedTerms;
