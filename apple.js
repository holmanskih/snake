class Apple {
    constructor() {
        this.size = 50


        this.elem = document.getElementById('collectable')
        this.game = document.getElementById('game')
    }

    remove() {
        this.elem.remove()
    }

    isExist() {
        if (this.elem) {
            return true
        }
        return false
        // return this.elem !== undefined
        // return this.elem ? true : false
    }

    getPosition() {
        return this.elem.getBoundingClientRect()
    }

    // r1, l2 - snake coordinates (vectors)
    collides(r1, l1) {
        const pos = this.getPosition()
        const l2 = { x: pos.top, y: pos.right }
        const r2 = { x: pos.bottom, y: pos.left }

        const collideStatus = this.isCollide(l1, r1, l2, r2)
        return collideStatus
    }

    // https://www.geeksforgeeks.org/find-two-rectangles-overlap/
    isCollide(l1, r1, l2, r2) {
        // To check if either rectangle is actually a line
        // For example : l1 ={-1,0} r1={1,1} l2={0,-1} r2={0,1}

        if (l1.x == r1.x || l1.y == r1.y ||
            l2.x == r2.x || l2.y == r2.y) {
            // the line cannot have positive overlap
            return false;
        }

        // If one rectangle is on left side of other
        if (l1.x >= r2.x || l2.x >= r1.x) {
            return false;
        }

        // If one rectangle is above other
        if (r1.y >= l2.y || r2.y >= l1.y) {
            return false;
        }

        return true;
    }

    spawn() {
        const position = this.getRandomPosition()
        const collectable = this.createCollectableElem()
        collectable.style.left = `${position.x}px`
        collectable.style.top = `${position.y}px`
    }

    getRandomPosition() {
        const rect = this.game.getBoundingClientRect()
        
        const height = rect.height 
        const width = rect.width 
    
    
        console.log(rect)
    
        let x = Math.floor(Math.random() * width + 1)
    
        let y = Math.floor(Math.random() * height + 1)
    
        if(x > this.size) {
            x -= this.size
        }
    
        if(y > this.size) {
            y -= this.size
        }
    
        return{x: x, y: y}
    }

    createCollectableElem = () => {
        const elem = document.createElement('div')
        elem.id = 'collectable'
        elem.className = 'collectable'
    
        this.game.appendChild(elem)
        return elem
    }
}

export default Apple
