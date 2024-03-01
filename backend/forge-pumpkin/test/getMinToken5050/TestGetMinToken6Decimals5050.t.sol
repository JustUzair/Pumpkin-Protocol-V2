// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "ds-test/test.sol";
import "../../src/TestToken.sol";
import "../../src/IndexToken.sol";
import "forge-std/console.sol"; // Import the console for logging

contract TestGetMinToken6Decimals5050 is DSTest {
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

        // Set decimals for tokens in the IndexTokenNew contract if necessary
        // This step assumes your IndexTokenNew contract has a way to set tokenDecimals
        // For this example, we'll assume each TestToken has 18 decimals
        // indexToken.setTokenDecimals([18, 18]);
    }

    function testGetMinToken() public {
        // Assuming we're testing for 100 index tokens
        uint256 indexTokenAmount = 100 * 10 ** 18; // 100 index tokens with 18 decimals
        uint256 tokenIndex = 0; // Test for the first token

        // Call getMinToken() to get the actual min token amount
        uint256 actualMinTokenAmount = indexToken.getMinToken(tokenIndex, indexTokenAmount);
        console.log("actualMinTokenAmount: ", actualMinTokenAmount);

        // Calculate expected min token amount based on the percentage and amount
        uint256 expectedMinTokenAmount = 50 * 10**6;
        console.log("expectedMinTokenAmount: ", expectedMinTokenAmount);

        // Assert the expected and actual amounts are equal
        assertEq(expectedMinTokenAmount, actualMinTokenAmount, "getMinToken calculation incorrect");
    }
}
