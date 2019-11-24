const Color = require(__dirname + "/Color")

class JSONGPixel {
    constructor(data) {
        if (typeof data != 'object') throw new TypeError("Pixel data provided is not an object.");

        this.position = Object.assign({
            x: 0,
            y: 0
        }, data.position || {});

        this.color = new Color(data.color || {});

        this.comment = data.comment || Buffer.from(`${this.position.x},${this.position.y}`).toString("base64");
    }
}

module.exports = JSONGPixel;