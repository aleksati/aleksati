// convert one number into a clock value with hh:mm:ss:
// use in AudioPlayer
const getClockValue = value => {
  let seconds = Math.floor(value % 60);
  let minutes = Math.floor(value / 60) % 60;

  seconds = seconds < 10 ? "0" + seconds : seconds;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return minutes + ":" + seconds;
};

export default getClockValue;
