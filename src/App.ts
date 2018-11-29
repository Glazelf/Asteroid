namespace Asteroid {
    export class App {
        private static instance: GameController = null;
        public static Instance(): GameController {
            if (this.instance == null) {
                this.instance = new GameController();
            }
            return this.instance;
        }
    }
}
let init = function () {
    //console.log("init")
    const Asteroids = new Asteroid.MenuView(<HTMLCanvasElement>document.getElementById('canvas'));
};
window.addEventListener('load', init);