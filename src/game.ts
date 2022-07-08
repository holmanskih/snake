import {SnakePart, Direction} from "./snakePart.js"
import {Apple} from "./apple.js"

export class Game {
    private score: number;
    private lastFrameTimeSec: number;
    private deltaFrameTimeSec: number;

    private scoreElem: HTMLDivElement;
    private gameWindow: HTMLDivElement;
    private startButton: HTMLButtonElement;

    private snake: SnakePart;

    constructor(score: number) {
        this.score = score

        // can be move to movePlayerAnimation
        this.lastFrameTimeSec = 0
        this.deltaFrameTimeSec = 144

        this.scoreElem = document.getElementById("score") as HTMLDivElement
        this.gameWindow = document.getElementById("game-window") as HTMLDivElement
        this.startButton = document.getElementById("start-button") as HTMLButtonElement
        this.startButton.addEventListener('click', () => this.start())

        // snake player
        this.snake = new SnakePart(5, 100, 1)
    }

    private start(): void {
        this.closeGameWindow()
        this.renderPlayer()
    }

    private closeGameWindow(): void {
        this.gameWindow.style.display = "none"
    }
    
    private getSize(): number {
        switch (this.snake.direction) {
            case Direction.Left:
            case Direction.Right: {
                return window.innerWidth
            }
            case Direction.Up:
            case Direction.Down: {
                return window.innerHeight
            }

            default: {
                console.log("underfined direction case", this.snake.direction)
                return 0
            }
        }
    }

    private renderPlayer(): void {
        this.snake.direction = Direction.Right
        this.snake.setXPosition(0)
        this.snake.setYPosition(0)
        window.requestAnimationFrame((t) =>this.movePlayerAnimation(t));
    }

    private movePlayerAnimation(t: DOMHighResTimeStamp): void {
        const currFrameTimeSec = t * 1000
        if (currFrameTimeSec - this.lastFrameTimeSec >= this.deltaFrameTimeSec) {
            switch (this.snake.direction) {
                case Direction.Left: {
                    this.snake.moveHorizontal()
                    if (this.snake.getOffsetLeft() <= -this.snake.size) {
                        this.snake.setXPosition(this.getSize())
                    }
                    break
                }

                case Direction.Right: {
                    this.snake.moveHorizontal()
                    if (this.snake.getOffsetLeft() >= this.getSize()) {
                        this.snake.setXPosition(0)
                    }
                    break
                }
                
                case Direction.Up: {
                    this.snake.moveVertical()
                    if (this.snake.getOffsetTop() <= -this.snake.size) {
                        this.snake.setYPosition(this.getSize())
                    }
                    break
                }

                case Direction.Down: {
                    this.snake.moveVertical()
                    if (this.snake.getOffsetLeft() === 0) {
                        this.snake.setYPosition(0)
                    }
                    break
                }
            }

            // track collision
            const position = this.snake.getPosition()

            const l1 = { x: position.top, y: position.right }
            const r1 = { x: position.bottom, y: position.left }

            const apple = new Apple()
            const isAppleExists = apple.isExist()
            

            if(isAppleExists) {
                const appleCollides = apple.collides(r1, l1)
                if(appleCollides) {
                    this.respawnApple(apple)
                }
            } else {
                apple.spawn()
            }
        }
        
        window.requestAnimationFrame((f) => this.movePlayerAnimation(f));
    }

    private respawnApple(currentApple: Apple) {
        currentApple.remove()
        this.updateScore()
        currentApple.spawn()
    }

    private updateScore() {
        this.score++
        this.scoreElem.innerText = this.score.toString()
    }
}