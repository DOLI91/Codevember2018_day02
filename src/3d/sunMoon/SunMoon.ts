import * as THREE from 'three';
const glslify = require('glslify');

interface ISunMoonUniforms {

    uTex: {type: string, value: THREE.Texture | null}
    uTime: {type: string, value: number}
    uAnimSpeed: {type: string, value: number}
    uTemporalF: {type: string, value: number}
    uSpatialF: {type: string, value: number}
    uFallOff: {type: string, value: number}

}

export default class SunMoon extends THREE.Mesh {
    
    constructor(radius: number) {

        const geo: THREE.OctahedronBufferGeometry = new THREE.OctahedronBufferGeometry(radius, 8);
        const texture: THREE.Texture = new THREE.TextureLoader().load('./assets/textures/sunmoontexture.png');
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;

        const u: ISunMoonUniforms = {

            uTex: {type: 't', value: texture},
            uTime: {type: 'f', value: 0.0},
            uAnimSpeed: {type: 'f', value: 1.0  / 10.0},
            uTemporalF: {type: 'f', value: 0.84},
            uSpatialF: {type: 'f', value: 0.43},
            uFallOff: {type: 'f', value: 0.624}

        }

        const vShader = glslify('./shaders/sunMoon.vs.glsl');
        const fShader = glslify('./shaders/sunMoon.fs.glsl');
        const mat: THREE.RawShaderMaterial = new THREE.RawShaderMaterial({uniforms: u, vertexShader: vShader, fragmentShader: fShader})

        super(geo, mat);

    }

    public animate(t: number): void {

        (<THREE.ShaderMaterial>this.material).uniforms['uTime'].value += t;

    }

}