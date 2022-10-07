import { List } from "./list";
import { Movement } from "./movement";
import { Direction, SnakePart } from "./part";
import { Screen } from "./screen";

export enum Keyboard {
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
    public parts: List;
    private mov: Movement;

    constructor(size: number, vector: VectorDirection) {
        this.mov = new Movement()

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

    public move(screen: Screen): void {
        let i = 0
        this.parts.iterate((part: SnakePart) => {
            console.log(`index: ${i} pos x ${part.position.x} y ${part.position.y}`)
            this.mov.move(part, screen)
            i++
        })
    }

    // private updateDirection(): void {
    //     this.parts.iterate((part: SnakePart) => {
    //         part.vector = this.vector
    //     })
    // }

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
        if(!this.parts.reverse) {
            return this.getHead().getPosition()
        } else {
            return this.getTail().getPosition()
        }
    }

    private onKeyDown(e: KeyboardEvent): void {
        const turnPoint = this.getHead().position
        this.mov.turn(e.code as Keyboard, turnPoint, this.parts.len)

        switch(e.code) {
            case Keyboard.Left: {
                this.parts.setReverse(true)
                break
            }
            case Keyboard.Right: {
                this.parts.setReverse(false)
                break
            }
        }

        // this.updateDirection()
    }
}