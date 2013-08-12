buffer-type [![Build Status](https://secure.travis-ci.org/fengmk2/buffer-type.png)](http://travis-ci.org/fengmk2/buffer-type) [![Coverage Status](https://coveralls.io/repos/fengmk2/buffer-type/badge.png)](https://coveralls.io/r/fengmk2/buffer-type) [![Build Status](https://drone.io/github.com/fengmk2/buffer-type/status.png)](https://drone.io/github.com/fengmk2/buffer-type/latest)
=======

![logo](https://raw.github.com/fengmk2/buffer-type/master/logo.png)

Detect content-type from Buffer data.

## Install

```bash
$ npm install bt
```

## Usage

```js
var bt = require('bt');

var info = bt(fs.readFileSync(__dirname + '/logo.png'));
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

## License 

(The MIT License)

Copyright (c) 2013 fengmk2 &lt;fengmk2@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
