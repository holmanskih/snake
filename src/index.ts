import {Game} from "./game.js"
import {Screen} from "./screen.js"

const screen = new Screen(window.innerWidth, window.innerHeight)
new Game(0, 200, screen)