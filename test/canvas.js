const JsonGA = require(__dirname + "/../lib/JsonGA");
const editor = new JsonGA.Manipulator(new JsonGA.Canvas({
    size: {
        height: 32,
        width: 32
    }
}));

editor.on("load", (canvas) => {
    // draw
    canvas.draw(1, 1, 0xFFF);

    console.log(canvas.layer);
})

editor.load();