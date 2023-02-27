export const date2text = (dateString) => {
  // for instance: "2022-12-22"
  const dateArray = dateString.split("-");
  return `${dateArray[2]} ${month2text[dateArray[1]]} ${dateArray[0]}`;
};

const month2text = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Okt",
  11: "Nov",
  12: "Des",
};
