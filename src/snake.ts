import { Position } from "./apple.js";
import { SnakePart } from "./snakePart.js";

export class Snake {
    private speed: number;
    private size: number;
    private speedMult: number;

    // todo: snake direction
    // todo: snake part moving by tiles

    private parts: SnakePart[] = []

    constructor(speed: number, size: number, speedMult: number) {
        this.speed = speed
        this.size = size
        this.speedMult = speedMult

        const initialPart = new SnakePart(speed, size, speedMult)
        this.parts.push(initialPart)
    }

    public grow(): void {
        const growPart = new SnakePart(this.speed, this.size, this.speedMult)
        this.parts.push(growPart)
    }

    public move(): void {
        for(let i = 0; i < this.parts.length; i++) {
            this.parts[i].move()
        }
    }

    public initRender(): void {
        this.getFirstPart().initRender()
    }

    private getFirstPart(): SnakePart {
        return this.parts[0]
    }

    public getHeadPosition(): DOMRect {
        return this.getFirstPart().getPosition()
    }
}