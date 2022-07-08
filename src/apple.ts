type Posion = {
    x: number
    y: number
}

export class Apple {
    private size: number
    private elem: HTMLDivElement
    private game: HTMLDivElement

    public constructor() {
        this.size = 50
        this.elem = document.getElementById('collectable') as HTMLDivElement
        this.game = document.getElementById('game') as HTMLDivElement
    }

    public remove(): void {
        this.elem.remove()
    }

    public isExist(): boolean {
        if (this.elem) {
            return true
        }
        return false
        // return this.elem !== undefined
        // return this.elem ? true : false
    }

    private getPosition(): DOMRect {
        return this.elem.getBoundingClientRect()
    }

    // r1, l2 - snake coordinates (vectors)
    public collides(r1: Posion, l1: Posion): boolean {
        const pos = this.getPosition()
        const l2: Posion = { x: pos.top, y: pos.right }
        const r2: Posion = { x: pos.bottom, y: pos.left }

        const collideStatus = this.isCollide(l1, r1, l2, r2)
        return collideStatus
    }

    // https://www.geeksforgeeks.org/find-two-rectangles-overlap/
    private isCollide(l1: Posion, r1: Posion, l2: Posion, r2: Posion): boolean {
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

    public spawn(): void {
        const position = this.getRandomPosition()
        const collectable = this.createCollectableElem()
        collectable.style.left = `${position.x}px`
        collectable.style.top = `${position.y}px`
    }

    private getRandomPosition(): Posion {
        const rect = this.game.getBoundingClientRect()
        const height = rect.height 
        const width = rect.width 
    
        let x = Math.floor(Math.random() * width + 1)
        let y = Math.floor(Math.random() * height + 1)
    
        if(x > this.size) {
            x -= this.size
        }
        if(y > this.size) {
            y -= this.size
        }
    
        return {x: x, y: y}
    }

    private createCollectableElem = (): HTMLDivElement => {
        const elem = document.createElement('div')
        elem.id = 'collectable'
        elem.className = 'collectable'
    
        this.game.appendChild(elem)
        return elem
    } 
}