buffer-type
=======

[![NPM version][npm-image]][npm-url]
[![NPM quality][quality-image]][quality-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![NPM download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/buffer-type.svg?style=flat-square
[npm-url]: https://npmjs.org/package/buffer-type
[quality-image]: http://npm.packagequality.com/shield/buffer-type.svg?style=flat-square
[quality-url]: http://packagequality.com/#?package=buffer-type
[travis-image]: https://img.shields.io/travis/node-modules/buffer-type.svg?style=flat-square
[travis-url]: https://travis-ci.org/node-modules/buffer-type
[codecov-image]: https://img.shields.io/codecov/c/github/node-modules/buffer-type.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/node-modules/buffer-type
[david-image]: https://img.shields.io/david/node-modules/buffer-type.svg?style=flat-square
[david-url]: https://david-dm.org/node-modules/buffer-type
[snyk-image]: https://snyk.io/test/npm/buffer-type/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/buffer-type
[download-image]: https://img.shields.io/npm/dm/buffer-type.svg?style=flat-square
[download-url]: https://npmjs.org/package/buffer-type

Detect content-type from Buffer data.

## Install

```bash
$ npm install buffer-type
```

## Usage

```js
const bt = require('buffer-type');
const fs = require('fs');

const info = bt(fs.readFileSync(__dirname + '/logo.png'));
console.log(info);
// {
//   type: 'image/png',
//    extension: '.png',
//    width: 618,
//    height: 96,
//    bit: 8, // bit depth
//    color: 6,
//    compression: 0,
//    filter: 0,
//    interlace: 0
// }
```

## References

* http://www.onicos.com/staff/iz/formats/
* http://www.fastgraph.com/help/image_file_header_formats.html
* http://en.wikipedia.org/wiki/Portable_Network_Graphics
* http://en.wikipedia.org/wiki/Image_file_format

## TODO

* Image
  * [√] .png
  * [√] .jpg
  * [√] .bmp
  * [√] .gif
  * [√] .webp
  * [ ] .svg
  * [ ] .tif
  * [ ] .psd
* Tar
  * [ ] .tar
  * [ ] .gzip
  * [ ] .zip
  * [ ] .rar
* PE file
  * [ ] .exe
  * [ ] .msi
  * [ ] .apk
  * [ ] .ipa
* Text
  * [ ] .xml
  * [ ] .html
  * [ ] .json
* Media
  * [ ] .mp3
  * [ ] .mp4
  * [ ] .avi

## License

[MIT](LICENSE.txt)
