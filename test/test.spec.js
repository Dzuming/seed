import testing from "../client/Scripts/test.js";

let assert = require('chai').assert;
describe('testing', function () {
    describe('#value', function () {
        let test1
        beforeEach(() => {
            test1 =  testing.Calculate(-1);
        });
        it('should return -1', () => {
            assert.deepEqual(-1, test1)
        });
    });
});