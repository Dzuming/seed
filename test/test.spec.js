import testing from "../client/Scripts/test.js";

let assert = require('chai').assert;
describe('testing', function () {
    describe('#value', function () {
        let test
        beforeEach(() => {
            test = new testing(-1);
        });
        it('should return -1', () => {
            assert.deepEqual(-1, test.value)
        });
    });
});