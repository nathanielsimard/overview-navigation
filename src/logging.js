class Logger {
    constructor(name) {
        this.name = name;
    }

    log(message) {
        global.log(this.name, message);
    }
}

