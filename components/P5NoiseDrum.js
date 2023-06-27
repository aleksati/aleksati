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

const P5NoiseDrum = (props) => {
  let noise, env, cnv, analyzer, cnvWidth, cnvHeight, audioState;

  const setup = (p5, canvasParentRef) => {
    audioState = p5.getAudioContext();

    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    cnvWidth = canvasParentRef.offsetWidth * 0.99;
    cnvHeight = canvasParentRef.offsetWidth * 0.66;
    cnv = p5.createCanvas(cnvWidth, cnvHeight).parent(canvasParentRef);
    //////////////////////////////////////

    cnv.mouseClicked((event) => {
      audioState.state !== "running" ? audioState.resume() : null;
      env.play(noise);
    });

    noise = new window.p5.Noise(); // other types include 'brown' and 'pink'
    noise.start();

    // multiply noise volume by 0
    // (keep it quiet until we're ready to make noise!)
    noise.amp(0);

    env = new window.p5.Env();
    // set attackTime, decayTime, sustainRatio, releaseTime
    env.setADSR(0.001, 0.1, 0.2, 0.1);
    // set attackLevel, releaseLevel
    env.setRange(1, 0);

    // p5.Amplitude will analyze all sound in the sketch
    // unless the setInput() method is used to specify an input.
    analyzer = new window.p5.Amplitude();
  };

  const draw = (p5) => {
    p5.background("white");

    // get volume reading from the p5.Amplitude analyzer
    let level = analyzer.getLevel();

    // use level to draw a green rectangle
    let levelHeight = p5.map(level, 0, 0.4, 0, cnvHeight);
    p5.fill(100, 250, 100);
    p5.rect(0, cnvHeight, cnvWidth, -levelHeight);
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default P5NoiseDrum;
