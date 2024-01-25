// import { NAV_TABS } from "../config";

export const date2text = (dateString: string): string => {
  // if (type + "s" === NAV_TABS["works"]) return dateString;

  // for instance: "2022-12-22"
  const dateArray: string[] = dateString?.split("-");
  return `${dateArray[2]} ${month2text[dateArray[1]]} ${dateArray[0]}`;
};

const month2text: Record<string, string> = {
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
