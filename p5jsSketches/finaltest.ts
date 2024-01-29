let parentStyle: CSSStyleDeclaration;
let audioState: any;

let canvasWidth: number;
let canvasHeight: number;
let cnv: any;

let data: any;
let data_size: number = 20; // the number of rows in our data table we want to use
let data_cleaned: any; // array of a table column to use for the dots
let data_cleaned_1: any; // array of a table column we use for the frequency of our sine
let data_cleaned_2: any; // array of a table column to display in the console when a user hits a dot.

let y_factor: number; // scale Y to fit canvas
let x_factor: number; // scale X to fit canvas
let point_size: number = 15; // the size of the point

let data_coords: object = {}; // an object table used to store the x and y of every data dot
let match_coords: any = []; // store the current x and y of the user mouse click
let match_owner: string = "click the dots!"; // store the current owner of the match

let sine: any; // our sine wave oscillator
let env: any; // our envelope so we can play the sine as a note
let offsetFrequency: number = 300;

export const finaltest: P5jsSketch = (p5, parentRef): P5jsSketchCleanup => {
  p5.setup = () => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    // const parent = parentRef.current as Element;
    parentStyle = window.getComputedStyle(parentRef);
    canvasWidth = parseInt(parentStyle.width) * 0.99;
    canvasHeight = parseInt(parentStyle.width) * 0.66;
    //////////////////////////////////////

    cnv = p5.createCanvas(canvasWidth, canvasHeight).parent(parentRef);

    // suspend audioContext from the start (standard for modern browsers)
    audioState = p5.getAudioContext();
    audioState.suspend();

    cnv.mouseClicked(() => {
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
    loadAudio(0.5);
  };

  p5.draw = () => {
    p5.background(250, 250, 250);
    p5.strokeWeight(point_size);
    drawText();
    drawDots();
  };

  const drawText = () => {
    p5.noStroke();
    p5.textSize(20);
    p5.fill(0, 0, 0);
    p5.text(match_owner, 40, canvasHeight - 20);
    p5.textAlign("CENTER");
  };

  const drawDots = () => {
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

  const loadAudio = (sine_amp: number) => {
    // create an oscillator
    sine = new p5.constructor.Oscillator("sine");
    sine.amp(sine_amp);
    sine.freq(0);
    sine.start();

    // The envolope is used to make the sine play as a note
    // set attackTime, decayTime, sustainRatio, releaseTime
    env = new p5.constructor.Envelope();
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

  const isMatch = (mouseX: number, mouseY: number, object_table: object) => {
    // this is our simple matching algorithm, testing whether a mouse click (mouseX
    // and mouseY) matches any of the dots on the canvas (object_table).

    // we take mouse values and add and subtract the point_size to increase "hit target".
    let mouseX_filtered: number = mouseX - point_size;
    let mouseY_filtered: number = mouseY - point_size;
    let match: boolean = false;
    let coords: any = [];

    // First, check the object_table for matches along the x-axis with all the
    // x-values in our increased "hit target". If no x-matches, we simply return.
    for (let x = 0; x < point_size * 2; x++) {
      if (object_table[mouseX_filtered + x]) {
        let correctX: number = mouseX_filtered + x;

        // Seoncond, if we find an x-match, check the object_table for matches
        // along the y-axis with all the y-values in our increased "hit target".
        // If no x-matches, we return.
        for (let y = 0; y < point_size * 2; y++) {
          if (object_table[correctX][mouseY_filtered + y]) {
            let correctY: number = mouseY_filtered + y;
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
      (numb: number) => Number(numb) + offsetFrequency
    );

    // owner nam to display in below.
    data_cleaned_2 = data.getColumn("Owner.1");
    data_cleaned_2 = data_cleaned_2.slice(0, data_size);
  };

  const getXandYFromIndex = (i: number) => {
    let x = Math.floor(x_factor * i);
    // we do "height - y" so that the high values appear higher up in the canvas
    let y = Math.floor(canvasHeight - data_cleaned[i] * y_factor);
    return { x, y };
  };

  const setXandYfactor = () => {
    // we scale the Y to 10 because the acidity values are all usually between 0 and 10.
    y_factor = canvasHeight / 10;
    x_factor = canvasWidth / data_cleaned.length;
  };

  p5.preload = () => {
    data = p5.loadTable("/data/arabica_data_cleaned_year.csv", "header");
  };

  return {
    cleanup: p5.remove,
  };
};
