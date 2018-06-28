'use strict';

var path = require('path');
var fs = require('fs');
var mime = require('mime');
var should = require('should');
var bt = require('..');

var root = path.dirname(__dirname);
var fixtures = path.join(__dirname, 'fixtures');
var names = fs.readdirSync(fixtures);

describe('buffer-type.test.js', function () {
  names.forEach(function (name) {

    it('should check ' + name + ' work', function () {
      var filepath = path.join(fixtures, name);
      var extname = path.extname(filepath);
      var contentType = mime.lookup(filepath);
      var expect = {
        type: contentType,
        extension: extname
      };
      if (contentType.indexOf('image/') === 0) {
        var m = /\_(\d+)x(\d+)/.exec(name);
        if (m) {
          expect.width = Number(m[1]);
          expect.height = Number(m[2]);
        }
      }
      var r = bt(fs.readFileSync(filepath));
      for (var k in expect) {
        r.should.have.property(k, expect[k]);
      }
    });

  });

  it('should detect jpeg', function () {
    bt(fs.readFileSync(path.join(fixtures, 'buffer-type.jpg'))).should.eql({
      type: 'image/jpeg',
      extension: '.jpg',
      width: 1600,
      height: 459,
    });
  });

  it('should detect logo.png to .png', function () {
    bt(fs.readFileSync(path.join(fixtures, 'logo.png'))).should.eql({
      type: 'image/png',
      extension: '.png',
      width: 618,
      height: 96,
      bit: 8,
      color: 6,
      compression: 0,
      filter: 0,
      interlace: 0
    });
  });

  it('should detect jpeg missing width and height', function () {
    bt(fs.readFileSync(path.join(__dirname, 'fixtures', '1_607x78.jpg')).slice(0, 60)).should.eql({
      type: 'image/jpeg',
      extension: '.jpg'
    });
  });

  it('should not detect any type', function () {
    should.not.exist(bt());
    should.not.exist(bt(new Buffer(0)));
    should.not.exist(bt(new Buffer(200)));
    should.not.exist(bt(new Buffer([0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x16, 0x00, 0x16, 0x00])));
  });
});
