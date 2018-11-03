precision mediump float;

uniform sampler2D uTex;
varying vec2 vUV;
varying float vTime;

void main() {

    // float t = sin((uTime) * uAnimSpeed) * 0.5 + 0.5;
    // float t = fract((uTime + vUV.y) * uAnimSpeed);
    vec2 sampleCoord = vec2(vTime, vUV.y + 0.5);
    vec3 tex = texture2D(uTex, sampleCoord).xyz;
    gl_FragColor = vec4(tex, 1.0);

}