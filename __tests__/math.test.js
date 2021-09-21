const {getMean, getMedian, getMode} = require('../math');

describe('testing getMean function', function() {
    test('should return average of array of numbers', function () {
        let nums = [1, 2, 3, 4];

        expect(getMean(nums)).toEqual(2.5);
    });

    test('should return average num of array of nums inlcuding negatives', function () {
        let nums = [1, -2, 5, 4];

        expect(getMean(nums)).toEqual(2);
    });
});

describe('testing getMedian function', function() {
    test('should return median of array of odd amount numbers', function () {
        let nums = [1, 2, 3, 4, 5];

        expect(getMedian(nums)).toEqual(3);
    });

    test('should return median of array of even amount of nums', function () {
        let nums = [1, 2, 3, 5];

        expect(getMedian(nums)).toEqual(2.5);
    });
});

describe('testing getMode function', function() {
    test('should return num in array with highest accurance', function () {
        let nums = [1, 2, 3, 2, 5];

        expect(getMode(nums)).toEqual(2);
    });

    test('should return error message when no mode in array exists', function () {
        let nums = [1, 2, 3, 5];

        expect(getMode(nums)).toEqual('There is no mode');
    });
});