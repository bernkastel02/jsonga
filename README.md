# JsonGA [![npm](https://img.shields.io/npm/v/momijiln/jsonga.svg)](https://www.npmjs.com/package/jsonga)] [![npm](https://img.shields.io/npm/dt/jsonga.svg?maxAge=3600)](https://www.npmjs.com/package/jsonga)

JsonGA is a soon-powerful library that processes images to the glorious [JSON-G](https://github.com/Roadcrosser/JSON-G) image format, and converts that format back into an image.

## Features
- Object-oriented.
- Uses JSON-G.
- Utilizes no native libraries.
- Probably never gonna get used.

## Installation
##### Node.js v10, or above is required for this module.
`npm install jsonga`

## Examples
##### Read JSON-G File
```js
const JsonGA = require("jsonga"));
const jsong = new JsonGA.Picture(__dirname + "/demo.jsong");

jsong.draw().then((picture) => {
    picture.save(__dirname + "/demo_draw.png")
})
```

#### Read Picture
```js
const JsonGA = require("jsonga"));
const picture = new JsonGA.Picture(__dirname + "/demo.png");

picture.format().then((pic) => {
    pic.save(__dirname + "/demo.jsong")
})
```

## Links
- [JSON-G Format](https://github.com/Roadcrosser/JSON-G)
- [npm](https://www.npmjs.com/package/jsonga)
- [Github](https://github.com/momijiln/jsonga)

## Contributing
Please don't.