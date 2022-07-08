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
    public speed: number;
    public size: number;
    public speedMultX: number;
    public speedMultY: number;
    public direction: Direction;

    private xPosition: number;
    private yPosition: number;

    private player: HTMLDivElement

    public constructor(speed: number, size: number, speedMult: number) {
        this.speed = speed
        this.size = size
        this.speedMultX = speedMult
        this.speedMultY = speedMult
        this.direction = Direction.Right

        this.xPosition = 0
        this.yPosition = 0

        this.player = document.getElementById("player") as HTMLDivElement

        window.addEventListener('keydown', (e: KeyboardEvent) => this.handleKeyboardMovementControl(e))
    }

    public setXPosition(value: number): void {
        this.player.style.left = `${value}px`
        this.xPosition = value
    }
    
    public setYPosition(value: number): void {
        this.player.style.top = `${value}px`
        this.yPosition = value
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
        this.player.style.top = `${Number(topRaw) + this.speed * this.speedMultY}px`
    }

    public moveHorizontal(): void {
        const leftRaw = this.player.style.left.substr(0, this.player.style.left.length-2)
        this.player.style.left = `${Number(leftRaw) + this.speed * this.speedMultX}px`
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
                console.log('undefined keyboard event')
            }
        }
    }
}

export {
    Direction,
    SnakePart
}