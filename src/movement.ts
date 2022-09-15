import { Position } from "./apple";
import { Direction } from "./part";
import { Keyboard, Vector, VectorDirection } from "./snake";

class Turn {
    // uses to turn the snake. will be undefined if snake is 
    // not turning, otherwise it will habe turn point position.
    // When the snake finishes the turn, turn point should became undefined.
    point: Position | undefined;

    constructor(point: Position) {
        this.point = point
    }
}

export class Movement {
    // snake turns data
    private turns: Turn[] = [];

    // global snake vector direction
    private vector: VectorDirection = {
        value: Vector.Right,
        direction: Direction.Right
    }

    constructor() {

    }

    private hasGlobalDirection(key: Keyboard): boolean {
        if(key == Keyboard.Up && this.vector.direction == Direction.Up) {
            return true
        }

        if(key == Keyboard.Down && this.vector.direction == Direction.Down) {
            return true
        }

        if(key == Keyboard.Left && this.vector.direction == Direction.Left) {
            return true
        }

        if(key == Keyboard.Right && this.vector.direction == Direction.Right) {
            return true
        }

        return false
    }

    // point is turning point of the snake (snake`s head position)
    public turn(key: Keyboard, point: Position) {
        // check if current snake direction is the same
        if(this.hasGlobalDirection(key)) {
            return
        }

        this.addTurn(point)

        switch(key) {
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
    }

    public addTurn(point: Position) {
        const turn = new Turn(point)
        this.turns.push(turn)
    }

    private finishTurn() {
        
    }
}