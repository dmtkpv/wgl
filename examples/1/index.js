import { Program, createGridPoints, createSquarePoints, createTexture } from '../../src'
import gridVert from './grid.vert?raw'
import gridFrag from './grid.frag?raw'
import textVert from './text.vert?raw'
import textFrag from './text.frag?raw'



// ---------------
// Constants
// ---------------

const GRID_SIZE = 1920;
const GRID_CELL = 32;
const HOLE_SIZE = 512;



// ---------------
// Common
// ---------------

const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl');
const grid = new Program(gl, gridVert, gridFrag);
const text = new Program(gl, textVert, textFrag);



// ---------------
// Texture
// ---------------

const image = await new Promise(resolve => {
    const image = new Image();
    image.src = './image.png';
    image.onload = () => resolve(image);
})

const texture = createTexture(gl, image);



// ---------------
// Points
// ---------------

const gridPoints = createGridPoints(GRID_SIZE, GRID_CELL);
const textPoints = createSquarePoints(HOLE_SIZE);
const textUv = textPoints.map((coord, i) => .5 + coord / HOLE_SIZE)

grid.attr('pos', gridPoints, 2);
text.attr('pos', textPoints, 2);
text.attr('uv', textUv, 2);



// ---------------
// Render
// ---------------

function render () {
    grid.draw('pos', gl.LINE_STRIP);
    // text.draw('pos', gl.TRIANGLES);
    // requestAnimationFrame(render);
}



// ---------------
// Resize
// ---------------

function resize () {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const sx = 2 / canvas.width;
    const sy = 2 / canvas.height;
    const sg = Math.max(canvas.width / GRID_SIZE, canvas.height / GRID_SIZE, 1);

    grid.uniform('scale', sx * sg, sy * sg);
    text.uniform('scale', sx, sy);
    gl.viewport(0, 0, canvas.width, canvas.height);
}



// ---------------
// Run
// ---------------

window.addEventListener('resize', resize);
resize();
render();


