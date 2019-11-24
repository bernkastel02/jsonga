class Color {
    constructor(data) {
        if (typeof data != 'object') throw new TypeError("Color data provided is not an object.");
        this.red = data.r;
        this.green = data.g;
        this.blue = data.b;
        this.alpha = data.a;
    }
}

module.exports = Color;