const isCollide = (l1, r1, l2, r2) => { 
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

const collisionResult1 = isCollide({x: -1, y:0}, {x: 1, y:1}, {x:0, y: -1}, {x: 0, y: 1})
console.log(collisionResult1)

const collisionResult2 = isCollide({x: -10, y:10}, {x: -5, y:5}, {x: -8, y: 8}, {x: -4, y: 4})
console.log(collisionResult2)

const collisionResult3 = isCollide({x: -10, y:10}, {x: -5, y:5}, {x: -4.9, y: 8}, {x: -0.9, y: 4})
console.log(collisionResult3)
