import SnakePart from "./snake.js"
import Apple from "./apple.js"

export const DIRECTION = {
    UP: "UP",
    RIGHT: "RIGHT",
    DOWN: "DOWN",
    LEFT: "LEFT"
}

class Game {
    constructor(score) {
        this.score = score
        //this.direction = DIRECTION.LEFT // DIRECTION

        // can be move to movePlayerAnimation
        this.lastFrameTimeSec = 0
        this.deltaFrameTimeSec = 144
        

        this.scoreElem = document.getElementById("score")
        this.gameWindow = document.getElementById("game-window")
        this.startButton = document.getElementById("start-button")
        this.startButton.addEventListener('click', this.start)

        // snake player
        this.snake = new SnakePart()
    }

    start() {
        console.log(this)
        this.closeGameWindow()
        this.renderPlayer()
    }

    closeGameWindow() {
        this.gameWindow.style.display = "none"
    }
    
    // getSize returns size of player screen
    getSize() {
        switch (this.snake.direction) {
            case DIRECTION.LEFT:
            case DIRECTION.RIGHT: {
                return window.innerWidth
            }
            case DIRECTION.UP:
            case DIRECTION.DOWN: {
                return window.innerHeight
            }

            default: {
                console.log("underfined direction case", this.snake.direction)
            }
        }
    }
    // renderPlayer = movePlayer
    renderPlayer() {
        this.snake.direction = DIRECTION.RIGHT
        this.snake.setXPosition(0)
        this.snake.setYPosition(0)
        window.requestAnimationFrame(this.movePlayerAnimation);
    }

    movePlayerAnimation(t) {
        console.log(this)
        const currFrameTimeSec = t * 1000
        if (currFrameTimeSec - this.lastFrameTimeSec >= this.deltaFrameTimeSec) {

            console.log('direction', this.snake.direction, 'x', this.snake.xPosition, 'y', this.snake.yPosition)

            switch (this.snake.direction) {
                case DIRECTION.LEFT: {
                    moveHorizontal()
                    if (this.player.getOffsetLeft() <= -PLAYER_SIZE) {
                        this.snake.setXPosition(this.getSize())
                    }
                    break
                }

                case DIRECTION.RIGHT: {
                    moveHorizontal()
                    if (this.player.getOffsetLeft() >= this.getSize()) {
                        this.snake.setXPosition(0)
                    }
                    break
                }
                
                case DIRECTION.UP: {
                    moveVertical()
                    if (this.player.getOffsetTop() <= -PLAYER_SIZE) {
                        this.snake.setYPosition(this.getSize())
                    }
                    break
                }

                case DIRECTION.DOWN: {
                    moveVertical()
                    if (this.player.getOffsetLeft() === 0) {
                        this.snake.setYPosition(0)
                    }
                    break
                }
            }

            ///track collision
            const position = this.player.getPosition()
            console.log('rect', position)

            const l1 = { x: position.top, y: position.right }
            const r1 = { x: position.bottom, y: position.left }

            const apple = new Apple()
            const isAppleExists = apple.isExist()

            if(isAppleExists) {
                const appleCollides = apple.collides()
                if(appleCollides) {
                    this.respawnApple(apple)
                }
            }

            // const collectable = document.getElementById('collectable')
            // if (collectable) {
            //     const collectableRect = collectable.getBoundingClientRect()

            //     const l2 = { x: collectableRect.top, y: collectableRect.right }
            //     const r2 = { x: collectableRect.bottom, y: collectableRect.left }

            //     console.log(l1, r1)
            //     console.log(l2, r2)

            //     const collides = isCollide(l1, r1, l2, r2)
            //     if (collides) {
            //         console.log('collides', collides)
            //         const bonusElem = document.getElementById("collectable")
            //         bonusElem.remove()
            //         score++
            //         scoreElem.innerText = score

            //         // create new bonus element
            //         spawnCollectable()
            //     }
            // }

        }
        window.requestAnimationFrame(this.movePlayerAnimation);
    }

    respawnApple(currentApple) {
        currentApple.remove()
        this.updateScore()
        currentApple.spawn()
    }

    updateScore() {
        this.score++
        this.scoreElem.innerText = this.score
    }
}

export default Game