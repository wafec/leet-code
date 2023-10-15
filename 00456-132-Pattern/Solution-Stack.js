const assert = require('assert');

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var find132pattern = function(nums) {
    var stack = [];
    var lastNumberLeavingTheStack = Math.min;

    // loop properties:
    //   for a number to leave there will be a number within the stack which is greather than then number that left
    //   to remove a number from the stack it must be greather than that number
    //   the loop stops when a test number is lesser than the last number that left the stack
    //     the last number that left the stack has a number greater than it within the stack
    //     and the test number is lesser than it
    //   needs to traverse from right to left
    //   enqueue all numbers on the loop
    for (var i = nums.length - 1; i >= 0; i--) {
        var testNumber = nums[i];
        if (testNumber < lastNumberLeavingTheStack) {
            return true;
        }
        while(stack.length && testNumber > stack[stack.length - 1]) {
            lastNumberLeavingTheStack = stack.pop();
        }
        stack.push(testNumber);
    }
    return false;
};

function testCase1() {
    var input = [3,1,4,2];
    var expected = true;
    var result = find132pattern(input);
    assert.equal(result, expected);
}

testCase1();
