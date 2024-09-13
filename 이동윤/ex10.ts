class Collection<T> {
    private readonly arr = Array<T>();

    constructor(...args: T[]) {
        this.arr.push(...args);
    }

    get _arr() {
        return this.arr;
    }

    push(...args: T[]) {
        this.arr.push(...args);
        return this.arr;
    }
}

export interface Node<T> {
    value: T;
    rest?: Node<T>;
}

// ArrayList 클래스를 작성하세요.
class ArrayList<T> extends Collection<T> {
    public static listToArray(list: Node<any>): any[] {
        const arr: any[] = [];
        let cur = list;
        while (true) {
            arr.push(cur.value);
            if (cur.rest === undefined) {
                break;
            }
            cur = cur.rest as Node<any>;
        }

        return arr;
    }

    public static arrayToList(arr: any[]): Node<any> {
        if (arr.length === 0) {
            throw Error("Empty array");
        }

        let node: Node<any> = { value: arr[0] };
        let cur = node;
        for (let i = 1; i < arr.length; i++) {
            cur.rest = { value: arr[i] };
            cur = cur.rest;
        }

        return node;
    }

    private node: Node<T> | null;

    constructor(arr: T[]) {
        super();
        this.push(...arr);
        this.node = ArrayList.arrayToList(this._arr) as Node<T>;
    }

    toString(): string {
        const listToString = (node: Node<T> | undefined): string => {
            if (!node) {
                return "";
            }
            return (
                `{ value: ${node.value}` +
                (node.rest ? `, rest: ${listToString(node.rest)} }` : " }")
            );
        };
        return listToString(this.node as Node<T>);
    }

    add(addValue: T, index: number = this.size()): Node<T> {
        let cur: Node<T> | undefined = this.getNode(index - 1);
        if (index === this.size()) {
            cur.rest = { value: addValue };
        } else {
            cur.rest = { value: addValue, rest: cur.rest };
        }
        return this.node as Node<T>;
    }

    remove(removeValue: T): Node<T> | undefined {
        if (this.isEmpty()) {
            throw Error("Empty Node");
        }
        if (this.node!.value === removeValue) {
            this.node == (this.node!.rest as Node<T>);
            return this.node!;
        }

        let cur: Node<T> | undefined = this.node as Node<T>;
        while (cur?.rest !== undefined) {
            if (cur?.rest.value === removeValue) {
                cur.rest = cur.rest.rest;
                return this.node!;
            }
            cur = cur.rest;
        }
        return this.node!;
    }

    removeByIndex(index: number): Node<T> | undefined {
        if (index === 0) {
            this.node = this.node?.rest as Node<T>;
            return this.node!;
        }

        let node: Node<T> | undefined = this.getNode(index - 1);
        node.rest = node.rest?.rest;
        return this.node!;
    }

    set(index: number, updateValue: T): Node<T> | undefined {
        this.getNode(index).value = updateValue;
        return this.node!;
    }

    getNode(index: number) {
        if (this.isEmpty()) {
            throw Error("Empty Node");
        }

        if (index < 0) {
            throw Error("Negative Index is impossible");
        }

        let cur: Node<T> | undefined = this.node as Node<T>;

        for (
            let depth: number = 0;
            cur !== undefined && depth < index;
            cur = cur.rest, depth++
        );

        if (cur === undefined) {
            throw Error("Index out of range");
        }

        return cur;
    }

    get(index: number) {
        return this.getNode(index).value;
    }

    indexOf(value: T): number | undefined {
        if (!this.node) {
            return undefined;
        }

        let cur: Node<T> | undefined = this.node as Node<T>;
        let index = 0;
        while (cur !== undefined) {
            if (cur.value === value) {
                return index;
            }
            cur = cur.rest;
            index++;
        }

        return undefined;
    }

    contains(value: T): boolean {
        return this.indexOf(value) !== undefined;
    }

    isEmpty(): boolean {
        return this.node === null;
    }

    peek() {
        return this.get(this.size() - 1);
    }

    size(): number {
        let cur: Node<T> | undefined = this.node as Node<T>;

        let depth: number = 1;
        while (cur.rest !== undefined) {
            cur = cur.rest;
            depth++;
        }

        return depth;
    }

    clear() {
        this.node = null;
        console.log("All clear");
    }

    iterator() {
        let cur = this.node as Node<T>;
        return {
            next(): { value: T | undefined; done: boolean } {
                if (cur === undefined) {
                    return { value: undefined, done: true };
                }

                let value = cur.value;
                cur = cur.rest as Node<T>;
                return { value, done: false };
            },
        };
    }

    toArray(): T[] {
        let cur: Node<T> = this.node as Node<T>;
        const arr: any[] = [];
        while (cur !== undefined) {
            arr.push(cur.value);
            cur = cur.rest as Node<T>;
        }
        return arr;
    }
}

export { ArrayList };
