const assert = require('assert');
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var find132pattern = function(nums) {
    var idx = 0, jdx = 1, kdx = 2;
    while (kdx < nums.length) {
        // Check the stop condition
        if (nums[idx] < nums[kdx] && nums[kdx] < nums[jdx]) {
            return true;
        }
        // The logic is to increase the range between the first and the second while moving to right
        // If the second in the tuple is lesser than the first then starts from the second
        if (nums[jdx] < nums[idx]) {
            idx = jdx;
            jdx = kdx;
            kdx++;
        }
        // If the third in the tuple is greater than the second then move the second to the third
        else if (nums[kdx] > nums[jdx]) {
            jdx = kdx;
            kdx++;
        } else {
            // Increase the last in the tuple
            kdx++;
            // Check if the pivot for the third in the tuple has reached the end
            // If true, if the second pivot is not at the end then increase it by 1 and restore the third pivot
            if (kdx == nums.length && jdx < nums.length - 1) {
                jdx++;
                kdx = jdx + 1;
            }
        }
    }
    return false;
};

function testCase1() {
    var input = [1,2,3,4];
    var expected = false;
    var result = find132pattern(input);
    assert.equal(result, expected);
}

function testCase2() {
    var input = [3,1,4,2];
    var expected = true;
    var result = find132pattern(input);
    assert.equal(result, expected);
}

function testCase3() {
    var input = [1,4,0,-1,-2,-3,-1,-2];
    var expected = true;
    var result = find132pattern(input);
    assert.equal(result, expected);
}

testCase1();
testCase2();
testCase3();
