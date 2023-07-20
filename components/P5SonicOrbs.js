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

let cnvWidth;
let cnvHeight;
let scaleFactor;

let data;
let owners;
let data_x;
let data_y;
let data_x_y_min;
let data_x_y_max;

let data_size = 200;
let dot_size = 40;

let slider;
let slider_val;

// More owner-specifc data graphing and sonification over time.
// look at relationships between data and clustering
let owner_1 = "Eiopia Commodity Exchange";
let owner_2 = "Kona Pacific Farmers Cooperative";
let owner_3 = "Exportadora de Cafe Condor S.A";

let curr_owner;
let curr_pos;

let dot_1;
let dot_2;
let dot_3;

let audioState;

const P5SonicOrbs = (props) => {
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
    loadDots();
  };

  const draw = (p5) => {
    p5.background(currTheme === "light" ? [250, 250, 250] : [20, 20, 20]);
    slider_val = slider.value();
    handleAudioContext(slider_val);
    drawText(p5);
    drawDots(p5);
  };

  const handleAudioContext = (slider_val) => {
    return slider_val > 0
      ? audioState.state !== "running"
        ? audioState.resume()
        : null
      : audioState.state === "running"
      ? audioState.suspend()
      : null;
  };

  const drawText = (p5) => {
    p5.noStroke();
    p5.textSize(12);
    p5.fill(currTheme === "light" ? [0, 0, 0] : [255, 255, 255]);

    p5.textAlign("CENTER");
    p5.text("Body", cnvWidth / 2, cnvHeight - 10);

    p5.textAlign("LEFT");
    p5.text("Balance", 10, cnvHeight / 2);

    p5.textAlign("LEFT");
    p5.text(
      "Year: " + data.getColumn("Year").slice(0, data_size + 1)[slider_val],
      10,
      cnvHeight - 25
    );

    p5.textSize(8);
    p5.textAlign("LEFT");
    p5.text("Data index: " + slider_val, 10, cnvHeight - 5);
  };

  const drawDots = (p5) => {
    curr_owner = owners[slider_val];
    curr_pos = [data_x[slider_val], data_y[slider_val]];

    if (curr_owner === dot_1.owner) dot_1.updatePos(p5, curr_pos);
    if (curr_owner === dot_2.owner) dot_2.updatePos(p5, curr_pos);
    if (curr_owner === dot_3.owner) dot_3.updatePos(p5, curr_pos);

    dot_1.drawDot(p5);
    dot_2.drawDot(p5);
    dot_3.drawDot(p5);
  };

  const loadSlider = (p5, canvasParentRef) => {
    // min, max, value
    slider = p5.createSlider(0, data_size, 0).parent(canvasParentRef);
    // slider.style("width", "100px");
  };

  const loadDots = () => {
    dot_1 = new Dot(owner_1, dot_size, [255, 0, 0]);
    dot_2 = new Dot(owner_2, dot_size, [0, 255, 0]);
    dot_3 = new Dot(owner_3, dot_size, [0, 0, 255]);
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
};

export default P5SonicOrbs;

// my dot class
class Dot {
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

  makeSound() {
    this.sine.freq(this.currPos[1] + 100);
    this.LFO.freq(this.currPos[0] / 100);

    // this.env.play(this.sine);
    // this.env.play(this.LFO);
  }

  initSound() {
    this.sine = new p5.Oscillator("sine");
    this.sine.freq(0);
    this.sine.amp(this.amp);
    this.sine.start();

    this.LFO = new p5.Oscillator("sine");
    this.LFO.amp(this.amp);
    this.LFO.freq(0);
    this.LFO.disconnect();
    this.LFO.start();

    this.sine.amp(this.LFO);

    // this.env = new p5.Env();
    // this.env.setADSR(0.01, 0.1, 0.5, 0.7);
  }

  drawDot(p5) {
    p5.stroke(this.color);
    p5.strokeWeight(this.pointSize);
    p5.point(...this.currPos);

    this.makeSound();
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
