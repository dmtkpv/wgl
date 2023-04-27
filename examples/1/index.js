import { Program } from '@dmtkpv/wgl'
import { Grid2D, Square2D, SquareUV } from '@dmtkpv/wgl/geometries'
import { createTexture } from '@dmtkpv/wgl/utils'
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
// Attributes
// ---------------

grid.attr('pos', new Grid2D(GRID_SIZE, GRID_CELL, GRID_SIZE / 4), 2);
text.attr('pos', new Square2D(HOLE_SIZE), 2);
text.attr('tex', new SquareUV(1), 2);




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
// Render
// ---------------

function render () {
    grid.draw(gl.LINE_STRIP);
    text.draw(gl.TRIANGLES);
    requestAnimationFrame(render);
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


