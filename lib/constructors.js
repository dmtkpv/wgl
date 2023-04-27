import { createProgram, getUniforms, getAttribute, createArrayBuffer } from './utils.js'



// ---------------
// Attribute
// ---------------

export function Attr (gl, program, name, data, size) {

    const buffer = createArrayBuffer(gl, data);
    const location = getAttribute(gl, program, 'a_' + name);

    activate();

    function activate () {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
    }

    function draw (mode, offset, count = data.length / size) {
        gl.drawArrays(mode, offset, count);
    }

    return {
        activate,
        draw
    }

}



// ---------------
// Program
// ---------------

export function Program (gl, vert, frag) {

    const program = createProgram(gl, vert, frag);
    const uniforms = getUniforms(gl, program);
    const attrs = {}

    function activate () {
        const current = gl.getParameter(gl.CURRENT_PROGRAM);
        if (program !== current) gl.useProgram(program);
    }

    function attr (name, data, size = 3) {
        attrs[name] = new Attr(gl, program, name, data, size);
    }

    function uniform (name, ...args) {
        activate();
        const method = `uniform${args.length}f`;
        const location = uniforms['u_' + name];
        gl[method](location, ...args);
    }

    function draw (name, mode, offset, count) {
        activate();
        Object.values(attrs).forEach(attr => attr.activate())
        attrs[name].draw(mode, offset, count);
    }

    return {
        program,
        attr,
        uniform,
        draw,
        activate
    }

}
