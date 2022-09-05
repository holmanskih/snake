import {Game} from "./game"
import {Screen} from "./screen"

const screen = new Screen(window.innerWidth, window.innerHeight)
new Game(0, 200, screen)

// TODO: create history for snake parts to transfer history data on screen brake
// TODO: double check possible errors in position on screen brake (when set setPositionX(0))
// TODO: adjust speed
