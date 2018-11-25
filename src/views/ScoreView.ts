class ScoreView extends ViewBase {
    public highscores: Array<any>;
    public constructor(aCanvas: HTMLCanvasElement) {
        super(aCanvas)
        this.highscores = [

            {
                playerName: 'Gideon',
                score: 99999999
            },
            {
                playerName: this.d_CanvasHelper.player,
                score: this.d_CanvasHelper.score
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
        this.scoreView()
    }
    private scoreView() {
        this.drawHighscores()
    }
    public drawHighscores() {
        this.d_CanvasHelper.writeTextToCanvas(`Highscores:`, 50, this.d_CanvasHelper.GetWidth() / 2, this.d_CanvasHelper.GetHeight() / 3)
        this.d_CanvasHelper.writeTextToCanvas(`${this.highscores[0]['playerName']}: ${this.highscores[0]['score']}`, 50, this.d_CanvasHelper.GetWidth() / 2, this.d_CanvasHelper.GetHeight() / 3 + 50)
        this.d_CanvasHelper.writeTextToCanvas(`${this.highscores[1]['playerName']}: ${this.highscores[1]['score']}`, 50, this.d_CanvasHelper.GetWidth() / 2, this.d_CanvasHelper.GetHeight() / 3 + 100)
        this.d_CanvasHelper.writeTextToCanvas(`${this.highscores[2]['playerName']}: ${this.highscores[2]['score']}`, 50, this.d_CanvasHelper.GetWidth() / 2, this.d_CanvasHelper.GetHeight() / 3 + 150)
        this.d_CanvasHelper.writeTextToCanvas(`${this.highscores[3]['playerName']}: ${this.highscores[3]['score']}`, 50, this.d_CanvasHelper.GetWidth() / 2, this.d_CanvasHelper.GetHeight() / 3 + 200)
        this.d_CanvasHelper.writeTextToCanvas(`${this.highscores[4]['playerName']}: ${this.highscores[4]['score']}`, 50, this.d_CanvasHelper.GetWidth() / 2, this.d_CanvasHelper.GetHeight() / 3 + 250)
    }
    protected renderScreen(): void {

    }
    protected OnClick() { }
}