// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "ds-test/test.sol";
import "../../src/IndexToken.sol";
import "../../src/TestToken.sol";
import "forge-std/console.sol"; // Import the console for logging

contract ConstructorTestDecimals is DSTest {
    IndexTokenNew indexToken;
    TestToken testToken1;
    TestToken testToken2;
    address[] tokens;
    uint256[] percentages;

    function setUp() public {
        // Deploy test tokens
        testToken1 = new TestToken("Test Token 1", "TT1", 18);
        testToken2 = new TestToken("Test Token 2", "TT2", 18);

        // Prepare tokens and percentages arrays
        tokens.push(address(testToken1));
        tokens.push(address(testToken2));
        percentages.push(500000); // 50%
        percentages.push(500000); // 50%

        // Deploy the IndexTokenNew contract
        indexToken = new IndexTokenNew(address(this), tokens, percentages, "Index Token", "IT");
    }

    function testConstructorSetsInitialValues() public {

    //view     uint256[] public tokenDecimals;
    console.log("First tokenDecimals: ", indexToken.tokenDecimals(0));
    console.log("Second tokenDecimals: ", indexToken.tokenDecimals(1));



    }
}
