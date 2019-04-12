const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe('Modernizr feature', () => {
  describe('on', () => {
    before(done => {
      helpers
        .run(path.join(__dirname, '../app'))
        .withPrompts({ features: ['includeModernizr'] })
        .on('end', done);
    });

    it('should add the correct files', () => {
      assert.file('modernizr.json');
    });

    it('should add the correct dependencies', () => {
      assert.fileContent('package.json', '"modernizr"');
    });

    it('should add the correct gulp task', () => {
      assert.fileContent('gulpfile.js', 'function modernizr');
    });
  });

  describe('off', () => {
    before(done => {
      helpers
        .run(path.join(__dirname, '../app'))
        .withPrompts({
          features: [],
          includeModernizr: false
        })
        .on('end', done);
    });

    it('should not contain Modernizr anywhere', () => {
      assert.noFileContent('package.json', 'modernizr');
      assert.noFile('modernizr.json');
    });
  });
});
