module.exports = {
    // picture
    Picture: require(__dirname + "/structures/Picture"),
    Layer: require(__dirname + "/structures/Layer"),

    // pixels
    JSONGPixel: require(__dirname + "/structures/pixels/JSONGPixel"),
    Color: require(__dirname + "/structures/pixels/Color"),

    // util
    JsonGAError: require(__dirname + "/util/JsonGAError"),
    JsonGAFormatter: require(__dirname + "/util/JsonGAFormatter")
}