import World3D from './src/3d/world3d';

class App {

    constructor() {

        const world = new World3D();

    }

}

window.onload = () => new App();