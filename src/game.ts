import {Apple} from "./apple.js"
import { Snake, Vector, VectorDirection } from "./snake.js";
import { Direction } from "./part.js";

export class Game {
    private score: number;
    private lastFrameTimeMs: number;
    private deltaFrameTimeMs: number;

    private scoreElem: HTMLDivElement;
    private gameWindow: HTMLDivElement;
    private startButton: HTMLButtonElement;

    private snake: Snake;

    constructor(score: number, deltaFrameTimeMs: number) {
        this.score = score

        // can be move to movePlayerAnimation
        this.lastFrameTimeMs = 0
        this.deltaFrameTimeMs = deltaFrameTimeMs

        this.scoreElem = document.getElementById("score") as HTMLDivElement
        this.gameWindow = document.getElementById("game-window") as HTMLDivElement
        this.startButton = document.getElementById("start-button") as HTMLButtonElement
        this.startButton.addEventListener('click', () => this.start())

        // snake player
        const initSnakeDirection: VectorDirection = {
            value: Vector.Right,
            direction: Direction.Right
        }
        this.snake = new Snake(100, initSnakeDirection)
    }

    private start(): void {
        this.closeGameWindow()
        this.renderPlayer()
    }

    private closeGameWindow(): void {
        this.gameWindow.style.display = "none"
    }
    
    private renderPlayer(): void {
        this.snake.initRender()
        window.requestAnimationFrame((t) => this.movePlayerAnimation(t));
    }

    private movePlayerAnimation(t: DOMHighResTimeStamp): void {
        const currFrameTimeMs = t
        if (currFrameTimeMs - this.lastFrameTimeMs >= this.deltaFrameTimeMs) {
            this.lastFrameTimeMs = t
            this.snake.move()

            // track apple collision with snake part
            const snakePosition = this.snake.getHeadPosition()
            this.spawnApple(snakePosition)
        }
        
        window.requestAnimationFrame((f) => this.movePlayerAnimation(f));
    }

    private spawnApple(snakePosition: DOMRect): void {
        const l1 = { x: snakePosition.top, y: snakePosition.right }
        const r1 = { x: snakePosition.bottom, y: snakePosition.left }

        const apple = new Apple()

        if(apple.isExist()) {
            if(apple.collides(r1, l1)) {
                this.respawnApple(apple)
                this.snake.grow()
            }
        } else {
            apple.spawn()
        }
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