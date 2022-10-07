import { Position } from "./apple";
import { Direction, SnakePart } from "./part";
import { Keyboard, Vector, VectorDirection } from "./snake";
import { Screen } from "./screen";

class Turn {
    // uses to turn the snake. will be undefined if snake is 
    // not turning, otherwise it will habe turn point position.
    // When the snake finishes the turn, turn point should became undefined.
    point: Position | undefined;
    direction: Direction;

    // the number of parts to be processed by this turn.
    // uses to remove the turn from Movement if n is 0.
    n: number

    constructor(point: Position, direction: Direction, n: number) {
        this.point = point
        this.direction = direction
        this.n = n
    }

    public hasSamePosition(point: Position): boolean {
        return this.point == point
    }

    public decreaseN(): boolean {
        this.n--
        return this.n == 0
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
    public turn(key: Keyboard, point: Position, n: number) {
        // check if current snake direction is the same
        if(this.hasGlobalDirection(key)) {
            return
        }

        switch(key) {
            case Keyboard.Up: {
                this.addTurn(point, Direction.Up, n)
                this.vector = {value: Vector.Up, direction: Direction.Up}
                break
            }
            case Keyboard.Down: {
                this.addTurn(point, Direction.Down, n)
                this.vector = {value: Vector.Down, direction: Direction.Down}
                break
            }
            case Keyboard.Left: {
                this.addTurn(point, Direction.Left, n)
                this.vector = {value: Vector.Left, direction: Direction.Left}
                break
            }
            case Keyboard.Right: {
                this.addTurn(point, Direction.Right, n)
                this.vector = {value: Vector.Right, direction: Direction.Right}
                break
            }
            default: {
                console.log("undefined keyboard event")
            }
        }

    }

    public move(part: SnakePart, screen: Screen) {
        const partPos = part.position

        if(this.turns.length >0) {
            debugger
        }
        // check if part position is the same as turn position.
        // if it is true, move the part by turn direction.
        // each part can have only one turn point.
        for (let i = 0; i < this.turns.length; i++) {
            const turn = this.turns[i];
            if(turn.hasSamePosition(partPos)) {
                // move part by turn direction
                part.move(screen, turn.direction)

                const zeroTurn = this.turns[i].decreaseN()
                if(zeroTurn) {
                    this.turns.splice(i, 1) // todo: doesnt work when the n = 0
                }
                return
            }
        }

        part.move(screen)
    }

    public addTurn(point: Position, direction: Direction, n: number) {
        const turn = new Turn(point, direction, n)
        this.turns.push(turn)
    }

    private finishTurn() {
        
    }
}