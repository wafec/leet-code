const assert = require('assert');

/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */
var accountsMerge = function(accounts) {
    // Setup
    var nodes = [...Array(accounts.length)];
    for (var idx in nodes) {
        nodes[idx] = [];
    }
    // Create nodes and links as a social graph
    // Use a map to identify which email holds links
    var nodesByEmail = {}
    for (var idx in accounts) {
        for (var email of accounts[idx].slice(1)) {
            if (nodesByEmail[email]) {
                for (var link of nodesByEmail[email]) {
                    nodes[link].push(idx)
                    nodes[idx].push(link);
                }
                nodesByEmail[email].push(idx);
            } else {
                nodesByEmail[email] = [idx];
            }
        }
    }
    // Use a stack to traverse the social graph
    // Create the merge groups
    // Visited list controls which nodes were visited
    var visited = new Set();
    var stack = [];
    var merge = [];
    for (var idx in nodes) {
        if (visited.has(idx)) continue;
        visited.add(idx);
        var group = [idx];
        for (var n of nodes[idx]) {
            stack.push(n);
        }
        while (stack.length > 0) {
            var removed = stack.shift();
            if (!visited.has(removed)) {
                visited.add(removed);
                group.push(removed);
                for (var n of nodes[removed]) {
                    stack.push(n);
                }
            }
        }
        merge.push(group);
    }
    // Create the resulting list
    var result = [];
    for (var group of merge) {
        var account = [accounts[group[0]][0]];
        var emails = new Set();
        for (var idx of group) {
            accounts[idx].slice(1).forEach(email => emails.add(email));
        }
        var emailsSorted = Array.from(emails).sort();
        account.push(...emailsSorted);
        result.push(account);
    }
    return result;
};

function testCase1() {
    var input = [["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]];
    var result = accountsMerge(input);
    var expected = [["John","john00@mail.com", "john_newyork@mail.com", "johnsmith@mail.com",],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]];
    assert.deepEqual(result, expected);
}

testCase1();