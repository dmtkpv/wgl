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
// Attribute
// ---------------

export function Buffer (gl, program, attributes) {

    const bytes = Float32Array.BYTES_PER_ELEMENT;
    const attrs = {};

    const total = {
        size: 0,
        length: 0,
        data: []
    };

    Object.keys(attributes).forEach(name => {
        const { data, size } = attributes[name];
        const location = getAttribute(gl, program, 'a_' + name)
        const offset = total.size;
        attrs[name] = { data, size, offset, location }
        total.length = Math.max(total.length, Math.ceil(data.length / size));
        total.size += size;
    })

    for (let n = 0; n < total.length; n++) {
        for (const key in attrs) {
            const { size, data } = attrs[key];
            const from = n * size;
            const to = from + size;
            for (let i = from; i < to; i++) {
                total.data.push(data[i]);
            }
        }
    }

    const buffer = createArrayBuffer(gl, total.data);

    function bind () {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        Object.values(attrs).forEach(attr => {
            gl.vertexAttribPointer(attr.location, attr.size, gl.FLOAT, false, total.size * bytes, attr.offset * bytes);
        })
    }

    function draw (mode, offset, count = total.length) {
        gl.drawArrays(mode, offset, count);
    }

    return {
        draw
    }


}


// ---------------
// Program
// ---------------

export function Program (gl, vert, frag) {

    const program = createProgram(gl, vert, frag);
    const uniforms = getUniforms(gl, program);
    const attrs = {};

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
        const location = getAttribute(gl, program, 'a_' + name, size);
        attrs[name] = { buffer, location, size }
    }

    function bind (name) {
        const { buffer, location, size } = attrs[name];
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
    }
    
    function draw (mode, offset = 0, count = total.length) {
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
