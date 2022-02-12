import { DIRECTION } from "./game.js"

class SnakePart {
    constructor(speed, size, speedMult) {
        this.speed = speed
        this.size = size
        this.speedMultX = speedMult
        this.speedMultY = speedMult
        this.direction = DIRECTION.RIGHT

        this.xPosition = 0
        this.yPosition = 0

        this.player = document.getElementById("player")

        window.addEventListener('keydown', (e) => this.handleKeyboardMovementControl(e))
    }

    setXPosition(value) {
        this.player.style.left = `${value}px`
        this.xPosition = value
    }
    
    setYPosition(value) {
        this.player.style.top = `${value}px`
        this.yPosition = value
    }

    getOffsetLeft() {
        return this.player.offsetLeft
    }

    getOffsetTop() {
        return this.player.offsetTop
    }

    getPosition() {
        return this.player.getBoundingClientRect()
    }

    handleKeyboardMovementControl(e) {
        switch(e.code) {
            case KEYBOARD.UP: {
                this.direction = DIRECTION.UP
                this.speedMultY = -1
                break
            }
    
            case KEYBOARD.DOWN: {
                this.speedMultY = 1
                this.direction = DIRECTION.DOWN
                break
            }
    
            case KEYBOARD.LEFT: {
                this.speedMultX = -1
                this.direction = DIRECTION.LEFT
                break
            }
            case KEYBOARD.RIGHT: {
                this.speedMultX = 1
                this.direction = DIRECTION.RIGHT
                break
            }
            
            default: {
                console.log('underfined keyboard event')
            }
        }
    }
}

export default SnakePart