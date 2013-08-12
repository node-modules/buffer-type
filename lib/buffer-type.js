/*!
 * buffer-type - lib/buffer-type.js
 * Copyright(c) 2013 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

/**
 * @see http://www.onicos.com/staff/iz/formats/gif.html
 * 
GIF format

Byte Order: Little-endian
GIF Header

Offset   Length   Contents
  0      3 bytes  "GIF" 0x47 0x49 0x46
  3      3 bytes  "87a" or "89a"  0x38 0x39|0x37 0x61
  6      2 bytes  <Logical Screen Width>
  8      2 bytes  <Logical Screen Height>
 10      1 byte   bit 0:    Global Color Table Flag (GCTF)
                  bit 1..3: Color Resolution
                  bit 4:    Sort Flag to Global Color Table
                  bit 5..7: Size of Global Color Table: 2^(1+n)
 11      1 byte   <Background Color Index>
 12      1 byte   <Pixel Aspect Ratio>
 13      ? bytes  <Global Color Table(0..255 x 3 bytes) if GCTF is one>
         ? bytes  <Blocks>
         1 bytes  <Trailer> (0x3b)
 * 
 */
var gif = function (buf) {
  if (buf.length < 15 || buf[buf.length - 1] !== 0x3b ||
      // "GIF" 0x47 0x49 0x46
      buf[0] !== 0x47 || buf[1] !== 0x49 || buf[2] !== 0x46 ||
      // "87a" or "89a" 
      buf[3] !== 0x38 || (buf[4] !== 0x39 && buf[4] !== 0x37) || buf[5] !== 0x61) {
    return;
  }
  var width = buf.readUInt16LE(6);
  var height = buf.readUInt16LE(8);
  return {
    type: 'image/gif',
    extension: '.gif',
    width: width,
    height: height
  };
};

var types = [gif];

function detect(buf) {
  if (!buf || !buf.length) {
    return;
  }
  
  for (var i = 0; i < types.length; i++) {
    var r = types[i](buf);
    if (r) {
      return r;
    }
  }
}

module.exports = detect;
