class DoubleLinkedList {

    constructor() {
        this.head = {}
        this.current = null;
        this.totalNodes = 0
    }

    add(value) {
        if (!this.current) {
            this.head.next = { value, previous: this.head, next: null };
            this.current = this.head.next
        } else {
            this.current.next = { value, previous: this.current, next: null };
            this.current = this.current.next;
        }
        this.totalNodes += 1
        return this;
    }

    getLastNodeAdded() {
        return this.current;
    }

    remove(value) {
        if (this.head.next.value.value == value) {
            this.head.next = this.head.next.next
            this.head.next.previous = this.head;
            this.totalNodes -= 1
        }

        let item = this.head.next;
        while (item != null) {
            if (item.value.value == value) {
                item.previous.next = item.next
                item.previous.next.previous = item.previous
                this.totalNodes -= 1
                return this;
            }

            item = item.next
        }

        return this;
    }

    getFirstItem() {
        return this.head.next;
    }

    toString(node = "") {
        let item = node == "" ? this.head.next : node.next;
        if (item == null) {
            return;
        }
        console.log(item.value)
        this.toString(item)
    }

    getTotalNodes() {
        return this.totalNodes;
    }
}

class LRU {

    constructor(capacity) {
        this.capacity = capacity;
        this.keyValue = {}
        this.doubleLinkedList = new DoubleLinkedList();
    }

    add(key, value) {
        if (this.doubleLinkedList.getTotalNodes() >= this.capacity) {
            const firstItem = this.doubleLinkedList.getFirstItem();
            delete this.keyValue[firstItem.value.key]
            this.doubleLinkedList.remove(firstItem.value)
            this.doubleLinkedList.add({ key, value })
            this.keyValue[key] = this.doubleLinkedList.getLastNodeAdded();
            return this;
        }
        this.doubleLinkedList.add({ key, value })
        this.keyValue[key] = this.doubleLinkedList.getLastNodeAdded();
        return this;
    }

    get(key) {
        const item = this.keyValue[key];
        if (item) {
            delete this.keyValue[key]
            this.doubleLinkedList.remove(item.value.value);
            this.doubleLinkedList.add(item.value)
        }

        return null
    }

    getKeyValue() {
        console.log(this.keyValue)
        // console.log("@@@@@@@@@@@@@@@@@@@@@@")
        // this.doubleLinkedList.toString()
    }
}

const lruCache = new LRU(2);
lruCache
        .add("test", "teste") // RECENTLY USAGE
        .add("test1", "teste1")
        .get("test")

lruCache
        .add("test2", "test") // MAINTAIN [test, test2]
        .get("test")

lruCache.add("john", "mary") // MAINTAIN [test, john]

    

lruCache.getKeyValue()