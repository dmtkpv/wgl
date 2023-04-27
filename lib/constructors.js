import { createProgram, getUniforms, getAttribute, createArrayBuffer } from './utils.js'



export function Buffer (data, size) {

}




// ---------------
// Program
// ---------------

export function Program (gl, vert, frag) {

    let length;

    const attrs = {};
    const program = createProgram(gl, vert, frag);
    const uniforms = getUniforms(gl, program);

    function activate () {
        const current = gl.getParameter(gl.CURRENT_PROGRAM);
        if (program !== current) gl.useProgram(program);
    }

    function uniform (name, ...args) {
        activate();
        const method = `uniform${args.length}f`;
        const location = uniforms['u_' + name];
        gl[method](location, ...args);
    }

    function attr (name, data, size) {
        const buffer = createArrayBuffer(gl, data);
        const location = getAttribute(gl, program, 'a_' + name);
        attrs[name] = { buffer, location, data, size }
        length = Math.ceil(data.length / size);
        gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
    }

    function bind (name) {
        const { buffer, location, size } = attrs[name];
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
    }

    function draw (mode, offset = 0, count = length) {
        activate();
        Object.keys(attrs).forEach(bind);
        gl.drawArrays(mode, offset, count);
    }

    return {
        uniform,
        attr,
        draw
    }

}
