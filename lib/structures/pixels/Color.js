class Color {
    constructor(data) {
        if (typeof data != 'object') throw new TypeError("Color data provided is not an object.");
        this.red = ((data.red == 0 || data.r == 0) && (data.r != undefined || data.red != undefined)) ? data.red : 255;
        this.green = ((data.green == 0 || data.r == 0) && (data.g != undefined || data.green != undefined)) ? data.green : 255;
        this.blue = ((data.blue == 0 || data.b == 0) && (data.b != undefined || data.blue != undefined)) ? data.blue : 255;
        this.alpha = ((data.alpha == 0 || data.a == 0) && (data.a != undefined || data.alpha != undefined)) ? data.alpha : 255 / 255;
    }
}

module.exports = Color;