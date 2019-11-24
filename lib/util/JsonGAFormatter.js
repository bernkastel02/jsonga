module.exports = (img, saveAs) => {
    let obj = {};

    obj.version = img.version;
    obj.comment = img.comment || Buffer.from(saveAs).toString("base64");
    obj.size = img.size

    return new Promise((resolve, reject) => {
        // set shit up
        obj.layers = [];
        let i = -1;
        img.layers.forEach((l) => {
            i++;
            let returnl = {};

            returnl.pixels = [];
            returnl.default_color = l.default_color;

            obj.layers.push(returnl);

            l.pixels.forEach((p) => {
                let returnp = {};

                returnp.position = p.position;
                returnp.color = p.color;

                obj.layers[i].pixels.push(returnp)
            })
        });

        resolve(obj);
    })
}