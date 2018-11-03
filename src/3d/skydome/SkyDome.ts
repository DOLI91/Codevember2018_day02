import * as THREE from 'three'
const glslify = require('glslify');

interface ISkyDomeUniforms {

    uTime: {type: string, value: number}
    uAnimSpeed: {type: string , value: number},

}

export default class SkyDome extends THREE.Mesh {

    constructor() {

        const geo: THREE.OctahedronBufferGeometry = new THREE.OctahedronBufferGeometry(1000, 2);

        const u: ISkyDomeUniforms = {
            uTime: {type: 'f', value: 0.0},
            uAnimSpeed: {type: 'f', value: 1.0  / 1.0},
        };

        const vShader = glslify('./shaders/skydome.vs.glsl');
        const fShader = glslify('./shaders/skydome.fs.glsl');

        const mat: THREE.RawShaderMaterial = new THREE.RawShaderMaterial({uniforms: u, vertexShader: vShader, fragmentShader: fShader});
        mat.side = THREE.DoubleSide;

        super(geo, mat);

    }

    public animate(t: number): void {

        (<THREE.RawShaderMaterial>this.material).uniforms['uTime'].value += t;

    }

}