/*!
 * buffer-type - test/buffer-type.test.js
 * Copyright(c) 2013 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var path = require('path');
var fs = require('fs');
var mime = require('mime');
var should = require('should');
var bt = require('../');

var names = fs.readdirSync(path.join(__dirname, 'fixtures'));
describe('buffer-type.test.js', function () {
  names.forEach(function (name) {

    it('should check ' + name + ' work', function () {
      var filepath = path.join(__dirname, 'fixtures', name);
      var extname = path.extname(filepath);
      var contentType = mime.lookup(filepath);
      var expect = {
        type: contentType,
        extension: extname
      };
      if (contentType.indexOf('image/') === 0) {
        var m = /\_(\d+)x(\d+)/.exec(name);
        expect.width = Number(m[1]);
        expect.height = Number(m[2]);
      }
      bt(fs.readFileSync(filepath)).should.eql(expect);
    });

  });

  it('should not detect any type', function () {
    should.not.exist(bt());
    should.not.exist(bt(new Buffer(0)));
    should.not.exist(bt(new Buffer(200)));
    should.not.exist(bt(new Buffer([0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x16, 0x00, 0x16, 0x00])));
  });
});
