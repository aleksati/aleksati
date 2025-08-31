let parentStyle: CSSStyleDeclaration;
let canvasWidth: number;
let canvasHeight: number;
let cnv: any;

// vertex shader code as a string
let vertexShader: string = `
precision highp float;

attribute vec3 aPosition;
attribute vec2 aTexCoord;
attribute vec4 aVertexColor;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying vec2 vTexCoord;

void main() {
  // Apply the camera transform
  vec4 viewModelPosition =
    uModelViewMatrix *
    vec4(aPosition, 1.0);

  // Tell WebGL where the vertex goes
  gl_Position =
    uProjectionMatrix *
    viewModelPosition;  

  // Pass along data to the fragment shader
  vTexCoord = aTexCoord;
}
 `;

// fragment shader code as a string
let fragmentShader: string = `
// casey conchinha - @kcconch ( https://github.com/kcconch )
// louise lessel - @louiselessel ( https://github.com/louiselessel )
// more p5.js + shader examples: https://itp-xstory.github.io/p5js-shaders/
// rotate/tile functions from example by patricio gonzalez vivo
// @patriciogv ( patriciogonzalezvivo.com )

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;
varying vec2 vTexCoord;

vec2 rotate2D (vec2 _st, float _angle) {
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

vec2 tile (vec2 _st, float _zoom) {
    _st *= _zoom;
    return fract(_st);
}

vec2 rotateTilePattern(vec2 _st){
    
    //  Scale the coordinate system by 2x2
    _st *= 2.0;
    
    //  Give each cell an index number
    //  according to its position
    float index = 0.0;
    index += step(1., mod(_st.x,2.0));
    index += step(1., mod(_st.y,2.0))*2.0;
    
    //      |
    //  2   |   3
    //      |
    //--------------
    //      |
    //  0   |   1
    //      |
    
    // Make each cell between 0.0 - 1.0
    _st = fract(_st);
    
    // Rotate each cell according to the index
    if(index == 1.0){
        //  Rotate cell 1 by 90 degrees
        _st = rotate2D(_st,PI*0.5);
    } else if(index == 2.0){
        //  Rotate cell 2 by -90 degrees
        _st = rotate2D(_st,PI*-0.5);
    } else if(index == 3.0){
        //  Rotate cell 3 by 180 degrees
        _st = rotate2D(_st,PI);
    }
    
    return _st;
}

float concentricCircles(in vec2 st, in vec2 radius, in float res, in float scale) {
    float dist = distance(st,radius);
    float pct = floor(dist*res)/scale;
    return pct;
}

void main (void) {
    vec2 st = vTexCoord;
    vec2 mst = gl_FragCoord.xy/mouse.xy;
    float mdist= distance(vec2(1.0,1.0), mst);
    
    float dist = distance(st,vec2(sin(time/10.0),cos(time/10.0)));
    st = tile(st,10.0);
    
    st = rotate2D(st,dist/(mdist/5.0)*PI*2.0);
    
    gl_FragColor = vec4(vec3(concentricCircles(st, vec2(0.0,0.0), 5.0, 5.0),concentricCircles(st, vec2(0.0,0.0), 10.0, 10.0),concentricCircles(st, vec2(0.0,0.0), 20.0, 10.0)),1.0);
}
`;

// this variable will hold our shader object
let theShader: any;

// this variable will hold our createGraphics layer
//let shaderTexture: any;

let sphereSize: number = 80;

export const sphere: P5jsSketch = (p5, parentRef) => {
  p5.setup = () => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    // const parent = parentRef.current as Element;
    parentStyle = window.getComputedStyle(parentRef);
    canvasWidth = parseInt(parentStyle.width) * 0.35;
    canvasHeight = parseInt(parentStyle.width) * 0.35;
    //////////////////////////////////////

    // shaders require WEBGL mode to work
    cnv = p5
      .createCanvas(canvasWidth, canvasHeight, p5.WEBGL)
      .parent(parentRef);
    //createCanvas(710, 400, WEBGL);

    p5.noStroke();
    p5.angleMode(p5.DEGREES);

    // create a shader object using the vertex shader and fragment shader strings
    theShader = p5.createShader(vertexShader, fragmentShader);

    p5.describe(
      "Sphere broken up into a square grid with a gradient in each grid."
    );
  };

  p5.draw = () => {
    // p5.background("white");

    // send uniform values to the shader
    theShader.setUniform("resolution", [p5.width, p5.height]);
    theShader.setUniform("time", p5.millis() / 1000.0);
    theShader.setUniform("mouse", [
      p5.mouseX,
      p5.map(p5.mouseY, 0, p5.height, p5.height, 0),
    ]);

    p5.shader(theShader);

    // add a sphere using the texture
    p5.translate(0, 0, 0);
    p5.push();
    p5.rotateX(-p5.mouseY);
    p5.rotateY(-p5.mouseX);
    p5.sphere(sphereSize);
    p5.pop();

    // add an ellipse using the texture
    // passing a fifth parameter to ellipse for smooth edges in 3D
    // p5.ellipse(260, 0, 200, 200, 100);
  };
};
