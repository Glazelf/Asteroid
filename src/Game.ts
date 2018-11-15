class Game {
    //global attr for canvas
    //readonly attributes must be initialized in the constructor
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;

    //some global player attributes
    private readonly player: string = "Gideon";
    private readonly score: number = 400;
    private readonly lives: number = 3;
    public highscores: Array<any>; //TODO: do not use 'any': write an interface!

    public constructor(canvasId: HTMLCanvasElement) {
        //construct all canvas
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        //set the context of the canvas
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
        ]

        // all screens: uncomment to activate 
        this.start_screen();
        //this.level_screen();
        //this.title_screen();
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

    //-------- Splash screen methods ------------------------------------
    /**
     * Function to initialize the splash screen
     */
    public start_screen() {
        //1. add 'Asteroids' text
        this.writeAsteroidHeading();
        //2. add 'Press to play' text
        this.writeIntroText();
        //3. add button with 'start' text
        this.writeStartButton();
        //4. add Asteroid image
        this.drawAsteroid();
    }
    public writeAsteroidHeading() {
        this.writeTextToCanvas("Asteroids", 150, this.canvas.width/2, this.canvas.height/4)
    }

    public writeIntroText() {
        this.writeTextToCanvas("Press to Play", 50, this.canvas.width/2, this.canvas.height/3*1.7)
    }

    public writeStartButton = () => {
        // Button position and dimensions
        var buttonX = this.canvas.width / 3 * 1.3;
        var buttonY = this.canvas.height * .68 - this.canvas.height * .1 / 2;
        var buttonW = this.canvas.width * 0.145;
        var buttonH = this.canvas.height * .043;

        const image = new Image();
        image.addEventListener('load', () => {
            this.ctx.drawImage(image, this.canvas.width / 3 * 1.3, this.canvas.height / 1.6);
            // Render button format
            this.writeTextToCanvas("Play", 25, this.canvas.width/2, this.canvas.height*.66, "black")
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
                event.y < buttonY + buttonH
            ) {
                const context = this.canvas.getContext('2d');
                context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.level_screen()
            }
        });
    }

    public drawAsteroid() {
        let meteorNumber = this.randomNumber(1, 4)
        const image = new Image();
        image.onload = () => {
            this.ctx.drawImage(image, this.canvas.width / 2 - 50, this.canvas.height / 3);
        };
        image.src = `./assets/images/SpaceShooterRedux/PNG/Meteors/MeteorBrown_big${meteorNumber}.png`;
    };


    //-------- level screen methods -------------------------------------
    /**
     * Function to initialize the level screen
    
     */
    public level_screen() {
        //3. draw random asteroids
        this.randomAsteroids()
        //4. draw player spaceship
        this.drawSpaceship()
        //1. load life images
        this.drawLives()
        //2. draw current score
        this.currentScore()
    }

    public randomAsteroids() {
        let i = 0
        while (i <= 100) {
            let meteorNumber = this.randomNumber(1, 4)
            let canvasLocationVer = this.randomNumber(0, this.canvas.height)
            let canvasLocationHor = this.randomNumber(0, this.canvas.width)
            const asteroid = new Image();
            asteroid.onload = () => {
                this.ctx.drawImage(asteroid, canvasLocationHor, canvasLocationVer);
            };
            asteroid.src = `./assets/images/SpaceShooterRedux/PNG/Meteors/MeteorBrown_big${meteorNumber}.png`;
            i++;
        }
    }

    public drawSpaceship() {
        const imgLife = new Image();
        imgLife.onload = () => {
            console.log(this);
            this.ctx.drawImage(imgLife, this.canvas.width / 2, this.canvas.height / 2);
        };
        imgLife.src = './assets/images/SpaceShooterRedux/PNG/UI/playerLife1_blue.png';
    }

    public drawLives() {
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
    };

    public currentScore() {
        this.writeTextToCanvas(`Score: ${this.score}`, 25, this.canvas.width/1.15, this.canvas.height/25)
    }

    //-------- Title screen methods -------------------------------------

    /**
    * Function to initialize the title screen   
    */
    public title_screen() {
        //1. draw your score
        this.drawScore()
        //2. draw all highscore
        this.drawHighscores()
    }

    public drawScore() {
        this.writeTextToCanvas(`Your score: ${this.score}`, 50, this.canvas.width/2, this.canvas.height/5)
    }

    public drawHighscores() {
        this.writeTextToCanvas(`Highscores:`, 50, this.canvas.width/2, this.canvas.height/3)
        this.writeTextToCanvas(`${this.highscores[0]['playerName']}: ${this.highscores[0]['score']}`, 50, this.canvas.width/2, this.canvas.height/3+50)
        this.writeTextToCanvas(`${this.highscores[1]['playerName']}: ${this.highscores[1]['score']}`, 50, this.canvas.width/2, this.canvas.height/3+100)
        this.writeTextToCanvas(`${this.highscores[2]['playerName']}: ${this.highscores[2]['score']}`, 50, this.canvas.width/2, this.canvas.height/3+150)
        this.writeTextToCanvas(`${this.highscores[3]['playerName']}: ${this.highscores[3]['score']}`, 50, this.canvas.width/2, this.canvas.height/3+200)
    }

    //-------Generic canvas functions ----------------------------------

    /**
    * Renders a random number between min and max
    * @param {number} min - minimal time
    * @param {number} max - maximal time
    */
    public randomNumber(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }
}

//this will get an HTML element. I cast this element in de appropriate type using <>
let init = function () {
    const Asteroids = new Game(<HTMLCanvasElement>document.getElementById('canvas'));
};
//add loadlistener for custom font types
window.addEventListener('load', init);