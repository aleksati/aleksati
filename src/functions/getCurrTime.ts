export const getCurrTime = (): string => {
  // Used for comment section primarily (togethe with getCurrDate)
  // returns strng string in format "HH-MM"
  // UTC+1

  let dateObj: Date = new Date();

  let hours: string = String(dateObj.getUTCHours() + 1);

  let minutes: string = String(dateObj.getUTCMinutes());
  minutes = Number(minutes) < 10 ? "0" + minutes : minutes;

  // let seconds: string = String(dateObj.getUTCSeconds());
  // seconds = Number(seconds) < 10 ? "0" + seconds : seconds;

  return `${hours}:${minutes}`;
};