const msToTime = (ms) => {
  const options = { hour: "numeric", minute: "numeric", hour12: false };
  const formattedTime = new Intl.DateTimeFormat("fa-IR", options).format(ms);
  return ` ${formattedTime} `;
};

export default msToTime;
