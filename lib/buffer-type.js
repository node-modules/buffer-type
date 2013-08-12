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
  if (buf.length < 13 ||
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

/**
 * @see http://en.wikipedia.org/wiki/Portable_Network_Graphics
 *
A PNG file starts with an 8-byte signature. The hexadecimal byte values are 89 50 4E 47 0D 0A 1A 0A; the decimal values are 137 80 78 71 13 10 26 10. Each of the header bytes is there for a specific reason:[7]
Bytes Purpose
89  Has the high bit set to detect transmission systems that do not support 8 bit data and to reduce the chance that a text file is mistakenly interpreted as a PNG, or vice versa.
50 4E 47  In ASCII, the letters PNG, allowing a person to identify the format easily if it is viewed in a text editor.
0D 0A A DOS-style line ending (CRLF) to detect DOS-Unix line ending conversion of the data.
1A  A byte that stops display of the file under DOS when the command type has been used—the end-of-file character
0A  A Unix-style line ending (LF) to detect Unix-DOS line ending conversion.
 * 
 */
var png = function (buf) {
  if (buf.length < 16 ||
      buf[0] !== 0x89 ||
      // PNG
      buf[1] !== 0x50 || buf[2] !== 0x4E || buf[3] !== 0x47 ||
      // \r\n
      buf[4] !== 0x0D || buf[5] !== 0x0A ||
      buf[6] !== 0x1A || buf[7] !== 0x0A) {
    return;
  }
  // Length  Chunk type  Chunk data  CRC
  // 4 bytes 4 bytes Length bytes  4 bytes
  var length = buf.readUInt32BE(8);
  // var chunkType = buf.slice(12, 16).toString(); // should be 'IHDR'
  // console.log(length, chunkType, buf.slice(12, 16))
  var chunkData = buf.slice(16, 16 + length);
  // Width:              4 bytes   0
  // Height:             4 bytes   4
  // Bit depth:          1 byte    8
  // Color type:         1 byte    9
  // Compression method: 1 byte    10
  // Filter method:      1 byte    11
  // Interlace method:   1 byte    12
  var width = chunkData.readUInt32BE(0, true);
  var height = chunkData.readUInt32BE(4, true);
  return {
    type: 'image/png',
    extension: '.png',
    width: width,
    height: height,
    bit: chunkData.readUInt8(8, true),
    color: chunkData.readUInt8(9, true),
    compression: chunkData.readUInt8(10, true),
    filter: chunkData.readUInt8(11, true),
    interlace: chunkData.readUInt8(12, true),
  };
};

var types = [gif, png];

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
