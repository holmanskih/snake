const game = document.getElementById('game')

const size = 50

export const spawnCollectable = () => {
    const position = getRandomPosition()
    const collectable = createCollectableElem()
    collectable.style.left = `${position.x}px`
    collectable.style.top = `${position.y}px`
}

const createCollectableElem = () => {
    const elem = document.createElement('div')
        elem.id = 'collectable'
        elem.className = 'collectable'

        game.appendChild(elem)
        return(elem)
    }

// createCollectableElem()

const getRandomPosition = () => {
    const rect = game.getBoundingClientRect()
    
    const height = rect.height 
    const width = rect.width 


    console.log(rect)

    let x = Math.floor(Math.random() * width + 1)

    let y = Math.floor(Math.random() * height + 1)

    if(x> size) {
        x -= size
    }

    if(y > size) {
        y -= size
    }

    return{x: x, y: y}
}

spawnCollectable()