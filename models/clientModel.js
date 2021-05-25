class Client {
    constructor(id) {
        this.id = id;
    }
    print() {
        console.log(this.id);
    }
}

let c = new Client(55);

c.print();