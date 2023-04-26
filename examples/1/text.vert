attribute vec2 a_pos;
attribute vec2 a_uv;
uniform vec2 u_scale;
varying vec2 v_uv;

void main() {
    vec2 point = a_pos;
    gl_Position = vec4(point * u_scale, 0, 1);
    v_uv = a_uv;
}