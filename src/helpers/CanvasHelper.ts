namespace Asteroid {
    export class CanvasHelper {
        protected readonly canvas: HTMLCanvasElement;
        protected readonly ctx: CanvasRenderingContext2D;
        protected d_currentScreen: string = "MenuView";
        public highscores: Array<any>
        public meteors: Array<any>
        public livesArray: Array<any>
        private leftKeyPressed: boolean = false;
        private upKeyPressed: boolean = false;
        private rightKeyPressed: boolean = false;
        private downKeyPressed: boolean = false;
        private shipXOffset: number = 50;
        private shipYOffset: number = 37;
        public player: string = "Rudolf";
        public score: number = 10000;
        public lives: number = 3;

        public constructor(aCanvas: HTMLCanvasElement) {
            //console.log("Constructor CanvasHelper")
            this.canvas = aCanvas;
            this.ctx = this.canvas.getContext('2d');
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.highscores = [
                {
                    playerName: 'Gideon',
                    score: 9999999999
                },
                {
                    playerName: this.player,
                    score: this.score
                },
                {
                    playerName: 'Loek',
                    score: 40000
                },
                {
                    playerName: 'Daan',
                    score: 34000
                },
                {
                    playerName: 'Rimmert',
                    score: 200
                }
            ]
            this.meteors = [
                './assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big1.png',
                './assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big2.png',
                './assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big3.png',
                './assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big4.png',
                './assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_med1.png',
                './assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_med3.png',
                './assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_small1.png',
                './assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_small2.png',
                './assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_tiny1.png',
                './assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_tiny2.png',
                './assets/images/SpaceShooterRedux/PNG/Meteors/meteorGrey_big1.png',
                './assets/images/SpaceShooterRedux/PNG/Meteors/meteorGrey_big2.png',
                './assets/images/SpaceShooterRedux/PNG/Meteors/meteorGrey_big3.png',
                './assets/images/SpaceShooterRedux/PNG/Meteors/meteorGrey_big4.png',
                './assets/images/SpaceShooterRedux/PNG/Meteors/meteorGrey_med1.png',
                './assets/images/SpaceShooterRedux/PNG/Meteors/meteorGrey_med2.png',
                './assets/images/SpaceShooterRedux/PNG/Meteors/meteorGrey_small1.png',
                './assets/images/SpaceShooterRedux/PNG/Meteors/meteorGrey_small2.png',
                './assets/images/SpaceShooterRedux/PNG/Meteors/meteorGrey_tiny1.png',
                './assets/images/SpaceShooterRedux/PNG/Meteors/meteorGrey_tiny2.png'
            ]
            this.livesArray = [
                './assets/images/SpaceShooterRedux/PNG/UI/playerLife2_blue.png',
                './assets/images/SpaceShooterRedux/PNG/UI/playerLife2_green.png',
                './assets/images/SpaceShooterRedux/PNG/UI/playerLife2_orange.png',
                './assets/images/SpaceShooterRedux/PNG/UI/playerLife2_red.png'
            ]
        }

        public clearScreen() {
            const context = this.canvas.getContext('2d');
            context.clearRect(0, 0, this.GetWidth(), this.GetHeight());
        }

        public loadMenuView = function () {
            //console.log("initmenu")
            const Asteroids = new MenuView(<HTMLCanvasElement>document.getElementById('canvas'));
            Asteroids
        };

        public loadGameView = function () {
            //console.log("initgame")
            const Asteroids = new GameView(<HTMLCanvasElement>document.getElementById('canvas'));
            Asteroids
        };

        public loadScoreView = function () {
            //console.log("initscore")
            const Asteroids = new ScoreView(<HTMLCanvasElement>document.getElementById('canvas'));
            Asteroids
        };

        public GetCenter(): { X: number, Y: number } {
            return { X: this.GetWidth() / 2, Y: this.GetHeight() / 2 };
        }

        public GetHeight(): number {
            return this.canvas.height
        }

        public GetWidth(): number {
            return this.canvas.width
        }

        public writeTextToCanvas(
            text: string,
            fontSize: number,
            xCoordinate: number,
            yCoordinate: number,
            color: string = "white",
            alignment: CanvasTextAlign = "center"
        ) {
            this.ctx.font = `${fontSize}px Comic Sans`;
            this.ctx.fillStyle = color;
            this.ctx.textAlign = alignment;
            this.ctx.fillText(text, xCoordinate, yCoordinate);
        }

        public writeImageToCanvas(
            src: string,
            xCoordinate: number,
            yCoordinate: number,
            deltaX: number = 0,
            deltaY: number = 0,
            loops: number = 1
        ) {
            let element = document.createElement("img");
            element.src = src;

            for (let i = 0; i < loops; i++) {
                element.addEventListener("load", () => {
                    xCoordinate += deltaX;
                    yCoordinate += deltaY;
                    this.ctx.drawImage(element, xCoordinate, yCoordinate);
                });
            }
        };

        public WriteImageFromFileToCanvas(){

        }
        
        public writeStartButton = () => {
            let clickLimit = 1
            // Button position and dimensions
            var buttonX = this.GetWidth() / 3 * 1.3;
            var buttonY = this.GetHeight() * .68 - this.GetHeight() * .1 / 2;
            var buttonW = this.GetWidth() * 0.145;
            var buttonH = this.GetHeight() * .043;

            const image = new Image();
            image.addEventListener('load', () => {
                this.ctx.drawImage(image, this.GetWidth() / 3 * 1.3, this.GetHeight() / 1.6);
                // Render button format
                this.writeTextToCanvas("Play", 25, this.GetWidth() / 2, this.GetHeight() * .66, "black")
            });
            image.src = './assets/images/SpaceShooterRedux/PNG/UI/buttonBlue.png';


            // Add event listener to canvas element
            this.canvas.addEventListener('click', (event) => {
                // Control that click event occurred within position of button
                // NOTE: This assumes canvas is positioned at top left corner 
                if (
                    event.x > buttonX &&
                    event.x < buttonX + buttonW &&
                    event.y > buttonY &&
                    event.y < buttonY + buttonH &&
                    clickLimit > 0
                ) {
                    this.namePrompt()
                    clickLimit--
                    this.clearScreen()
                    document.body.style.cursor = "wait";
                    this.loadGameView()
                    window.addEventListener("keydown", (event) => this.keyDownHandler(event));
                    window.addEventListener("keyup", (event) => this.keyUpHandler(event));
                    window.setInterval(() => this.drawShip(), 1000 / 30);
                }
            });
        }

        public RegisterOnClick(aCallBack: (x_axis: number, y_axis: number) => void) {
            // register an event listener to handle click events
            this.canvas.addEventListener('click', (aEvent: MouseEvent) => {
                // when this event is handles call the local OnClick method.
                aCallBack(aEvent.x, aEvent.y);
            });
        }

        private clearShip() {
            this.clearScreen()
            this.loadGameView()
        }

        private drawShip() {
            const horizontalCenter = this.GetWidth() / 2;
            const verticalCenter = this.GetHeight() / 2;

            if (this.leftKeyPressed && this.shipXOffset < this.GetWidth() / 2) {
                this.shipXOffset += 5;
                this.clearShip()
            }
            if (this.upKeyPressed && this.shipYOffset < this.GetHeight() / 2) {
                this.shipYOffset += 5;
                this.clearShip()
            }
            if (this.rightKeyPressed && this.shipXOffset + this.GetWidth() / 2 - 100 > 0) {
                this.shipXOffset -= 5;
                this.clearShip()
            }
            if (this.downKeyPressed && this.shipYOffset + this.GetHeight() / 2 - 75 > 0) {
                this.shipYOffset -= 5;
                this.clearShip()
            }

            //4. draw player spaceship
            this.writeImageToCanvas(
                "./assets/images/SpaceShooterRedux/PNG/playerShip1_blue.png",
                horizontalCenter - this.shipXOffset,
                verticalCenter - this.shipYOffset
            );
        }

        private keyDownHandler(event: KeyboardEvent) {
            if (event.keyCode == 65 || event.keyCode == 37) {
                this.leftKeyPressed = true;
            }
            if (event.keyCode == 87 || event.keyCode == 38) {
                this.upKeyPressed = true;
            }
            if (event.keyCode == 68 || event.keyCode == 39) {
                this.rightKeyPressed = true;
            }
            if (event.keyCode == 83 || event.keyCode == 40) {
                this.downKeyPressed = true;
            }
            if (event.keyCode == 72) {
                this.loadScoreView()
            }
            if (event.keyCode == 77) {
                this.loadMenuView()
            }
        }

        private keyUpHandler(event: KeyboardEvent) {
            if (event.keyCode == 65 || event.keyCode == 37) {
                this.leftKeyPressed = false;
            }
            if (event.keyCode == 87 || event.keyCode == 38) {
                this.upKeyPressed = false;
            }
            if (event.keyCode == 68 || event.keyCode == 39) {
                this.rightKeyPressed = false;
            }
            if (event.keyCode == 83 || event.keyCode == 40) {
                this.downKeyPressed = false;
            }
        }

        public namePrompt() {
            if (this.player == "Rudolf") {
                let sign = prompt("What's your username?", "Rudolf");                
                sign = this.player
                console.log(sign)
        
                
            }
        }

        protected BeginUpdate(){

        }

        protected EndUpdate(){

        }
    }
}