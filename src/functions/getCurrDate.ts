export const getCurrDate = (): string => {
  // get current date in format string "YYYY-MM-DD"
  let dateObj: Date = new Date();

  let month: string = String(dateObj.getUTCMonth() + 1); // get month 1-12
  month = Number(month) < 10 ? "0" + month : month;

  let day: string = String(dateObj.getUTCDate());
  day = Number(day) < 10 ? "0" + day : day;

  let year: string = String(dateObj.getUTCFullYear());

  return `${year}-${month}-${day}`;
};
