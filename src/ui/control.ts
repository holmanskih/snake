// game ui control controls pause and score functionality in game
export class UIControl {
    private gameControlElem: HTMLDivElement
    private pauseButtonElem: HTMLButtonElement
    private scoreElem: HTMLDivElement;

    private score: number = 0

    constructor(pauseCallback: () => void) {
        this.gameControlElem = document.getElementById("game-control") as HTMLDivElement
        this.scoreElem = document.getElementById("score") as HTMLDivElement
        this.pauseButtonElem = document.getElementById("pause-btn") as HTMLButtonElement

        this.pauseButtonElem.addEventListener('click', () => this.onPauseClick(pauseCallback))
    }

    public render() {
        this.gameControlElem.style.visibility = "visible"
    }

    public updateScore() {
        this.score++
        this.scoreElem.innerText = this.score.toString()
    }

    private onPauseClick(pauseCallback: () => void) {
        pauseCallback()
    }
}