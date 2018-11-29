var Asteroid;
(function (Asteroid) {
    class App {
        static Instance() {
            if (this.instance == null) {
                this.instance = new Asteroid.GameController();
            }
            return this.instance;
        }
    }
    App.instance = null;
    Asteroid.App = App;
})(Asteroid || (Asteroid = {}));
let init = function () {
    const Asteroids = new Asteroid.MenuView(document.getElementById('canvas'));
};
window.addEventListener('load', init);
var Asteroid;
(function (Asteroid) {
    class EntityBase {
        constructor() {
            this.d_Xposition = -1;
            this.d_Yposition = -1;
        }
        Update() {
        }
    }
    Asteroid.EntityBase = EntityBase;
})(Asteroid || (Asteroid = {}));
var Asteroid;
(function (Asteroid) {
    class ViewBase {
        constructor(aCanvas) {
            this.d_alive = true;
            this.canvas = aCanvas;
            this.d_CanvasHelper = new Asteroid.CanvasHelper(aCanvas);
        }
        render() {
            this.renderScreen();
        }
        BeforeExit() {
            this.d_alive = false;
        }
    }
    Asteroid.ViewBase = ViewBase;
})(Asteroid || (Asteroid = {}));
var Asteroid;
(function (Asteroid) {
    let GameStates;
    (function (GameStates) {
        GameStates[GameStates["PAUSED"] = 0] = "PAUSED";
        GameStates[GameStates["STOPPED"] = 1] = "STOPPED";
        GameStates[GameStates["RUNNING"] = 2] = "RUNNING";
    })(GameStates || (GameStates = {}));
    class GameController {
    }
    Asteroid.GameController = GameController;
})(Asteroid || (Asteroid = {}));
var Asteroid;
(function (Asteroid_1) {
    class Asteroid extends Asteroid_1.EntityBase {
        constructor() {
            super();
            this.d_image = null;
            this.d_speed = (this.d_MathHelper.randomNumber(1, 50));
            this.d_Xposition = this.d_MathHelper.randomNumber(1, 10);
        }
        UpdateEntity() {
        }
    }
    Asteroid_1.Asteroid = Asteroid;
})(Asteroid || (Asteroid = {}));
var Asteroid;
(function (Asteroid) {
    class Player extends Asteroid.EntityBase {
        constructor() {
            super();
            this.d_image = null;
            this.d_moveUp = false;
            this.d_moveDown = false;
            this.d_moveRight = false;
            this.d_moveLeft = false;
            this.d_Xposition = this.d_CanvasHelper.GetCenter().X;
            this.d_Yposition = this.d_CanvasHelper.GetCenter().Y;
        }
        ;
        UpdateEntity() {
            if (this.d_moveUp || this.d_moveDown || this.d_moveRight || this.d_moveLeft) {
                if (this.d_moveUp)
                    this.d_Yposition -= 2;
                if (this.d_moveDown)
                    this.d_Yposition += 3;
                if (this.d_moveRight)
                    this.d_Xposition += 3;
                if (this.d_moveLeft)
                    this.d_Xposition -= 3;
            }
        }
    }
    Asteroid.Player = Player;
})(Asteroid || (Asteroid = {}));
var Asteroid;
(function (Asteroid) {
    class CanvasHelper {
        constructor(aCanvas) {
            this.d_currentScreen = "MenuView";
            this.leftKeyPressed = false;
            this.upKeyPressed = false;
            this.rightKeyPressed = false;
            this.downKeyPressed = false;
            this.shipXOffset = 50;
            this.shipYOffset = 37;
            this.player = "Rudolf";
            this.score = 10000;
            this.lives = 3;
            this.loadMenuView = function () {
                const Asteroids = new Asteroid.MenuView(document.getElementById('canvas'));
                Asteroids;
            };
            this.loadGameView = function () {
                const Asteroids = new Asteroid.GameView(document.getElementById('canvas'));
                Asteroids;
            };
            this.loadScoreView = function () {
                const Asteroids = new Asteroid.ScoreView(document.getElementById('canvas'));
                Asteroids;
            };
            this.writeStartButton = () => {
                let clickLimit = 1;
                var buttonX = this.GetWidth() / 3 * 1.3;
                var buttonY = this.GetHeight() * .68 - this.GetHeight() * .1 / 2;
                var buttonW = this.GetWidth() * 0.145;
                var buttonH = this.GetHeight() * .043;
                const image = new Image();
                image.addEventListener('load', () => {
                    this.ctx.drawImage(image, this.GetWidth() / 3 * 1.3, this.GetHeight() / 1.6);
                    this.writeTextToCanvas("Play", 25, this.GetWidth() / 2, this.GetHeight() * .66, "black");
                });
                image.src = './assets/images/SpaceShooterRedux/PNG/UI/buttonBlue.png';
                this.canvas.addEventListener('click', (event) => {
                    if (event.x > buttonX &&
                        event.x < buttonX + buttonW &&
                        event.y > buttonY &&
                        event.y < buttonY + buttonH &&
                        clickLimit > 0) {
                        this.namePrompt();
                        clickLimit--;
                        this.clearScreen();
                        document.body.style.cursor = "wait";
                        this.loadGameView();
                        window.addEventListener("keydown", (event) => this.keyDownHandler(event));
                        window.addEventListener("keyup", (event) => this.keyUpHandler(event));
                        window.setInterval(() => this.drawShip(), 1000 / 30);
                    }
                });
            };
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
            ];
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
            ];
            this.livesArray = [
                './assets/images/SpaceShooterRedux/PNG/UI/playerLife2_blue.png',
                './assets/images/SpaceShooterRedux/PNG/UI/playerLife2_green.png',
                './assets/images/SpaceShooterRedux/PNG/UI/playerLife2_orange.png',
                './assets/images/SpaceShooterRedux/PNG/UI/playerLife2_red.png'
            ];
        }
        clearScreen() {
            const context = this.canvas.getContext('2d');
            context.clearRect(0, 0, this.GetWidth(), this.GetHeight());
        }
        GetCenter() {
            return { X: this.GetWidth() / 2, Y: this.GetHeight() / 2 };
        }
        GetHeight() {
            return this.canvas.height;
        }
        GetWidth() {
            return this.canvas.width;
        }
        writeTextToCanvas(text, fontSize, xCoordinate, yCoordinate, color = "white", alignment = "center") {
            this.ctx.font = `${fontSize}px Comic Sans`;
            this.ctx.fillStyle = color;
            this.ctx.textAlign = alignment;
            this.ctx.fillText(text, xCoordinate, yCoordinate);
        }
        writeImageToCanvas(src, xCoordinate, yCoordinate, deltaX = 0, deltaY = 0, loops = 1) {
            let element = document.createElement("img");
            element.src = src;
            for (let i = 0; i < loops; i++) {
                element.addEventListener("load", () => {
                    xCoordinate += deltaX;
                    yCoordinate += deltaY;
                    this.ctx.drawImage(element, xCoordinate, yCoordinate);
                });
            }
        }
        ;
        WriteImageFromFileToCanvas() {
        }
        RegisterOnClick(aCallBack) {
            this.canvas.addEventListener('click', (aEvent) => {
                aCallBack(aEvent.x, aEvent.y);
            });
        }
        clearShip() {
            this.clearScreen();
            this.loadGameView();
        }
        drawShip() {
            const horizontalCenter = this.GetWidth() / 2;
            const verticalCenter = this.GetHeight() / 2;
            if (this.leftKeyPressed && this.shipXOffset < this.GetWidth() / 2) {
                this.shipXOffset += 5;
                this.clearShip();
            }
            if (this.upKeyPressed && this.shipYOffset < this.GetHeight() / 2) {
                this.shipYOffset += 5;
                this.clearShip();
            }
            if (this.rightKeyPressed && this.shipXOffset + this.GetWidth() / 2 - 100 > 0) {
                this.shipXOffset -= 5;
                this.clearShip();
            }
            if (this.downKeyPressed && this.shipYOffset + this.GetHeight() / 2 - 75 > 0) {
                this.shipYOffset -= 5;
                this.clearShip();
            }
            this.writeImageToCanvas("./assets/images/SpaceShooterRedux/PNG/playerShip1_blue.png", horizontalCenter - this.shipXOffset, verticalCenter - this.shipYOffset);
        }
        keyDownHandler(event) {
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
                this.loadScoreView();
            }
            if (event.keyCode == 77) {
                this.loadMenuView();
            }
        }
        keyUpHandler(event) {
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
        namePrompt() {
            if (this.player == "Rudolf") {
                let sign = prompt("What's your username?", "Rudolf");
                sign = this.player;
                console.log(sign);
            }
        }
        BeginUpdate() {
        }
        EndUpdate() {
        }
    }
    Asteroid.CanvasHelper = CanvasHelper;
})(Asteroid || (Asteroid = {}));
var Asteroid;
(function (Asteroid) {
    class KeyboardHelper {
        addKeyUpCallBack(direction) {
        }
        addKeyDownCallBack(direction) {
        }
    }
    Asteroid.KeyboardHelper = KeyboardHelper;
})(Asteroid || (Asteroid = {}));
var Asteroid;
(function (Asteroid) {
    class MathHelper {
        randomNumber(min, max) {
            return Math.round(Math.random() * (max - min) + min);
        }
    }
    Asteroid.MathHelper = MathHelper;
})(Asteroid || (Asteroid = {}));
var Asteroid;
(function (Asteroid) {
    class GameView extends Asteroid.ViewBase {
        constructor(aCanvas) {
            super(aCanvas);
            this.gameScreen();
        }
        static drawLives() {
            throw new Error("Method not implemented.");
        }
        static displayScore() {
            throw new Error("Method not implemented.");
        }
        renderScreen() {
        }
        OnClick() { }
        gameScreen() {
            this.drawAsteroids();
            this.drawLives();
            this.displayScore();
        }
        drawAsteroids() {
            const maxAsteroidsOnScreen = 5;
            for (let i = 0; i < maxAsteroidsOnScreen; i++) {
                const asteroids = `${this.d_CanvasHelper.meteors[Math.floor(Math.random() * this.d_CanvasHelper.meteors.length)]}`;
                this.d_CanvasHelper.writeImageToCanvas(asteroids, Math.floor(Math.random() * this.d_CanvasHelper.GetWidth()), Math.floor(Math.random() * this.d_CanvasHelper.GetHeight()));
            }
        }
        drawLives() {
            this.d_CanvasHelper.writeImageToCanvas("./assets/images/SpaceShooterRedux/PNG/UI/playerLife1_blue.png", -30, 10, 40, undefined, this.d_CanvasHelper.lives);
        }
        displayScore() {
            this.d_CanvasHelper.writeTextToCanvas(`${this.d_CanvasHelper.player}'s Score: ${this.d_CanvasHelper.score}`, 25, this.d_CanvasHelper.GetWidth() / 1.12, this.d_CanvasHelper.GetHeight() / 25);
        }
    }
    Asteroid.GameView = GameView;
})(Asteroid || (Asteroid = {}));
var Asteroid;
(function (Asteroid) {
    class MenuView extends Asteroid.ViewBase {
        constructor(aCanvas) {
            super(aCanvas);
            this.starScreen();
        }
        renderScreen() {
        }
        OnClick() { }
        starScreen() {
            this.d_CanvasHelper.clearScreen();
            this.writeAsteroidHeading();
            this.writeIntroText();
            this.d_CanvasHelper.writeStartButton();
            this.drawAsteroidHeading();
        }
        writeAsteroidHeading() {
            this.d_CanvasHelper.writeTextToCanvas("Asteroids", 150, this.d_CanvasHelper.GetWidth() / 2, this.d_CanvasHelper.GetHeight() / 4);
        }
        writeIntroText() {
            this.d_CanvasHelper.writeTextToCanvas("Press to Play", 50, this.d_CanvasHelper.GetWidth() / 2, this.d_CanvasHelper.GetHeight() / 3 * 1.7);
        }
        drawAsteroidHeading() {
            let ImageSrc;
            do {
                ImageSrc = `${this.d_CanvasHelper.meteors[Math.floor(Math.random() * this.d_CanvasHelper.meteors.length)]}`;
            } while (!ImageSrc.includes("big"));
            this.d_CanvasHelper.writeImageToCanvas(ImageSrc, this.d_CanvasHelper.GetWidth() / 2 - 50, this.d_CanvasHelper.GetHeight() / 3);
        }
    }
    Asteroid.MenuView = MenuView;
})(Asteroid || (Asteroid = {}));
var Asteroid;
(function (Asteroid) {
    class ScoreView extends Asteroid.ViewBase {
        constructor(aCanvas) {
            super(aCanvas);
            this.scoreView();
        }
        scoreView() {
            this.drawHighscores();
        }
        drawHighscores() {
            this.d_CanvasHelper.writeTextToCanvas(`Highscores:`, 50, this.d_CanvasHelper.GetWidth() / 2, this.d_CanvasHelper.GetHeight() / 3);
            this.d_CanvasHelper.writeTextToCanvas(`${this.highscores[0]['playerName']}: ${this.highscores[0]['score']}`, 50, this.d_CanvasHelper.GetWidth() / 2, this.d_CanvasHelper.GetHeight() / 3 + 50);
            this.d_CanvasHelper.writeTextToCanvas(`${this.highscores[1]['playerName']}: ${this.highscores[1]['score']}`, 50, this.d_CanvasHelper.GetWidth() / 2, this.d_CanvasHelper.GetHeight() / 3 + 100);
            this.d_CanvasHelper.writeTextToCanvas(`${this.highscores[2]['playerName']}: ${this.highscores[2]['score']}`, 50, this.d_CanvasHelper.GetWidth() / 2, this.d_CanvasHelper.GetHeight() / 3 + 150);
            this.d_CanvasHelper.writeTextToCanvas(`${this.highscores[3]['playerName']}: ${this.highscores[3]['score']}`, 50, this.d_CanvasHelper.GetWidth() / 2, this.d_CanvasHelper.GetHeight() / 3 + 200);
            this.d_CanvasHelper.writeTextToCanvas(`${this.highscores[4]['playerName']}: ${this.highscores[4]['score']}`, 50, this.d_CanvasHelper.GetWidth() / 2, this.d_CanvasHelper.GetHeight() / 3 + 250);
        }
        renderScreen() {
        }
        OnClick() {
        }
        CleanUp() {
        }
    }
    Asteroid.ScoreView = ScoreView;
})(Asteroid || (Asteroid = {}));
//# sourceMappingURL=app.js.map