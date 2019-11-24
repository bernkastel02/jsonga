class JsonGAError extends Error {
    constructor(msg) {
        super(msg);

        this.name = JsonGAError;
    }
}

module.exports = JsonGAError;