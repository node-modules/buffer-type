'use strict';

const assert = require('assert');
const path = require('path');
const fs = require('fs');
const mime = require('mime');
const bt = require('..');

const fixtures = path.join(__dirname, 'fixtures');
const names = fs.readdirSync(fixtures);

describe('buffer-type.test.js', () => {
  names.forEach(name => {

    it('should check ' + name + ' work', () => {
      const filepath = path.join(fixtures, name);
      const extname = path.extname(filepath);
      const contentType = mime.lookup(filepath);
      const expect = {
        type: contentType,
        extension: extname,
      };
      if (contentType.indexOf('image/') === 0) {
        const m = /\_(\d+)x(\d+)/.exec(name);
        if (m) {
          expect.width = Number(m[1]);
          expect.height = Number(m[2]);
        }
      }
      const r = bt(fs.readFileSync(filepath));
      assert(r);
      for (const k in expect) {
        assert(r[k] === expect[k]);
      }
    });

  });

  it('should detect jpeg', () => {
    assert.deepEqual(bt(fs.readFileSync(path.join(fixtures, 'buffer-type.jpg'))), {
      type: 'image/jpeg',
      extension: '.jpg',
      width: 1600,
      height: 459,
    });

    assert.deepEqual(bt(fs.readFileSync(path.join(fixtures, 'buffer-type.jpg')).slice(0, 10)), {
      type: 'image/jpeg',
      extension: '.jpg',
    });
  });

  it('should detect logo.png to .png', () => {
    assert.deepEqual(bt(fs.readFileSync(path.join(fixtures, 'logo.png'))), {
      type: 'image/png',
      extension: '.png',
      width: 618,
      height: 96,
      bit: 8,
      color: 6,
      compression: 0,
      filter: 0,
      interlace: 0,
    });
  });

  it('should detect jpeg missing width and height', () => {
    assert.deepEqual(bt(fs.readFileSync(path.join(__dirname, 'fixtures', '1_607x78.jpg')).slice(0, 60)), {
      type: 'image/jpeg',
      extension: '.jpg',
    });
  });

  it('should not detect any type', () => {
    assert(!bt());
    assert(!bt(new Buffer(0)));
    assert(!bt(new Buffer(200)));
    assert(!bt(new Buffer([ 0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x16, 0x00, 0x16, 0x00 ])));
  });
});
