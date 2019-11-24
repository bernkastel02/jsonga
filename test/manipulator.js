const JsonGA = require(__dirname + "/../lib/JsonGA");
const editor = new JsonGA.Manipulator(new JsonGA.Picture(__dirname + "/demo.jsonga"), {

});

editor.on("load", (can) => {
    console.log(can);
})

editor.load();