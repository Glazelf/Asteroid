let init = function () {
    //console.log("init")
    const Asteroids = new MenuView(<HTMLCanvasElement>document.getElementById('canvas'));
};
window.addEventListener('load', init);
class MenuView extends ViewBase {
    public constructor(aCanvas: HTMLCanvasElement) {
        //console.log("constructorMenuView")
        super(aCanvas)
        this.starScreen()
    }

    protected renderScreen(): void {

    }
    protected OnClick() { }

    public starScreen() {
        //console.log("startscreen")
        this.d_CanvasHelper.clearScreen();
        //1. add 'Asteroids' text
        this.writeAsteroidHeading();
        //2. add 'Press to play' text
        this.writeIntroText();
        //3. add button with 'start' text
        this.d_CanvasHelper.writeStartButton();
        //4. add Asteroid image
        this.drawAsteroidHeading();
    }

    public writeAsteroidHeading() {
        //console.log(this.canvas)
        this.d_CanvasHelper.writeTextToCanvas("Asteroids", 150, this.d_CanvasHelper.GetWidth() / 2, this.d_CanvasHelper.GetHeight() / 4)
    }

    public writeIntroText() {
        this.d_CanvasHelper.writeTextToCanvas("Press to Play", 50, this.d_CanvasHelper.GetWidth() / 2, this.d_CanvasHelper.GetHeight() / 3 * 1.7)
    }
    public drawAsteroidHeading() {
        let ImageSrc: string;
        do {
            ImageSrc = `${this.d_CanvasHelper.meteors[Math.floor(Math.random() * this.d_CanvasHelper.meteors.length)]}`
        } while (!ImageSrc.includes("big"))
        //console.log(ImageSrc)
        this.d_CanvasHelper.writeImageToCanvas(ImageSrc, this.d_CanvasHelper.GetWidth() / 2 - 50, this.d_CanvasHelper.GetHeight() / 3)
    }
}