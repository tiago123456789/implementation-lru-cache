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
        if (this.head.next.value == value) {
            this.head.next = this.head.next.next
            this.head.next.previous = this.head;
            this.totalNodes -= 1
        }

        let item = this.head.next;
        while (item != null) {
            if (item.value == value) {
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
            this.doubleLinkedList.remove(item);
            this.doubleLinkedList.add(item)
        }

        return null
    }

    getKeyValue() {
        console.log(this.keyValue)
        console.log("@@@@@@@@@@@@@@@@@@@@@@")
        this.doubleLinkedList.toString()
    }
}

const lruCache = new LRU(2);
lruCache
        .add("test", "teste")
        .add("test1", "teste1")
        .add("test20", "teste20")
        .add("test200", "teste200")
        .add("test2000", "teste2000")
        .add("test200", "test200")
        .add("test2000", "test2000")
        .add("test1", "teste1")
        .add("test2", "teste1")
        .get("test1")

lruCache.getKeyValue()