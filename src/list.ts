import { SnakePart } from "./snakePart.js"

type Node = {
    value: SnakePart
    next?: Node
}

export class List {
    private head: Node
    private tail: Node
    private len: number

    constructor(value: SnakePart) {
        this.head = {value: value}
        this.tail = this.head
        this.len = 1
    }

    public push(value: SnakePart): void {
        const n: Node = {value: value}

        this.tail.next = n
        this.tail = this.tail.next
        this.len += 1
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