// import p5Types from "p5";

export const finaltest: P5jsSketch = (p5, ref) => {
  let x: number = 50;
  let speed: number = 5;
  let sine: any;
  let audioState: any;

  p5.setup = () => {
    let cnv = p5.createCanvas(500, 400).parent(ref.current);
    audioState = p5.getAudioContext();
    audioState.suspend();
    cnv.mouseClicked(() => {
      audioState.state !== "running" ? audioState.resume() : null;
    });

    sine = new p5.constructor.Oscillator("sine");
    sine.freq(440);
    sine.start();
  };

  p5.draw = () => {
    // If we're travelling towards the right or left
    if (speed > 0) {
      // If the ball has reached the end of the container or not
      if (x + 50 < p5.width) {
        x += speed;
      } else {
        speed = -speed;
      }
    } else {
      if (x - 50 > 0) {
        x += speed;
      } else {
        speed = -speed;
      }
    }
    p5.background(255, 120, 20);
    p5.ellipse(x, 100, 100);
  };
};
