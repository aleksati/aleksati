
let data; // table with the raw data
let data_size = 20; // the number of rows in our data table we want to use
let data_cleaned; // array of a table column to use for the dots
let data_cleaned_1; // array of a table column we use for the frequency of our sine
let data_cleaned_2; // array of a table column to display in the console when a user hits a dot.

let cnv, cnvWidth, cnvHeight;

let y_factor; // scale Y to fit canvas
let x_factor; // scale X to fit canvas
let point_size = 15; // the size of the point

let data_coords = {}; // an object table used to store the x and y of every data dot
let match_coords = []; // store the current x and y of the user mouse click
let match_owner = "click the dots!"; // store the current owner of the match

let sine; // our sine wave oscillator
let env; // our envelope so we can play the sine as a note
let offsetFrequency = 300;

let audioState;

export const sonifiedPlot: P5jsSketch = (p5, ref) => {
//   const { currTheme } = getCurrTheme();

  p5.setup = () => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    cnvWidth = canvasParentRef.offsetWidth * 0.99;
    cnvHeight = canvasParentRef.offsetWidth * 0.4;

    cnv = p5.createCanvas(cnvWidth, cnvHeight).parent(canvasParentRef);
    audioState = p5.getAudioContext();
    audioState.suspend();
    cnv.mouseClicked((e) => {
      audioState.state !== "running" ? audioState.resume() : null;

      let x = Math.floor(p5.mouseX);
      let y = Math.floor(p5.mouseY);

      // if the user clicks a dot, we update the match_coords variable.
      const { match, coords } = isMatch(x, y, data_coords);
      if (match) {
        console.log("You hit a dot at", "x:", coords[0], "y:", coords[1]);
        match_coords = coords;

        const { owner } = data_coords[match_coords[0]][match_coords[1]];
        match_owner = owner;

        playAudio();
      } else {
        match_coords = [];
      }
    });

    loadData();
    setXandYfactor();
    storeDataCoords();
    loadAudio(0.5, true);
  };

  const draw = (p5) => {
    p5.background(currTheme === "light" ? [250, 250, 250] : [20, 20, 20]);
    p5.strokeWeight(point_size);
    drawText(p5);
    drawDots(p5);
  };

  const drawText = (p5) => {
    p5.noStroke();
    p5.textSize(20);
    p5.fill(currTheme === "light" ? [0, 0, 0] : [255, 255, 255]);
    p5.text(match_owner, 40, cnvHeight - 20);
    p5.textAlign("CENTER");
  };

  const drawDots = (p5) => {
    // if the user has clicked a dot, we color the dot a different color
    for (let i = 1; i < data_cleaned.length; i++) {
      let { x, y } = getXandYFromIndex(i);
      if (x == match_coords[0] && y == match_coords[1]) {
        p5.stroke(0, 255, 0);
      } else {
        p5.stroke(255, 0, 0);
      }
      p5.point(x, y);
    }
  };

  const loadAudio = (sine_amp) => {
    // create an oscillator
    sine = new window.p5.Oscillator("sine");
    sine.amp(sine_amp);
    sine.freq(0);
    sine.start();

    // The envolope is used to make the sine play as a note
    // set attackTime, decayTime, sustainRatio, releaseTime
    env = new window.p5.Envelope();
    env.setADSR(0.01, 0.1, 0.7, 0.7);
  };

  const playAudio = () => {
    // when this function is called, we know there is a match. Therefore, we can
    // get the frequency from my data_coords nested structure with the match_coords
    // variable.

    // Then, we can set the sine frequency with this value, and use the env to play the note
    const { sine_freq } = data_coords[match_coords[0]][match_coords[1]];
    sine.freq(sine_freq);
    env.play(sine);
  };
