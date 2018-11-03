precision mediump float;

varying vec2 vUV;
varying float vTime;

void main() {

    vec3 night = vec3(0.0);
    vec3 day = vec3(1.0);
    vec3 col = mix(night, day, vTime);

    gl_FragColor = vec4(col, 1.0);

}