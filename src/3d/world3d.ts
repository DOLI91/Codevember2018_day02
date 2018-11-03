import * as THREE from 'three';
import renderer from './renderer';
import Mouse from '../utils/Mouse';
import OrbitControls from '../utils/OrbitControls';

import SunMoon from './sunMoon/SunMoon';
import Post from './post/Post';

import eventEmitter from '../utils/emitter';
const emitter = eventEmitter.emitter;

export default class World3D {

    private width: number;
    private height: number;

    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private orbitControls: any;
    private renderer: any;
    private post: Post;
    private renderToScreen: boolean;
    private sunMoon: SunMoon;

    private mouse: Mouse;
    private time: THREE.Clock;

    constructor() {

        this.init();
        this.initScene();
        this.initSunMoon();
        this.initPost();
        this.initEvents();

    }

    init() {

        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.mouse = new Mouse();

    }

    private initScene = (): void => {

        this.renderer = renderer;
        this.renderer.init();
        this.renderToScreen = false;

        this.camera = new THREE.PerspectiveCamera(35, this.width / this.height, 0.1, 10000);
        this.camera.position.set(0, 0, 800);
        this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
        
        this.scene = new THREE.Scene();
        this.time = new THREE.Clock();

    };

    private initSunMoon(): void {

        this.sunMoon = new SunMoon(75.0);
        this.scene.add(this.sunMoon);

    }

    private initPost(): void {

        this.post = new Post(this.width, this.height);

    }

    private initEvents(): void {

        emitter.on('update', this.animate);
        emitter.on('resizing', this.onResize);

    }

    private render(): void {

        if(this.renderToScreen) {
            this.renderer.render(this.scene, this.camera);
        } else {
            this.post.render(this.renderer, this.scene, this.camera);
        }

    }

    private animate = (): void => {

        const dt: number = this.time.getDelta();

        this.mouse.updatePosition3D(this.camera);
        this.sunMoon.animate(dt);
        this.render();

    };

    private onResize = (): void => {

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.renderer.setSize(this.width, this.height);

        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();

    }

}