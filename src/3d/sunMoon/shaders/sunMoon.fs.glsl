precision mediump float;

uniform sampler2D uTex;
varying vec2 vUV;
varying float vTime;

#define textureWidth 16.0
#define textureHeight 1.0

void main() {
    
    vec2 sampleCoord = vec2(((vTime * textureWidth) + 0.5) / textureWidth, 0.5);
    vec3 tex = texture2D(uTex, sampleCoord).xyz;
    gl_FragColor = vec4(tex, 1.0);

}