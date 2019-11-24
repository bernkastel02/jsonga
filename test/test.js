const JsonGA = require(__dirname + "/../lib/JsonGA.js");
const picture = new JsonGA.Picture(__dirname + "/demo.png");

picture.format().then((pic) => {
    pic.save(__dirname + "/demo.jsonga");
})