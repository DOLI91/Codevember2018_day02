precision mediump float;

attribute vec3 position;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

uniform float uFallOff;
uniform float uSpatialF;
uniform float uTemporalF;

uniform float uTime;
uniform float uAnimSpeed;

varying vec2 vUV;
varying float vTime;

#define OCTAVES 4
#define mat3 (0.00, 0.80, 0.60, -0.80, 0.36, -0.48, -0.60, -0.48, 0.64)

vec3 sinNoise(vec3 p, float t) {

    p.xyz *= uSpatialF;
    t *= uTemporalF;
    vec3 outPut = vec3(0.0);

    float a = 1.0;
    float f = 1.0;

    for(int i = 0; i < OCTAVES; i++) {

        p.xyz = mat3 * p.xyz;
        outPut += sin((p.zyx + t) * f) * a;
        
        a *= uFallOff;
        f /= uFallOff;

    }

    return outPut;

}

void main() {

    float t = sin((uTime) * uAnimSpeed) * 0.5 + 0.5;

    mat4 viewProjection = projectionMatrix * modelViewMatrix;
    vec3 noise = sinNoise(position, uTime);
    vec3 pos = mix(position + noise, position, t);
    gl_Position = viewProjection * vec4(pos, 1.0);

    vUV = uv;
    vTime = t;

}