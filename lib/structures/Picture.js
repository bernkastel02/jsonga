const fs = require("fs");
const Jimp = require('jimp');
const PImage = require('pureimage');

// classes
const Layer = require(__dirname + "/Layer");
const JSONGPixel = require(__dirname + "/pixels/JSONGPixel");

// functions
const JsonGAFormatter = require(__dirname + "/../util/JsonGAFormatter");
const JsonGAError = require(__dirname + "/../util/JsonGAError");

class Picture {
    constructor(filepath) {
        if (filepath && !fs.existsSync(filepath)) throw new ReferenceError("Could not get readable file.");

        this.filepath = filepath;
        this.version = "1.0";

        this.layers = new Map();
    }

    draw() {
        if (!isJson(fs.readFileSync(this.filepath)) && !require(this.filepath).layers) throw new JsonGAError("This file is an image, so it cannot be imported as JSON-G.");
        this.isJSONG = true;
        let jsong = JSON.parse(fs.readFileSync(this.filepath));

        let image = PImage.make(jsong.size.width, jsong.size.height);
        let ctx = image.getContext('2d');

        return new Promise((resolve) => {
            jsong.layers.forEach((layer) => {
                let lc = layer.default_color;
                ctx.fillStyle = `rgba(${lc.red},${lc.green},${lc.blue},${lc.alpha / 255})`;
                ctx.fillRect(0, 0, jsong.size.width, jsong.size.height);

                // layer
                layer.pixels.forEach((pixel) => {
                    let c = pixel.color;
                    ctx.fillStyle = `rgba(${c.red},${c.green},${c.blue},${c.alpha / 255})`;
                    ctx.fillRect(pixel.position.x, pixel.position.y, 1, 1);
                })
            })
            this.__image = image;
            resolve(this);
        })
    }

    // export to jsong
    format() {
        if (isJson(fs.readFileSync(this.filepath)) && require(this.filepath).layers) throw new JsonGAError("This file is already an JSON-G file, so it cannot be exported.");
        this.isJSONG = false;
        return new Promise((resolve, reject) => {
            this.init().then(() => {
                // pre-init
                let layer;

                if (!this.layers.get("0")) {
                    this.layers.set("0", new Layer({}));
                    layer = this.layers.get("0");
                } else {
                    layer = this.layers.get("0");
                }

                let ind = -1;

                // position
                for (let y = 0; y <= this.size.height; y++) {
                    for (let x = 0; x <= this.size.width; x++) {
                        ind++;

                        let color = Jimp.intToRGBA(this.__image.getPixelColor(x, y));

                        let pixel = new JSONGPixel({
                            position: {
                                x,
                                y
                            },
                            color: {
                                red: color.r,
                                green: color.g,
                                blue: color.b,
                                alpha: color.a / 255
                            }
                        })

                        layer.pixels.set(ind, pixel);
                    }
                }

                // resolve
                this.layers.set("0", layer);
                resolve(this)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    // init function
    init() {
        return new Promise((resolve, reject) => {
            new Jimp.read(this.filepath).then(img => {
                let bitmap = img.bitmap;
                this.__image = img;

                this.size = {
                    width: bitmap.width,
                    height: bitmap.height
                }

                resolve(this);
            }).catch((err) => {
                reject(err)
            })
        })
    }

    // save
    save(savepath) {
        if (this.isJSONG == false) {
            let save = this;
            delete save.__image;

            JsonGAFormatter(this, savepath).then((obj) => {
                return fs.writeFileSync(savepath, JSON.stringify(obj, null, 4), "utf8");
            })
        } else {
            let image = this.__image;
            PImage.encodePNGToStream(image, fs.createWriteStream(savepath)).then(() => {
                return;
            }).catch((err) => {
                reject(err)
            })
        }
    }
}

module.exports = Picture;

function isJson(json) {
    try {
        JSON.parse(json);
        return true;
    } catch (e) {
        return false;
    }
}