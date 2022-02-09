class Apple {
    constructor() {
        this.elem = document.getElementById('collectable')
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
}

export default Apple
