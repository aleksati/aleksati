// convert one number into a clock value with hh:mm:ss:
// use in AudioPlayer
const getClockValue = (value: string): string => {
  let seconds: number = Math.floor(Number(value) % 60);
  let minutes: number = Math.floor(Number(value) / 60) % 60;

  let clockSec: string = seconds < 10 ? "0" + seconds : seconds + "";
  let clockMin: string = minutes < 10 ? "0" + minutes : minutes + "";

  return clockMin + ":" + clockSec;
};

export default getClockValue;
