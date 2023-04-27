attribute vec3 a_pos;
uniform vec2 u_scale;
varying vec2 v_pos;

void main() {

    float n = 3.0;
    float r = 0.;
    vec2 point = a_pos.xy;

    float l = length(point);
    float c = pow(1.0 + pow(r / l, n), 1.0 / n);

    point /= l;
    l *= c;
    point *= l;

//    vec2 point = a_pos * u_scale;
    gl_Position = vec4(point * u_scale, 0, 1);
    v_pos = a_pos.xy;
}