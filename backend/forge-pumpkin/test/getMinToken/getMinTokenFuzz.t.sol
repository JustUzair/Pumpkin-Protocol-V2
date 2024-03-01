// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "ds-test/test.sol";
import "forge-std/Test.sol"; // Import Test.sol for cheat codes
import "../../src/TestToken.sol";
import "../../src/IndexToken.sol";
import "forge-std/console.sol"; // Import the console for logging

contract TestGetMinTokenFuzz is DSTest {
    TestToken testToken1;
    TestToken testToken2;
    IndexTokenNew indexToken;
    address[] public tokens;
    uint256[] public percentages;

    function setUp() public {
        // Deploy Test Tokens
        testToken1 = new TestToken("Test Token 1", "TT1", 6);
        testToken2 = new TestToken("Test Token 2", "TT2", 6);

        // Setup tokens and percentages
        tokens = [address(testToken1), address(testToken2)];
        percentages = [500000, 500000]; // 50%, 50%

        // Deploy IndexTokenNew with the setup
        indexToken = new IndexTokenNew(address(this), tokens, percentages, "Index Token", "ITN");
    }

    function testGetMinTokenFuzz(uint256 fuzzedIndexTokenAmount) public {
        // Constrain fuzzed value between 1 wei and 50 ether
        vm.assume(fuzzedIndexTokenAmount >= 1 && fuzzedIndexTokenAmount <= 50 ether);

        uint256 tokenIndex = 0; // Test for the first token

        // Call getMinToken() to get the actual min token amount with fuzzed token amount
        uint256 actualMinTokenAmount = indexToken.getMinToken(tokenIndex, fuzzedIndexTokenAmount);

        console.log("Fuzzed indexTokenAmount (wei):", fuzzedIndexTokenAmount);
        console.log("Actual min token amount (wei):", actualMinTokenAmount);
    }

}
