class SnakePart {
    constructor(speed, size, speedMult) {
        this.speed = speed
        this.size = size
        this.speedMultX = speedMult
        this.speedMultY = speedMult

        this.xPosition = 0
        this.yPosition = 0

        this.player = document.getElementById("player")
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
}

export default SnakePart