const assert = require('assert');

// The first question for this algorithm
// How do I know how many operations I would need to have all elements
// of an array to be the same value of a certain target?
// This complex function does it
var getOperations = function(nums, target) {
    var count = 0;
    for (var n of nums) {
        count += Math.floor((target + n - 1) / target) - 1;
    }
    return count;
}

// This function only returns the maximum value found in an array
// The value returned by this function is used for set the upper bound
// of the search internalfor the the binary search
var getMax = function(nums) {
    var max = -1;
    for (var n of nums) {
        if (n > max) {
            max = n;
        }
    }
    return max;
}

/**
 * @param {number[]} nums
 * @param {number} maxOperations
 * @return {number}
 */
var minimumSize = function(nums, maxOperations) {
    var left = 1, right = getMax(nums);

    // The core of this algorithm is to use the binary search
    // The search space is the values between 1 (the minimum)
    // and the max value of the array
    while (left < right) {
        var mid = Math.floor((left + right) / 2);
        // If the number of operations needed to achieve the mid value
        // of the search space is lesser than the max operations allowed
        // then it means that the algorithm might continue search on the
        // left side for lesser values which would require more operations
        if (getOperations(nums, mid) <= maxOperations) {
            right = mid;
        } else {
            // however, if now the number of operations exceeded
            // it needs to stop searching on left and look for the values
            // on the right side of the search space
            left = mid + 1;
        }
    }
    // The search stops when left reaches and passes the right pivot
    // in this case, either left will be equal to right or one position more
    return left;
};

const testCase1 = function() {
    var input = [9];
    var expected = 3;
    var maxOperations = 2;
    var result = minimumSize(input, maxOperations);
    assert.equal(result, expected);
}

const testCase2 = function() {
    var input = [2, 4, 8, 2];
    var expected = 2;
    var maxOperations = 4;
    var result = minimumSize(input, maxOperations);
    assert.equal(result, expected);
}

testCase1();
testCase2();
