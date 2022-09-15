import {Game} from "./game"
import {Screen} from "./screen"

const screen = new Screen(window.innerWidth, window.innerHeight)
new Game(0, 200, screen)

// TODO: create history for snake parts to transfer history data on screen brake
// TODO: double check possible errors in position on screen brake (when set setPositionX(0))
// TODO: adjust speed

// TODO: do the turn for snake with length 1
// TODO: do the rurn for snake with length 2 (check the length of the snake on start of the turn, compare snake part local direction with global)