var assert = require('assert');

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var distance = function(nums) {
    var map = {};

    for (var idx in nums) {
        var value = nums[idx];
        map[value] = map[value] || [];
        map[value].push(idx);
    }
    var result = [...Array(nums.length)];
    result.fill(0);
    for (var value in map) {
        var arr = map[value];
        for (var idx = 1; idx < arr.length; idx++) {
            result[arr[0]] += Math.abs(arr[0] - arr[idx]);
        }
        for (var idx = 1; idx < arr.length; idx++) {
            var left = idx - 1;
            var right = arr.length - idx - 1;
            var diff = arr[idx] - arr[idx - 1];
            result[arr[idx]] = result[arr[idx - 1]] - (right * diff) + (left * diff);
        }
    }
    return result;
};

function testCase1() {
    var input = [1,3,1,1,2];
    var expected = [5,0,3,4,0];
    var result = distance(input);
    assert.deepEqual(result, expected);
}

testCase1();