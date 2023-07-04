import getCurrTheme from "../functions/getCurrTheme";
// do need to do this beacuse p5 sound doesnt like SSR.
// Will only import `react-p5` on client-side
import dynamic from "next/dynamic";
const Sketch = dynamic(
  () =>
    import("react-p5").then((mod) => {
      // importing sound lib only after react-p5 is loaded
      require("p5/lib/addons/p5.sound");
      // returning react-p5 default export
      return mod.default;
    }),
  {
    ssr: false,
  }
);

let data; // table with the raw data
let data_size = 20; // the number of rows in our data table we want to use
let data_cleaned; // array of a table column to use for the dots
let data_cleaned_1; // array of a table column we use for the frequency of our sine
let data_cleaned_2; // array of a table column to display in the console when a user hits a dot.
let data_cleaned_3; // array of a table column to display in the console when a user hits a dot.

let cnv, cnvWidth, cnvHeight;

let y_factor; // scale Y to fit canvas
let x_factor; // scale X to fit canvas
let point_size = 15; // the size of the point

let data_coords = {}; // an object table used to store the x and y of every data dot
let match_coords = []; // store the current x and y of the user mouse click
let match_owner = "click the dots!"; // store the current owner of the match

let sine; // our sine wave oscillator
let env; // our envelope so we can play the sine as a note
let LFO; // our LFO that we use to control the amplitude of the sine
let offsetFrequency = 300;

let audioState;

const P5SonifyPlotAmpMod = (props) => {
  const { currTheme } = getCurrTheme();

  const setup = (p5, canvasParentRef) => {
    audioState = p5.getAudioContext();

    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    cnvWidth = canvasParentRef.offsetWidth * 0.99;
    cnvHeight = canvasParentRef.offsetWidth * 0.4;
    cnv = p5.createCanvas(cnvWidth, cnvHeight).parent(canvasParentRef);

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
    //////////////////////////////////////

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
        p5.stroke(0, 0, 255);
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

    // create an lfo
    LFO = new window.p5.Oscillator("sawtooth");
    LFO.disconnect(); // disconnect the LFO from the master output
    LFO.freq(0);
    LFO.amp(0);
    LFO.start();

    // set is up so that the LFO controls the amplitude of the sine wave oscillator.
    sine.amp(LFO);

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
    const { sine_freq, lfo_freq } =
      data_coords[match_coords[0]][match_coords[1]];
    sine.freq(sine_freq);
    LFO.freq(lfo_freq);

    env.play(sine);
    env.play(LFO);
  };

  const isMatch = (mouseX, mouseY, object_table) => {
    // this is our simple matching algorithm, testing whether a mouse click (mouseX
    // and mouseY) matches any of the dots on the canvas (object_table).

    // we take mouse values and add and subtract the point_size to increase "hit target".
    let mouseX_filtered = mouseX - point_size;
    let mouseY_filtered = mouseY - point_size;
    let match = false;
    let coords = [];

    // First, check the object_table for matches along the x-axis with all the
    // x-values in our increased "hit target". If no x-matches, we simply return.
    for (let x = 0; x < point_size * 2; x++) {
      if (object_table[mouseX_filtered + x]) {
        let correctX = mouseX_filtered + x;

        // Seoncond, if we find an x-match, check the object_table for matches
        // along the y-axis with all the y-values in our increased "hit target".
        // If no x-matches, we return.
        for (let y = 0; y < point_size * 2; y++) {
          if (object_table[correctX][mouseY_filtered + y]) {
            let correctY = mouseY_filtered + y;
            match = true;
            coords = [correctX, correctY];

            // return a boolean representing if there is a hit or not, and
            // the coordates of the hit.
            return { match, coords };
          }
        }
      }
    }
    return { match, coords };
  };

  const storeDataCoords = () => {
    // Here we store every x and y coord of our data into an object table, a nested structure.
    // later, in the isMatch function, we will use this nested object to quickly identify dots
    // in the canvas.

    // We also assign a frequency to every dot in this structure.

    for (let i = 1; i < data_cleaned.length; i++) {
      let { x, y } = getXandYFromIndex(i);
      data_coords[x] = {};
      data_coords[x][y] = {};
      data_coords[x][y] = {
        sine_freq: data_cleaned_1[i],
        owner: data_cleaned_2[i],
        lfo_freq: data_cleaned_3[i],
      };
    }
  };

  const loadData = () => {
    data_cleaned = data.getColumn("Acidity");
    data_cleaned = data_cleaned.slice(0, data_size);

    // add another column to use for the freq of our sine.
    data_cleaned_1 = data.getColumn("altitude_mean_meters");
    data_cleaned_1 = data_cleaned_1.slice(0, data_size);
    // clean the data a little. If altitude is 0, the freq should be 100.
    data_cleaned_1 = data_cleaned_1.map(
      (number) => Number(number) + offsetFrequency
    );

    // owner nam to display in below.
    data_cleaned_2 = data.getColumn("Owner.1");
    data_cleaned_2 = data_cleaned_2.slice(0, data_size);

    // add another column to use for the freq of our LFO.
    data_cleaned_3 = data.getColumn("Number.of.Bags");
    data_cleaned_3 = data_cleaned_3.slice(0, data_size);
    // clean the data a little. Convert to numbers from string
    data_cleaned_3 = data_cleaned_3.map((string) => Number(string));
  };

  const getXandYFromIndex = (i) => {
    let x = Math.floor(x_factor * i);
    // we do "height - y" so that the high values appear higher up in the canvas
    let y = Math.floor(cnvHeight - data_cleaned[i] * y_factor);
    return { x, y };
  };

  const setXandYfactor = () => {
    // we scale the Y to 10 because the acidity values are all usually between 0 and 10.
    y_factor = cnvHeight / 10;
    x_factor = cnvWidth / data_cleaned.length;
  };

  const preload = (p5) => {
    data = p5.loadTable("/data/arabica_data_cleaned_year.csv", "header");
  };

  return (
    <div>
      <Sketch preload={preload} setup={setup} draw={draw} />
    </div>
  );
};

export default P5SonifyPlotAmpMod;
