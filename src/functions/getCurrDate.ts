export const getCurrDate = (): string => {
  // Used for post primarily, but also with comment section
  // returns current date in string format "YYYY-MM-DD"

  let dateObj: Date = new Date();

  let year: string = String(dateObj.getUTCFullYear());

  let month: string = String(dateObj.getUTCMonth() + 1); // get month 1-12
  month = Number(month) < 10 ? "0" + month : month;

  let day: string = String(dateObj.getUTCDate());
  day = Number(day) < 10 ? "0" + day : day;

  return `${year}-${month}-${day}`;
};