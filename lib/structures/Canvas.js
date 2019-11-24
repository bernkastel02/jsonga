const fs = require("fs");

// pic info
const Layer = require(__dirname + "/Layer");
const Color = require(__dirname + "/pixels/Color");
const Pixel = require(__dirname + "/pixels/JSONGPixel");

const JsonGAError = require(__dirname + "/../util/JsonGAError");

class Canvas {
    constructor(data, manipulator) {
        this.__manipulator = manipulator || null;

        if (typeof data !== 'object') throw new TypeError("Data is not an object");
        if (data.filepath && !fs.existsSync(data.filepath)) throw new ReferenceError("Could not get readable file.");
        this.filepath = data.filepath || undefined;

        this.canvasVersion = data.canvasVersion || "1.0";
        this.transparency = data.transparency || false;
        this.size = Object.assign({
            width: 0,
            height: 0
        }, data.size);

        this.layers = new Map();
        this.currentLayer = "0";
    }

    // draw pixel
    draw(x, y, colorData) {
        let pixel = new Pixel({
            position: {
                x,
                y
            },
            color: new Color(colorData)
        })

        let layer = this.layers.get(this.currentLayer);
        let setpixel = null;
        let i;

        // get pixels
        layer.pixels.forEach((e) => {
            i++
            if (e.x == x && e.y == y) {
                setpixel.id = i;
                setpixel = e;
            }
        })

        if (setpixel && setpixel.comment) {
            layer.pixels.set(setpixel.id, pixel);
        } else {
            // new pixel
            layer.pixels.set(layer.pixels.size, pixel);
        }
        this.__manipulator.emit("draw", (pixel));
        return this;
    }

    // Layers
    addLayer(layer) {
        if (this.filepath && !this.baseInit) throw new JsonGAError("JSON-G file not loaded!");
        return this.layers.set(this.layers.size + 1, layer);
    }

    setLayer(id) {
        if (!this.layers.get(id)) throw new JsonGAError("Layer not found!");
        return this.currentLayer = id;
    }

    get layer() {
        return this.layers.get(this.currentLayer);
    }

    // Transparency/Alpha


    // only if jsonga file
    init() {
        return new Promise((resolve) => {
            if (this.filepath != "" && !isJson(fs.readFileSync(this.filepath))) throw new JsonGAError("Invalid JSON!");
            if (!JSON.parse(fs.readFileSync(this.filepath)).layers)  throw new JsonGAError("Invalid JSON-G");
            let picture = JSON.parse(fs.readFileSync(this.filepath));

            let i = -1;
            picture.layers.forEach((l) => {
                i++;

                let pi = -1;
                let layer = new Layer(l);
                
                picture.layers[i].pixels.forEach((p) => {
                    pi++;
                    layer.pixels.set(pi, p);
                })
                
                this.layers.set(i, layer)
            })
            this.size = picture.size;

            this.__picture = picture;

            resolve();
        })
    }
}

module.exports = Canvas;

function isJson(json) {
    try {
        JSON.parse(json);
        return true;
    } catch (e) {
        return false;
    }
}