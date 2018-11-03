precision mediump float;

attribute vec3 position;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

uniform float uTime;
uniform float uAnimSpeed;

varying vec2 vUV;
varying float vTime;

void main() {

    float t = sin(uTime * uAnimSpeed) * 0.5 + 0.5;

    mat4 viewProjection = projectionMatrix * modelViewMatrix;
    gl_Position = viewProjection * vec4(position, 1.0);

    vUV = uv;
    vTime = t;

}