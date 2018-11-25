class GameView extends ViewBase {
    static drawLives(): any {
        throw new Error("Method not implemented.");
    }
    static displayScore(): any {
        throw new Error("Method not implemented.");
    }
    public constructor(aCanvas: HTMLCanvasElement) {
        super(aCanvas)
        this.gameScreen()
        //console.log("game")
    }
    protected renderScreen(): void {

    }
    protected OnClick() { }
    public gameScreen() {
        //3. draw random asteroids
        this.drawAsteroids()
        //4. draw player spaceship
        //1. load life images
        this.drawLives();
        //2. draw current score
        this.displayScore();
    }

    public drawAsteroids() {
        //3. draw random asteroids
        const asteroids = `${this.d_CanvasHelper.meteors[Math.floor(Math.random() * this.d_CanvasHelper.meteors.length)]}`
        const maxAsteroidsOnScreen: number = 5;
        for (let i = 0; i < maxAsteroidsOnScreen; i++) {
            this.d_CanvasHelper.meteors[Math.floor(Math.random() * this.d_CanvasHelper.meteors.length)]
            this.d_CanvasHelper.writeImageToCanvas(
                asteroids,
                Math.floor(Math.random() * this.d_CanvasHelper.GetWidth()),
                Math.floor(Math.random() * this.d_CanvasHelper.GetHeight()),
            );
        }
    }
    protected drawLives() {
        this.d_CanvasHelper.writeImageToCanvas("./assets/images/SpaceShooterRedux/PNG/UI/playerLife1_blue.png", -30, 10, 40, undefined, this.d_CanvasHelper.lives);
    }
    protected displayScore() {
        this.d_CanvasHelper.writeTextToCanvas(`${this.d_CanvasHelper.player}'s Score: ${this.d_CanvasHelper.score}`, 25, this.d_CanvasHelper.GetWidth() / 1.12, this.d_CanvasHelper.GetHeight() / 25)
    }
}
