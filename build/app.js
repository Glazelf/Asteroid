class Game {
    constructor(canvasId) {
        this.player = "Daddy";
        this.score = 400;
        this.lives = 3;
        this.shipXOffset = 50;
        this.shipYOffset = 37;
        this.writeStartButton = () => {
            let clickLimit = 1;
            var buttonX = this.canvas.width / 3 * 1.3;
            var buttonY = this.canvas.height * .68 - this.canvas.height * .1 / 2;
            var buttonW = this.canvas.width * 0.145;
            var buttonH = this.canvas.height * .043;
            const image = new Image();
            image.addEventListener('load', () => {
                this.ctx.drawImage(image, this.canvas.width / 3 * 1.3, this.canvas.height / 1.6);
                this.writeTextToCanvas("Play", 25, this.canvas.width / 2, this.canvas.height * .66, "black");
            });
            image.src = './assets/images/SpaceShooterRedux/PNG/UI/buttonBlue.png';
            this.canvas.addEventListener('click', (event) => {
                if (event.x > buttonX &&
                    event.x < buttonX + buttonW &&
                    event.y > buttonY &&
                    event.y < buttonY + buttonH &&
                    clickLimit > 0) {
                    clickLimit--;
                    this.level_screen();
                    window.addEventListener("keydown", (event) => this.keyDownHandler(event));
                    window.addEventListener("keyup", (event) => this.keyUpHandler(event));
                    window.setInterval(() => this.draw(), 1000 / 30);
                }
            });
        };
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        this.highscores = [
            {
                playerName: 'Gideon',
                score: 9999999999
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
        this.start_screen();
    }
    clearScreen() {
        const context = this.canvas.getContext('2d');
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    start_screen() {
        this.clearScreen();
        this.writeAsteroidHeading();
        this.writeIntroText();
        this.writeStartButton();
        this.drawAsteroid();
    }
    writeAsteroidHeading() {
        this.writeTextToCanvas("Asteroids", 150, this.canvas.width / 2, this.canvas.height / 4);
    }
    writeIntroText() {
        this.writeTextToCanvas("Press to Play", 50, this.canvas.width / 2, this.canvas.height / 3 * 1.7);
    }
    drawAsteroid() {
        let meteorNumber = this.randomNumber(1, 4);
        const image = new Image();
        image.onload = () => {
            this.ctx.drawImage(image, this.canvas.width / 2 - 50, this.canvas.height / 3);
        };
        image.src = `./assets/images/SpaceShooterRedux/PNG/Meteors/MeteorBrown_big${meteorNumber}.png`;
    }
    ;
    level_screen() {
        this.clearScreen();
        this.randomAsteroids();
        this.drawLives();
        this.currentScore();
    }
    randomAsteroids() {
        let i = 0;
        while (i <= 500) {
            let meteorNumber = this.randomNumber(1, 4);
            let canvasLocationVer = this.randomNumber(0, this.canvas.height);
            let canvasLocationHor = this.randomNumber(0, this.canvas.width);
            const asteroid = new Image();
            asteroid.onload = () => {
                this.ctx.drawImage(asteroid, canvasLocationHor, canvasLocationVer);
            };
            asteroid.src = `./assets/images/SpaceShooterRedux/PNG/Meteors/MeteorBrown_big${meteorNumber}.png`;
            i++;
        }
    }
    drawLives() {
        const imgLife = new Image();
        imgLife.onload = () => {
            console.log(this);
            this.ctx.drawImage(imgLife, this.canvas.width / 100, this.canvas.height / 100);
        };
        imgLife.src = './assets/images/SpaceShooterRedux/PNG/UI/playerLife1_blue.png';
        const imgLife2 = new Image();
        imgLife2.onload = () => {
            console.log(this);
            this.ctx.drawImage(imgLife2, this.canvas.width / 25, this.canvas.height / 100);
        };
        imgLife2.src = './assets/images/SpaceShooterRedux/PNG/UI/playerLife1_blue.png';
        const imgLife3 = new Image();
        imgLife3.onload = () => {
            console.log(this);
            this.ctx.drawImage(imgLife3, this.canvas.width / 14, this.canvas.height / 100);
        };
        imgLife3.src = './assets/images/SpaceShooterRedux/PNG/UI/playerLife1_blue.png';
    }
    ;
    currentScore() {
        this.writeTextToCanvas(`${this.player}'s score: ${this.score}`, 25, this.canvas.width / 1.15, this.canvas.height / 25);
    }
    title_screen() {
        this.clearScreen();
        this.drawScore();
        this.drawHighscores();
    }
    drawScore() {
        this.writeTextToCanvas(`${this.player}'s score: ${this.score}`, 50, this.canvas.width / 2, this.canvas.height / 5);
    }
    drawHighscores() {
        this.writeTextToCanvas(`Highscores:`, 50, this.canvas.width / 2, this.canvas.height / 3);
        this.writeTextToCanvas(`${this.highscores[0]['playerName']}: ${this.highscores[0]['score']}`, 50, this.canvas.width / 2, this.canvas.height / 3 + 50);
        this.writeTextToCanvas(`${this.highscores[1]['playerName']}: ${this.highscores[1]['score']}`, 50, this.canvas.width / 2, this.canvas.height / 3 + 100);
        this.writeTextToCanvas(`${this.highscores[2]['playerName']}: ${this.highscores[2]['score']}`, 50, this.canvas.width / 2, this.canvas.height / 3 + 150);
        this.writeTextToCanvas(`${this.highscores[3]['playerName']}: ${this.highscores[3]['score']}`, 50, this.canvas.width / 2, this.canvas.height / 3 + 200);
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    draw() {
        this.clearScreen();
        if (this.leftPressed) {
            this.shipXOffset -= 7;
        }
        if (this.upPressed) {
            this.shipYOffset -= 5;
        }
        if (this.rightPressed) {
            this.shipXOffset += 7;
        }
        if (this.downPressed) {
            this.shipYOffset += 5;
        }
        const imgLife = new Image();
        imgLife.onload = () => {
            this.ctx.drawImage(imgLife, this.canvas.width / 2 + this.shipXOffset, this.canvas.height / 2 + this.shipYOffset);
        };
        imgLife.src = './assets/images/SpaceShooterRedux/PNG/playerShip1_blue.png';
    }
    writeTextToCanvas(text, fontSize, xCoordinate, yCoordinate, color = "white", alignment = "center") {
        this.ctx.font = `${fontSize}px Comic Sans`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
    keyDownHandler(event) {
        if (event.keyCode == 65) {
            this.leftPressed = true;
        }
        if (event.keyCode == 68) {
            this.rightPressed = true;
        }
        if (event.keyCode == 87) {
            this.upPressed = true;
        }
        if (event.keyCode == 83) {
            this.downPressed = true;
        }
    }
    keyUpHandler(event) {
        if (event.keyCode == 65) {
            this.leftPressed = false;
        }
        if (event.keyCode == 68) {
            this.rightPressed = false;
        }
        if (event.keyCode == 87) {
            this.upPressed = false;
        }
        if (event.keyCode == 83) {
            this.downPressed = false;
        }
    }
}
let init = function () {
    const Asteroids = new Game(document.getElementById('canvas'));
};
window.addEventListener('load', init);
//# sourceMappingURL=app.js.map