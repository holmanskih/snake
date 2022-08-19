import { List } from "./list"
import { Direction, SnakePart } from "./part"
import { Vector } from "./snake"
import { getScreenRatio } from "./utils"

test('list with initial snake part and part push', () => {
    withMockDom()

    // initial snake part test
    const part1 = withSnakePart(1)
    const list = new List(part1)

    expect(list.len).toBe(1)

    // push new part test
    const part2 = withSnakePart(2)
    list.push(part2)

    expect(list.len).toBe(2)

    // head test
    expect(list.head.prev).toBeUndefined()
    expect(list.head.next?.value.size).toBe(2 * getScreenRatio()) // TODO: check to use just size vs size * screen ratio
    expect(list.head.next?.next).toBeUndefined()
    expect(list.head.next?.prev?.value).toBe(part1)

    // tail test
})

const withMockDom = () => {
    window.innerWidth = 1
    window.innerHeight = 1

    const game = document.createElement("div")
    game.id = "game"
    document.body.appendChild(game)
}

const withSnakePart = (size: number): SnakePart => {
    const position = {x: 0, y: 0}
    const direction = {value: Vector.Right, direction: Direction.Right}
    const part = new SnakePart(position, direction, size)

    return part
}