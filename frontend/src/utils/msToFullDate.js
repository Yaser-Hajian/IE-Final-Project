const msToFullDate = (ms) => {
  const options = { hour: "numeric", minute: "numeric", hour12: false };
  const formattedTime = new Intl.DateTimeFormat("fa-IR", options).format(ms);
  const formattedDate = new Intl.DateTimeFormat("fa-IR").format(ms);
  return `${formattedDate} - ${formattedTime}`;
};

export default msToFullDate;
