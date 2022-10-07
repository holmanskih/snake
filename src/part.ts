import { Position } from "./apple";
import { Screen } from "./screen";
import { Vector, VectorDirection } from "./snake";

enum Direction {
    Right,
    Left,
    Up,
    Down
}

class SnakePart {
    public size: number;
    public vector: VectorDirection
    public readonly position: Position; // set this data by setter ad get by getter to avoid reference usage
    public player: HTMLDivElement

    public constructor(position: Position, vector: VectorDirection, size: number) {
        this.size = size
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
        console.log(`pos y ${this.position.y}`);
    }

    public moveHorizontal(): void {
        const leftRaw = this.player.style.left.substr(0, this.player.style.left.length-2)
        const nextPositionX = Number(leftRaw) + (this.size /2) * this.vector.value

        this.player.style.left = `${nextPositionX}px`
        this.position.x = nextPositionX
    }

    public move(screen: Screen, direction?: Direction): void {
        let dir = this.vector.direction

        if(direction !== undefined) {
            dir = direction

            // todo: use this logic as common for part.ts and movement.ts
            switch(direction) {
                case Direction.Up: {
                    this.vector = {value: Vector.Up, direction: Direction.Up}
                    break
                }
                case Direction.Down: {
                    this.vector = {value: Vector.Down, direction: Direction.Down}
                    break
                }
                case Direction.Left: {
                    this.vector = {value: Vector.Left, direction: Direction.Left}
                    break
                }
                case Direction.Right: {
                    this.vector = {value: Vector.Right, direction: Direction.Right}
                    break
                }
                default: {
                    console.log("undefined keyboard event")
                }
            }

            this.vector.direction = direction
        }

        switch (dir) {
            case Direction.Left: {
                if (this.getOffsetLeft() <= -this.size) {
                    this.setXPosition(screen.getWidth())
                    break
                }

                this.moveHorizontal()
                break
            }

            case Direction.Right: {
                if (this.getOffsetLeft() >= screen.getWidth()) {
                    this.setXPosition(0)
                    break
                }

                this.moveHorizontal()
                break
            }
            
            case Direction.Up: {
                if (this.getOffsetTop() <= -this.size) {
                    this.setYPosition(screen.getHeight())
                    break
                }

                this.moveVertical()
                break
            }

            case Direction.Down: {
                if (this.getOffsetTop() >= screen.getHeight()) {
                    this.setYPosition(0)
                    break
                }

                this.moveVertical()
                break
            }
        }
    }
}

export {
    Direction,
    SnakePart
}