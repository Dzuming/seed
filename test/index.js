var test = require('../client/Scripts/test.js');
var expect = require('chai').expect;
describe('test', function() {
    it('should return -1', function() {
        actual = new testing(-1);
      expect(actual).to.eql(-1)
  });
});