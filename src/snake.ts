import { Position } from "./apple.js";
import { Direction, SnakePart } from "./snakePart.js";

export class Snake {
    // private speed: number;
    private size: number;
    private speedMult: number;

    // todo: snake direction
    // todo: snake part moving by tiles

    private parts: SnakePart[] = []

    constructor(size: number, speedMult: number) {
        // this.speed = speed
        this.size = size
        this.speedMult = speedMult

        const initialPart = new SnakePart({x: 0, y: 0}, Direction.Right, size, speedMult)
        this.parts.push(initialPart)
    }

    public grow(): void {
        const tail = this.getTail()
        const nextPartX = tail.position.x - (this.size / 2)
        const growPart = new SnakePart({x: nextPartX, y: tail.position.y}, tail.direction, this.size, this.speedMult)
        this.parts.push(growPart)
    }

    public move(): void {
        for(let i = 0; i < this.parts.length; i++) {
            this.parts[i].move()
        }
    }

    public initRender(): void {
        this.getHead().initRender()
    }

    private getTail(): SnakePart {
        return this.parts[this.parts.length-1]
    }

    private getHead(): SnakePart {
        return this.parts[0]
    }

    public getHeadPosition(): DOMRect {
        return this.getHead().getPosition()
    }
}