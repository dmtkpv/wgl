attribute vec2 a_pos;
attribute vec2 a_tex;
uniform vec2 u_scale;
varying vec2 v_tex;

void main() {
    vec2 point = a_pos;
    float R = 300.0;
    float h = R / 2.5;
    float hr = sqrt(R * R - (R - h) * (R - h));
    float r = sqrt(point.x * point.x + point.y * point.y);
    float s = r > hr ? 1. : sqrt(R * R - r * r) / (R - h);
    gl_Position = vec4(point * u_scale * s, 0, 1);
    v_tex = a_tex;
}