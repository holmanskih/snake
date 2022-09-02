import { List } from "./list";
import { Direction, SnakePart } from "./part";

enum Keyboard {
    Up = "KeyW",
    Right = "KeyD",
    Down = "KeyS",
    Left = "KeyA"
}

export enum Vector {
    Right = 1,
    Left = -1,
    Up = -1,
    Down = 1,
}

export type VectorDirection = {
    value: Vector
    direction: Direction
}

export class Snake {
    private size: number;

    // snake global direction, by default is right
    private vector: VectorDirection = {
        value: Vector.Right,
        direction: Direction.Right
    }
    
    public parts: List;

    constructor(size: number, vector: VectorDirection) {
        this.size = size

        const initialPart = new SnakePart({x: 0, y: 0}, vector, size)
        this.parts = new List(initialPart)
        // this.parts.push(initialPart)

        window.addEventListener('keydown', (e: KeyboardEvent) => this.onKeyDown(e))
    }

    public grow(): void {
        const tail = this.getTail()
        const nextPartX = tail.position.x - (this.size / 2)
        const growPart = new SnakePart({x: nextPartX, y: tail.position.y}, tail.vector, this.size)
        growPart.render() // update css position
        this.parts.push(growPart)
    }

    public move(): void {
        this.parts.iterate((part: SnakePart) => {
            part.move()
        })
    }

    private updateDirection(): void {
        this.parts.iterate((part: SnakePart) => {
            part.vector = this.vector
        })
    }

    public initRender(): void {
        this.getHead().initRender()
    }

    private getTail(): SnakePart {
        return this.parts.getTail()
    }

    private getHead(): SnakePart {
        return this.parts.getHead()
    }

    public getHeadPosition(): DOMRect {
        return this.getHead().getPosition()
    }

    private onKeyDown(e: KeyboardEvent): void {
        switch(e.code) {
            case Keyboard.Up: {
                this.vector = {value: Vector.Up, direction: Direction.Up}
                break
            }
            case Keyboard.Down: {
                this.vector = {value: Vector.Down, direction: Direction.Down}
                break
            }
            case Keyboard.Left: {
                this.vector = {value: Vector.Left, direction: Direction.Left}
                break
            }
            case Keyboard.Right: {
                this.vector = {value: Vector.Right, direction: Direction.Right}
                break
            }
            default: {
                console.log("undefined keyboard event")
            }
        }

        this.updateDirection()
    }
}