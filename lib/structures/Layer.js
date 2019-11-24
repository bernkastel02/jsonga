const Color = require(__dirname + "/pixels/Color");
const JSONGPixel = require(__dirname + "/pixels/JSONGPixel");

class Layer {
    constructor(data) {
        if (typeof data != 'object') throw new TypeError("Layer data provided is not an object.");

        this.default_color = new Color(data.default_color || {});
        this.pixels = new Map();
    }

    addPixel(pixel) {
        return this.pixels.set(`${pixel.position.x},${pixel.position.y}`, pixel);
    };

    setDefaultColor(color) {
        if (typeof color != 'object') throw new TypeError("Color provided is not an object.");

        this.default_color = new Color(color);
    }
}

module.exports = Layer;