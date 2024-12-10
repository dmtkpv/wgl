# @dmtkpv/wgl
A tiny WebGL library

## Installation
```shell
npm i @dmtkpv/wgl
```

## Usage

Create vertex shader
```glsl
attribute vec2 a_position;
uniform float u_scale;

void main() {
    gl_Position = vec4(a_position * u_scale, 0, 1);
}
```

Create fragment shader
```glsl
precision mediump float;

void main() {
    gl_FragColor = vec4(0,0,0,1);
}
```

Create program
```js
import { Program } from '@dmtkpv/wgl'
import vert from './shader.vert?raw'
import frag from './shader.frag?raw'

const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl');
const prog = new Program(gl, vert, frag);

// pass vertices
prog.attr('position', [-1, 1, -1, -1, 1, -1], 2);

// pass uniforms
prog.uniform('scale', 0.5);

// draw
prog.draw(gl.TRIANGLES);
```