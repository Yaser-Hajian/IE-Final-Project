const msToDate = (ms) => {
  const isNumber = typeof ms == "number";
  return Intl.DateTimeFormat("fa-IR").format(isNumber ? ms : Number(ms));
};

export default msToDate;
