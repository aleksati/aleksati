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

// Create a dot space that visualizes, compares and sonifes the body and
// balance of different coffee dispaches over the years. Uses an object oriented
// method to create dots from differ coffee owners/companies.

let cnvWidth, cnvHeight;
let scaleFactor;

let data;
let owners;
let data_x;
let data_y;
let data_x_y_min;
let data_x_y_max;

let data_size = 200;

let slider_data;
let slider_data_val;
let slider_freq;
let slider_freq_val;

// More owner-specifc data graphing and sonification over time.
// look at relationships between data and clustering
let owner_1 = "Eiopia Commodity Exchange";
let owner_2 = "Kona Pacific Farmers Cooperative";
let owner_3 = "Exportadora de Cafe Condor S.A";

let curr_owner;
let curr_pos;

let orb_1;
let orb_2;
let orb_3;

let orb_size = 20;

let audioState;

export default function P5SonicOrbs(props) {
  const { currTheme } = getCurrTheme();

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    cnvWidth = canvasParentRef.offsetWidth * 0.99;
    cnvHeight = canvasParentRef.offsetWidth * 0.4;

    p5.createCanvas(cnvWidth, cnvHeight).parent(canvasParentRef);
    audioState = p5.getAudioContext();
    audioState.suspend();

    loadData();
    scaleFactor = setScaleFactor();
    data_x = scaleAxis(data_x, cnvWidth);
    data_y = scaleAxis(data_y, cnvHeight);
    loadSlider(p5, canvasParentRef);
    loadOrbs();
  };

  const draw = (p5) => {
    p5.background(currTheme === "light" ? [250, 250, 250] : [20, 20, 20]);
    drawText(p5);

    slider_data_val = slider_data.value();
    slider_freq_val = slider_freq.value() / 100;
    if (slider_data_val === 0) return stopOrbs();

    audioState.state !== "running" ? audioState.resume() : null;

    drawOrbs(p5);
  };

  const drawText = (p5) => {
    p5.noStroke();
    p5.textSize(14);
    p5.fill(currTheme === "light" ? [0, 0, 0] : [255, 255, 255]);

    p5.textAlign("CENTER");
    p5.text("Body (x)", cnvWidth / 2 - 20, 15);

    p5.textAlign("LEFT");
    p5.text("Balance (y)", 10, cnvHeight / 2);

    p5.textSize(10);
    p5.textAlign("LEFT");
    p5.text(
      "Year: " +
        data.getColumn("Year").slice(0, data_size + 1)[slider_data_val],
      5,
      cnvHeight - 25
    );

    p5.textAlign("LEFT");
    p5.text("Data index: " + slider_data_val, 5, cnvHeight - 5);

    p5.textAlign("LEFT");
    p5.text("Carrier frequency factor: " + slider_freq_val, 130, cnvHeight - 5);
  };

  const drawOrbs = (p5) => {
    curr_owner = owners[slider_data_val];
    curr_pos = [data_x[slider_data_val], data_y[slider_data_val]];

    if (curr_owner === orb_1.owner) orb_1.updatePos(p5, curr_pos);
    if (curr_owner === orb_2.owner) orb_2.updatePos(p5, curr_pos);
    if (curr_owner === orb_3.owner) orb_3.updatePos(p5, curr_pos);

    orb_1.drawOrb(p5);
    orb_1.makeSound(slider_freq_val);

    orb_2.drawOrb(p5);
    orb_2.makeSound(slider_freq_val);

    orb_3.drawOrb(p5);
    orb_3.makeSound(slider_freq_val);
  };

  const stopOrbs = () => {
    orb_1.stopOrb();
    orb_2.stopOrb();
    orb_3.stopOrb();
  };

  const loadOrbs = () => {
    orb_1 = new Orb(owner_1, orb_size, [255, 0, 0]);
    orb_2 = new Orb(owner_2, orb_size, [0, 255, 0]);
    orb_3 = new Orb(owner_3, orb_size, [0, 0, 255]);
  };

  const loadSlider = (p5, canvasParentRef) => {
    // min, max, value
    slider_data = p5.createSlider(0, data_size, 0).parent(canvasParentRef);
    slider_freq = p5.createSlider(0, 1000, 500).parent(canvasParentRef);
  };

  const scaleAxis = (data_array, target_range) => {
    // scales all numbers within a list to a target_range (int)
    return data_array.map((item) => {
      let item_zero = parseFloat(item) - data_x_y_min;
      let item_factor = Math.floor(scaleFactor * item_zero);
      let item_scaled = (target_range / 100) * item_factor;
      return item_scaled;
    });
  };

  const setScaleFactor = () => {
    return 100 / (data_x_y_max - data_x_y_min);
  };

  const loadData = () => {
    data_x = data.getColumn("Body").slice(0, data_size);
    data_y = data.getColumn("Balance").slice(0, data_size);

    data_x_y_min = 6;
    data_x_y_max = 9;

    owners = data.getColumn("Owner.1").slice(0, data_size);
  };

  const preload = (p5) => {
    // asynchronous data loading
    data = p5.loadTable("/data/arabica_data_cleaned_year.csv", "header");
  };

  return (
    <div>
      <Sketch preload={preload} setup={setup} draw={draw} />
    </div>
  );
}

// my dot class
// the sound of the dot is defined by the X and Y position of the Dot
class Orb {
  constructor(owner, point_size, rgbColor = []) {
    this.pointSize = point_size;
    this.currPos = [0, 0];
    this.color = rgbColor;
    this.owner = owner;

    this.sine;
    this.amp = 0.4;
    this.LFO;
    this.env;

    this.initSound();
  }

  makeSound(slider_freq_val) {
    this.sine.freq(this.currPos[1] * slider_freq_val);
    this.sine.amp(this.amp);
    this.LFO.freq(this.currPos[0] * slider_freq_val);
    this.LFO.amp(this.amp);

    // this.env.play(this.sine);
    // this.env.play(this.LFO);
  }

  initSound() {
    this.sine = new p5.Oscillator("sine");
    this.sine.freq(0);
    this.sine.start();

    this.LFO = new p5.Oscillator("sine");
    this.LFO.freq(0);
    this.LFO.disconnect();
    this.LFO.start();

    this.sine.amp(this.LFO);

    // this.env = new p5.Env();
    // this.env.setADSR(0.01, 0.1, 0.5, 0.7);
  }

  stopOrb() {
    this.sine.amp(0);
    this.LFO.amp(0);
    this.currPos = [0, 0];
  }

  drawOrb(p5) {
    p5.stroke(this.color);
    p5.strokeWeight(this.pointSize);
    p5.point(...this.currPos);
  }

  updatePos(p5, newPos) {
    if (JSON.stringify(newPos) == JSON.stringify(this.currPos)) return;
    // this.interpolate(p5, this.currPos, newPos);
    this.currPos = newPos;
  }

  // simple interpolation algorithm for dot movement
  interpolate(p5, prevPos, newPos) {
    let intX = [];
    let intY = [];

    // x
    for (let i = 0; i < Math.abs(prevPos[0] - newPos[0]); i++) {
      if (newPos[0] > prevPos[0]) {
        intX.push(prevPos[0] + i);
      } else if (newPos[0] < prevPos[0]) {
        intX.push(prevPos[0] - i);
      }
    }

    // y
    for (let i = 0; i < Math.abs(prevPos[1] - newPos[1]); i++) {
      if (newPos[1] > prevPos[1]) {
        intY.push(prevPos[1] + i);
      } else if (newPos[1] < prevPos[1]) {
        intY.push(prevPos[1] - i);
      }
    }

    if (!intX.length) intX.push(prevPos[0]);
    if (!intY.length) intY.push(prevPos[1]);

    let longest_range;
    let shortest_range;
    let longest_range_axis;

    // take the longest "route" as the default
    if (intX.length > intY.length) {
      longest_range = intX.length;
      shortest_range = intY.length;
      longest_range_axis = "x";
    } else {
      longest_range = intY.length;
      shortest_range = intX.length;
      longest_range_axis = "y";
    }

    for (let i = 0; i < longest_range; i++) {
      // longest route is from 0 to steps.
      // but the shortest route needs to be equally "long".
      // I covert the i in longest_range range to the shortest_range range.
      // i use "short i" to index the shortest axis.
      let short_i = Math.floor((i / longest_range) * shortest_range);

      // draw the interpolation with varying indexes
      p5.stroke(this.color);
      p5.strokeWeight(this.pointSize);
      p5.point(
        intX[longest_range_axis === "x" ? i : short_i],
        intY[longest_range_axis === "y" ? i : short_i]
      );
    }
  }
}
