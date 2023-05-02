attribute vec3 a_pos;
uniform vec2 u_scale;
varying vec2 v_pos;

void main() {

    float n = 3.0;
    float r = 256.;
    vec2 point = a_pos.xy;

    float l = length(point);
    float c = pow(1.0 + pow(r / l, n), 1.0 / n);

    point /= l;
    l *= c;
    point *= l;

    gl_Position = vec4(point * u_scale, 0, 1);
    v_pos = a_pos.xy;
}