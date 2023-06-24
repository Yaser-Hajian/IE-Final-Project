const getDayName = (dayNum) => {
  switch (dayNum) {
    case 0:
      return "شنبه";
    case 1:
      return "یک شنبه";
    case 2:
      return "دو شنبه";
    case 3:
      return "سه شنبه";
    case 4:
      return "چهار شنبه";
    case 5:
      return "پنج شنبه";
    case 6:
      return "جمعه";
  }
};

export default getDayName;
