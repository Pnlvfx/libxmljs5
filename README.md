# libxmljs5

LibXML bindings for [node.js](http://nodejs.org/), with support for **Node 22, 24, and 26**.

This is a maintained fork of [libxmljs2](https://github.com/marudor/libxmljs2) (itself a fork of the original [libxmljs](https://github.com/libxmljs/libxmljs)), created because the upstream packages were unmaintained and no longer built on modern Node versions. Full credit to the original authors: marudor, Jeff Smick, and Marco Rogers.

```javascript
const libxmljs = require('libxmljs5');

const xml =
  '<?xml version="1.0" encoding="UTF-8"?>' +
  '<root>' +
  '<child foo="bar">' +
  '<grandchild baz="fizbuzz">grandchild content</grandchild>' +
  '</child>' +
  '<sibling>with content!</sibling>' +
  '</root>';

const xmlDoc = libxmljs.parseXml(xml);

// xpath queries
const gchild = xmlDoc.get('//grandchild');
console.log(gchild.text()); // prints "grandchild content"

const children = xmlDoc.root().childNodes();
const child = children[0];
console.log(child.attr('foo').value()); // prints "bar"
```

## Why this fork?

`libxmljs2` (and the original `libxmljs`) are no longer maintained and fail to build on Node 26+. This package updates the native addon dependencies (NAN, node-gyp) to restore compatibility with the latest Node.js releases while keeping the same API.

## Node.js compatibility

| Node version | Status |
|---|---|
| 22 | supported |
| 24 | supported |
| 26 | supported |

## Installation

```shell
npm install libxmljs5
```

## API and Examples

The API is identical to libxmljs2. Check out the [examples](./examples) folder.

Original wiki: [http://github.com/marudor/libxmljs2/wiki](https://github.com/marudor/libxmljs2/wiki).

## Building from source

Make sure you have met the requirements for [node-gyp](https://github.com/TooTallNate/node-gyp#installation).

```shell
yarn build
```

## License

MIT. Original copyright 2009, Squish Tech, LLC. See [LICENSE](./LICENSE).
