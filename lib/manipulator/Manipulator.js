const EventEmitter = require("events");
const fs = require("fs");

const JsonGAError = require(__dirname + "/../util/JsonGAError");
const Canvas = require(__dirname + "/../structures/Canvas");
const Layer = require(__dirname + "/../structures/Layer");

class Manipulator extends EventEmitter {
    constructor(image, options) {
        if (!image || typeof image !== 'object') throw new ReferenceError("JsonGA Image not found, or not correctly optimized");
        super();

        this.options = Object.assign({
        }, options);
        this.__preload = image;
    }

    // layer grab
    getLayer(layerID) {
        if (!this.imageLoaded) throw new JsonGAError("Image is not loaded!");
        return this.__image.getLayer(layerID);
    }

    load() {
        return new Promise((resolve, reject) => {
            if (!this.__preload.canvasVersion) {
                this.__preload.init().then((image) => {
                    // delete preloaded image
                    delete this.__preload;

                    // allow image to correctly load
                    this.imageLoaded = true;
                    let path = image.filepath;
                    this.__image = new Canvas({
                        filepath: path
                    }, this);
                    this.__image.init().then(() => {
                        // emit events
                        this.emit("load", this.__image);
                        resolve(this)
                    })
                }).catch((err) => {
                    this.emit("error", err);
                    reject(err)
                })
            } else {
                // load canvas
                this.__image = this.__preload;

                // delete preloaded canvas
                delete this.__preload;

                // add canvas
                this.__image.layers.set("0", new Layer({}));
                this.__image.__manipulator = this;

                // emit
                this.emit("load", (this.__image));
                resolve(this);
            }
        })
    }
}

module.exports = Manipulator;

function isJson(json) {
    try {
        JSON.parse(json);
        return true;
    } catch (e) {
        return false;
    }
}