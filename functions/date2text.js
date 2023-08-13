export const date2text = (dateString, type = "posts") => {
  if (type === "kunst") return dateString;

  // for instance: "2022-12-22"
  const dateArray = dateString.split("-");
  return `${dateArray[2]} ${month2text[dateArray[1]]} ${dateArray[0]}`;
};

const month2text = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  10: "Okt",
  11: "Nov",
  12: "Des",
};
