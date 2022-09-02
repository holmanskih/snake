import { Game } from "./game"
import { Vector } from "./snake"
import { Screen } from "./screen"

test('move snake of length 2 in the right screen part', () => {
    withMockDom()

    const screen = new Screen(2000, 1000)
    const game = new Game(0, 200, screen)
    
    // set position for first part to width of the screen
    game.snake.parts.getHead().setXPosition(window.innerWidth)
    expect(game.snake.parts.getHead().position.x).toBe(window.innerWidth)
    expect(game.snake.parts.getHead().position.y).toBe(0)

    game.snake.grow() // increase the snake length to size 2
    expect(game.snake.parts.len).toBe(2)

    // set 2d part position the same as 1st part
    const tail = game.snake.parts.getTail()
    const headPosition = game.snake.parts.getHead().position
    tail.setXPosition(headPosition.x)
    tail.setYPosition(headPosition.y)

    expect(game.snake.parts.getTail().position.x).toBe(headPosition.x)
    expect(game.snake.parts.getTail().position.y).toBe(headPosition.y)

    // move second part to the left in order to place second part right after the first part
    game.snake.parts.getTail().vector.value = Vector.Left
    game.snake.parts.getTail().moveHorizontal()

    console.log(window.innerWidth);
    console.log(window.innerHeight);
    console.log(game.snake.parts.getHead().position)
    console.log(game.snake.parts.getTail().position)


    // todo: move window sizes to Size class sizes
    // todo: move snake (first part behind the screen)
    // todo: move snake (second part behind the screen)
    // todo: move snake (first, second part from start of the screen)
})


const withMockDom = () => {
    window.innerWidth = 1
    window.innerHeight = 1

    const game = createEl("div", "game")
    const score = createEl("div", "score")
    const gameWindow = createEl("div", "game-window")
    const startButton = createEl("button", "start-button")
    document.body.append(game, score, gameWindow, startButton)
}

const createEl = (name: string, id: string): HTMLElement => {
    const el = document.createElement(name)
    el.id = id
    return el
}