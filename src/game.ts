import {Apple} from "./apple"
import { Snake, Vector, VectorDirection } from "./snake";
import { Direction } from "./part";
import { Screen } from "./screen";
import { AudioManager } from "./audio_manager";
import { SOUND_CLICK, SOUND_OBSTACLE } from "./constants";
import { UIControl } from "./ui/control";

enum GameState {
    Resume,
    Pause,
}

export class Game {
    private state: GameState = GameState.Resume

    public screen: Screen;

    private lastFrameTimeMs: number;
    private deltaFrameTimeMs: number;

    private gameWindow: HTMLDivElement;
    private startButton: HTMLButtonElement;
    private soundInputElem: HTMLInputElement;

    private uiControl: UIControl;
    public snake: Snake;

    constructor(deltaFrameTimeMs: number, screen: Screen) {
        this.screen = screen

        // can be move to movePlayerAnimation
        this.lastFrameTimeMs = 0
        this.deltaFrameTimeMs = deltaFrameTimeMs

        this.gameWindow = document.getElementById("game-window") as HTMLDivElement
        this.startButton = document.getElementById("start-button") as HTMLButtonElement
        this.soundInputElem = document.getElementById("sound-input") as HTMLInputElement

        this.startButton.addEventListener('click', () => this.start())
        this.soundInputElem.addEventListener('change', (e) => this.onSoundInputChange(e))

        this.uiControl = new UIControl(() => this.pause())

        // snake player
        const initSnakeDirection: VectorDirection = {
            value: Vector.Right,
            direction: Direction.Right
        }
        this.snake = new Snake(100, initSnakeDirection)
    }

    private pause(): void {
        this.state = (this.state == GameState.Resume) ? GameState.Pause : GameState.Resume
    }

    // todo: add event type
    private onSoundInputChange = (e: any): void => {
        const value = Number(e.target.value)
        AudioManager.getInstance().setVolume(value)
    }

    private start(): void {
        AudioManager.getInstance().play(SOUND_CLICK)
        this.closeGameWindow()

        // render
        this.uiControl.render()
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
        if(this.state == GameState.Resume) {
            const currFrameTimeMs = t
            if (currFrameTimeMs - this.lastFrameTimeMs >= this.deltaFrameTimeMs) {
                this.lastFrameTimeMs = t
                this.snake.move(this.screen)

                // track apple collision with snake part
                const snakePosition = this.snake.getHeadPosition()
                this.checkCollision(snakePosition)
            }
        }
        
        window.requestAnimationFrame((f) => this.movePlayerAnimation(f));
    }

    private checkCollision(snakePosition: DOMRect): void {
        const l1 = { x: snakePosition.top, y: snakePosition.right }
        const r1 = { x: snakePosition.bottom, y: snakePosition.left }

        const apple = new Apple()

        if(apple.isExist()) {
            if(apple.collides(r1, l1)) {
                AudioManager.getInstance().play(SOUND_OBSTACLE)
                this.respawnApple(apple)
                this.snake.grow()
            }
        } else {
            apple.spawn()
        }
    }

    private respawnApple(currentApple: Apple) {
        currentApple.remove()
        this.uiControl.updateScore()
        currentApple.spawn()
    }
}