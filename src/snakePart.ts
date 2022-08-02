import { getScreenRatio } from "./utils.js";
import { Position } from "./apple.js";

enum Direction {
    Right,
    Left,
    Up,
    Down
}

enum Keyboard {
    Up = "KeyW",
    Right = "KeyD",
    Down = "KeyS",
    Left = "KeyA"
}

class SnakePart {
    public size: number;
    public speedMultX: number;
    public speedMultY: number;
    public direction: Direction;

    public readonly position: Position;

    private player: HTMLDivElement

    public constructor(position: Position, direction: Direction, size: number, speedMult: number) {
        this.size = size * getScreenRatio() // scalable player size with dependency on the screen ratio
        this.speedMultX = speedMult
        this.speedMultY = speedMult
        this.direction = direction
        this.position = position

        // create player part html element
        this.player = document.createElement("div")
        this.player.className = "player"
        this.player.style.width = `${size}px`
        this.player.style.height = `${size}px`

        const rootElement = document.getElementById("game") as HTMLDivElement
        rootElement.appendChild(this.player)

        window.addEventListener('keydown', (e: KeyboardEvent) => this.handleKeyboardMovementControl(e))
    }

    public initRender(): void {
        this.direction = Direction.Right
        this.setXPosition(0)
        this.setYPosition(0)
    }

    public render(): void {
        this.setXPosition(this.position.x)
        this.setYPosition(this.position.y)
    }

    public setXPosition(value: number): void {
        this.player.style.left = `${value}px`
        this.position.x = value
    }
    
    public setYPosition(value: number): void {
        this.player.style.top = `${value}px`
        this.position.y = value
    }

    public getOffsetLeft(): number {
        return this.player.offsetLeft
    }

    public getOffsetTop(): number {
        return this.player.offsetTop
    }

    public getPosition(): DOMRect {
        return this.player.getBoundingClientRect()
    }

    public moveVertical(): void {
        const topRaw = this.player.style.top.substr(0, this.player.style.top.length-2)
        const nextPositionY = Number(topRaw) + (this.size/2) * this.speedMultY

        this.player.style.top = `${nextPositionY}px`
        this.position.y = nextPositionY
    }

    public moveHorizontal(): void {
        const leftRaw = this.player.style.left.substr(0, this.player.style.left.length-2)
        const nextPositionX = Number(leftRaw) + (this.size /2) * this.speedMultX

        this.player.style.left = `${nextPositionX}px`
        this.position.x = nextPositionX
    }

    public move(): void {
        switch (this.direction) {
            case Direction.Left: {
                this.moveHorizontal()
                if (this.getOffsetLeft() <= -this.size) {
                    this.setXPosition(this.getMoveDirection())
                }
                break
            }

            case Direction.Right: {
                this.moveHorizontal()
                if (this.getOffsetLeft() >= this.getMoveDirection()) {
                    this.setXPosition(0)
                }
                break
            }
            
            case Direction.Up: {
                this.moveVertical()
                if (this.getOffsetTop() <= -this.size) {
                    this.setYPosition(this.getMoveDirection())
                }
                break
            }

            case Direction.Down: {
                this.moveVertical()
                if (this.getOffsetLeft() === 0) {
                    this.setYPosition(0)
                }
                break
            }
        }
    }

    private getMoveDirection(): number {
        switch (this.direction) {
            case Direction.Left:
            case Direction.Right: {
                return window.innerWidth
            }
            case Direction.Up:
            case Direction.Down: {
                return window.innerHeight
            }

            default: {
                console.log("underfined direction case", this.direction)
                return 0
            }
        }
    }

    private handleKeyboardMovementControl(e: KeyboardEvent): void {
        switch(e.code) {
            case Keyboard.Up: {
                this.direction = Direction.Up
                this.speedMultY = -1
                break
            }
    
            case Keyboard.Down: {
                this.speedMultY = 1
                this.direction = Direction.Down
                break
            }
    
            case Keyboard.Left: {
                this.speedMultX = -1
                this.direction = Direction.Left
                break
            }
            case Keyboard.Right: {
                this.speedMultX = 1
                this.direction = Direction.Right
                break
            }
            
            default: {
                console.log("undefined keyboard event")
            }
        }
    }
}

export {
    Direction,
    SnakePart
}