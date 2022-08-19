import { getScreenRatio } from "./utils";
import { Position } from "./apple";
import { VectorDirection } from "./snake";

enum Direction {
    Right,
    Left,
    Up,
    Down
}

class SnakePart {
    public size: number;
    public vector: VectorDirection
    public readonly position: Position;
    private player: HTMLDivElement

    public constructor(position: Position, vector: VectorDirection, size: number) {
        this.size = size * getScreenRatio() // TODO: scalable player size with dependency on the screen ratio
        this.vector = vector
        this.position = position

        // create player part html element
        this.player = document.createElement("div")
        this.player.className = "player"
        this.player.style.width = `${size}px`
        this.player.style.height = `${size}px`

        const rootElement: HTMLDivElement = document.getElementById("game") as HTMLDivElement
        rootElement.appendChild(this.player)
    }

    public initRender(): void {
        // this.direction = Direction.Right
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
        const nextPositionY = Number(topRaw) + (this.size/2) * this.vector.value

        this.player.style.top = `${nextPositionY}px`
        this.position.y = nextPositionY
    }

    public moveHorizontal(): void {
        const leftRaw = this.player.style.left.substr(0, this.player.style.left.length-2)
        const nextPositionX = Number(leftRaw) + (this.size /2) * this.vector.value

        this.player.style.left = `${nextPositionX}px`
        this.position.x = nextPositionX
    }

    public move(): void {
        switch (this.vector.direction) {
            case Direction.Left: {
                this.moveHorizontal()
                if (this.getOffsetLeft() <= -this.size) {
                    this.setXPosition(this.getMoveDirection())
                }
                break
            }

            case Direction.Right: {
                if (this.getOffsetLeft() >= this.getMoveDirection()) {
                    this.setXPosition(0)
                }
                this.moveHorizontal()
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
        switch (this.vector.direction) {
            case Direction.Left:
            case Direction.Right: {
                return window.innerWidth
            }
            case Direction.Up:
            case Direction.Down: {
                return window.innerHeight
            }

            default: {
                console.log("underfined direction case", this.vector)
                return 0
            }
        }
    }
}

export {
    Direction,
    SnakePart
}