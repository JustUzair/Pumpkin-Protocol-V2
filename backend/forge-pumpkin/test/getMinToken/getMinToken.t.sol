// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "ds-test/test.sol";
import "../../src/IndexToken.sol";
import "../../src/TestToken.sol";
import "forge-std/stdlib.sol"; // Import Forge standard library for deploying contracts

contract IndexTokenNewTest is DSTest {
    using stdStorage for StdStorage;

    StdStorage stdstore;
    TestToken testToken1;
    TestToken testToken2;
    IndexTokenNew indexToken;
    address[] tokens;
    uint256[] percentages;
    uint256[] tokenDecimals;

    function setUp() public {
        // Deploy Test Tokens
        testToken1 = new TestToken("Test Token 1", "TT1");
        testToken2 = new TestToken("Test Token 2", "TT2");

        // Setup tokens and percentages
        tokens = [address(testToken1), address(testToken2)];
        percentages = [500000, 500000]; // 50%, 50%
        tokenDecimals = [18, 18]; // Assuming both tokens have 18 decimals

        // Deploy IndexTokenNew with the setup
        indexToken = new IndexTokenNew(address(this), tokens, percentages, "Index Token", "ITN");

        // Mock setting the decimals for simplicity, in actual you'll need to call a function or set this during deployment
        for(uint i = 0; i < tokens.length; i++) {
            stdstore.store(target(indexToken), keccak256(abi.encode(tokens[i], uint256(2))), bytes32(tokenDecimals[i]));
        }
    }

    function testGetMinToken() public {
        // Example test: Check minimum token calculation for the first token (index 0) for 100 index tokens
        uint256 indexTokenAmount = 100 ether; // 100 index tokens, assuming 18 decimals for the index token
        uint256 expectedMinTokenAmount = (indexTokenAmount * percentages[0]) / indexToken.totalPercentage(); // Calculate expected amount

        uint256 actualMinTokenAmount = indexToken.getMinToken(0, indexTokenAmount);
        
        // Assert that the actual minimum token amount is as expected
        assertEq(actualMinTokenAmount, expectedMinTokenAmount, "The calculated minimum token amount does not match the expected value.");
    }
}
