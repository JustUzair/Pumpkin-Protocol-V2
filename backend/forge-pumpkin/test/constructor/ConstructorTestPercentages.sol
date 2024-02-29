// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "ds-test/test.sol";
import "../../src/IndexToken.sol";
import "../../src/TestToken.sol";
import "forge-std/console.sol"; // Import the console for logging

contract ConstructorTestPercentages is DSTest {
    IndexTokenNew indexToken;
    TestToken testToken1;
    TestToken testToken2;
    address[] tokens;
    uint256[] percentages;

    function setUp() public {
        // Deploy test tokens
        testToken1 = new TestToken("Test Token 1", "TT1");
        testToken2 = new TestToken("Test Token 2", "TT2");

        // Prepare tokens and percentages arrays
        tokens.push(address(testToken1));
        tokens.push(address(testToken2));
        percentages.push(500000); // 50%
        percentages.push(500000); // 50%

        // Deploy the IndexTokenNew contract
        indexToken = new IndexTokenNew(address(this), tokens, percentages, "Index Token", "IT");
    }

    function testConstructorSetsInitialValues() public {
        // Check tokens and percentages are set correctly
        for(uint i = 0; i < tokens.length; i++) {
            // Log the expected and actual token addresses before asserting
            console.log("Expected Token Address:", tokens[i]);
            console.log("Actual Token Address:", indexToken.getTokens()[i]);
            assertEq(tokens[i], indexToken.getTokens()[i]);

            // Log the expected and actual percentages before asserting
            console.log("Expected Percentage:", percentages[i]);
            console.log("Actual Percentage:", indexToken.getAllPercentages()[i]);
            assertEq(percentages[i], indexToken.getAllPercentages()[i]);
        }
    }
}
