import { SnakePart } from "./part"

type Node = {
    value: SnakePart
    next?: Node
    prev?: Node
}

export class List {
    public head: Node
    public tail: Node
    public len: number

    // Adds reverse movement functionality for Part, when it moves
    // in non standard way: up, left.
    public reverse: boolean

    constructor(value: SnakePart) {
        this.head = {value: value}
        this.tail = this.head
        this.len = 1
        this.reverse = false
    }

    public setReverse(value: boolean): void {
        this.reverse = value
    }

    public push(value: SnakePart): void {
        const pushValue: Node = {value: value, prev: this.tail}
        this.tail.next = pushValue;
        this.tail = pushValue;
        this.len += 1
        
        const head = this.head
    }

    public getTail(): SnakePart {
        return this.tail.value
    }

    public getHead(): SnakePart {
        return this.head.value
    }

    public iterate(f: (part: SnakePart) => void): void {
        if(!this.reverse) {
            let el: Node | undefined = this.head

            while(el != undefined) {
                f(el.value)
                el = el.next
            }
        } else {
            let el: Node | undefined = this.tail

            while(el != undefined) {
                f(el.value)
                el = el.prev
            }
        }
    }
}