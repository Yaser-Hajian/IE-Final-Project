const msToDate = (ms) => {
  return Intl.DateTimeFormat("fa-IR").format(ms);
};

export default msToDate;
