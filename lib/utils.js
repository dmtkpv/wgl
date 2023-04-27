// ---------------
// Program
// ---------------

export function createShader (gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) return shader;
    const error = gl.getShaderInfoLog(shader);
    console.log(error);
    gl.deleteShader(shader);
}

export function createProgram (gl, vert, frag) {
    const vShader = createShader(gl, gl.VERTEX_SHADER, vert);
    const fShader = createShader(gl, gl.FRAGMENT_SHADER, frag);
    const program = gl.createProgram();
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) return program;
    const error = gl.getProgramInfoLog(program);
    console.log(error);
    gl.deleteProgram(program);
}



// ---------------
// Uniforms
// ---------------

export function getUniform (gl, program, name) {
    return gl.getUniformLocation(program, name);
}

export function getUniforms (gl, program) {
    const number = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    return Array(number).fill().reduce((uniforms, _, index) => {
        const { name } = gl.getActiveUniform(program, index);
        uniforms[name] = getUniform(gl, program, name)
        return uniforms;
    }, {})
}



// ---------------
// Attributes
// ---------------

export function getAttribute (gl, program, name) {
    const location = gl.getAttribLocation(program, name);
    gl.enableVertexAttribArray(location);
    return location;
}

export function getAttributes (gl, program) {
    const number = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
    return Array(number).fill().reduce((attrs, _, index) => {
        const { name } = gl.getActiveAttrib(program, index);
        attrs[name] = getAttribute(gl, program, name);
        return attrs;
    }, {})
}



// ---------------
// Buffers
// ---------------

export function createArrayBuffer (gl, data) {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER,  new Float32Array(data), gl.STATIC_DRAW);
    return buffer;
}




// ---------------
// Texture
// ---------------

export function createTexture (gl, image) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    return texture;
}