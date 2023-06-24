const formatTime = (isoStringTime) => {
  const date = new Date(isoStringTime);
  return ` ${date.getHours()}:${date.getMinutes()} `;
};
export default formatTime;
