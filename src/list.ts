import { SnakePart } from "./part.js"

type Node = {
    value: SnakePart
    next?: Node
    prev?: Node
}

export class List {
    public head: Node
    public tail: Node
    public len: number
    public reverse: boolean

    constructor(value: SnakePart) {
        this.head = {value: value}
        this.tail = this.head
        this.len = 1
        this.reverse = false
    }

    public setReverse(value: boolean): void {
        this.reverse = value
        
        const tail = this.tail
        const head = this.head

        if(value == true) {
            this.tail = head
            this.head = tail
        } else {
            this.head = tail
            this.tail = head
        }
    }

    public push(value: SnakePart): void {
        const pushValue: Node = {value: value, prev: this.tail}
        this.tail.next = pushValue;
        this.tail = pushValue;
        this.len += 1
        
        const head = this.head
        console.log(head);
    }

    public getTail(): SnakePart {
        return this.tail.value
    }

    public getHead(): SnakePart {
        return this.head.value
    }

    public iterate(f: (part: SnakePart) => void): void {
        let el: Node | undefined = this.head

        while(el != undefined) {
            f(el.value)
            el = el.next
        }
    }
}