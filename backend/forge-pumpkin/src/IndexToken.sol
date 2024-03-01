// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IUniswapV2Router/IUniswapV2Router.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title Index Token Contract
 * @notice Implements an index token that represents a portfolio of other tokens.
 * @dev This contract uses SafeERC20 for safe transfers and interactions with ERC20 tokens.

      __J"L__
  ,-"`--...--'"-.
 /  /\       /\  \
J  /__\  _  /__\  L
|       / \       |
J    _  """  _    F
 \   \\/\_/\//   /
  "-._\/\_/\/_,-"
      """""""
 Pumpkin Protocol
 */


contract IndexTokenNew is IERC20 {
    using SafeERC20 for IERC20;

    /// @notice The total number of index tokens in existence.
    uint256 public totalSupply;

    /// @notice A mapping from an account to the number of index tokens it owns.
    mapping(address => uint256) public balanceOf;

    /// @notice A mapping from an owner to an operator that allows the operator to spend index tokens on the owner's behalf.
    mapping(address => mapping(address => uint256)) public allowance;

    /// @notice The name of the index token.
    string public name;

    /// @notice The symbol of the index token.
    string public symbol;

    /// @notice The number of decimal places the index token uses.
    uint8 public decimals = 18;

    /// @notice The timestamp when the index token was created.
    uint256 public creationTime;

    /// @notice The timestamp of the last time the streaming fee was claimed.
    uint256 public lastClaimFee;

    /// @dev The address of the contract owner, set at the time of contract deployment and immutable thereafter.
    address public owner;

    /// @notice The total percentage that the sum of the individual token percentages must equal to, set to 100% represented in a more granular form for precision.
    uint256 public constant totalPercentage = 100_0000;

    /// @notice An array of addresses for the ERC20 tokens that comprise the index token.
    address[] public tokens;

    /// @notice An array of decimal places for each of the ERC20 tokens in the `tokens` array.
    uint8[] public tokenDecimals;

    /// @notice An array of percentages that each token in the `tokens` array represents within the index token, corresponding by index.
    uint256[] public percentages;

    /// @notice The address of the SpookySwap router used for executing trades.
    address spookySwapAddress = 0xF491e7B69E4244ad4002BC14e878a34207E38c29;

    /// @dev A reference to the SpookySwap router contract, initialized with the `spookySwapAddress`.
    IUniswapV2Router02 spookySwap = IUniswapV2Router02(spookySwapAddress);

    /// @notice The address of the wrapped FTM token, used as an intermediary in token swaps.
    address wFTMAddr = 0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83;


    /**
     * @notice Only allows the owner to execute the function.
     */
    modifier onlyOwner() {
        if(msg.sender != owner) revert NotOwner(); 
        _;
    }

    // Custom errors for reverting transactions with a reason
    error NotOwner();
    error ZeroAmount();
    error EmptyArray();
    error InvalidFeeClaim();
    error NonMatchingArrays();
    error PercentagesNotEqual100();

    /**
     * @notice Initializes the IndexToken contract with given parameters.
     * @param _owner The address of the contract owner.
     * @param _tokens Array of addresses of the underlying tokens.
     * @param _percentages Array of percentages of the underlying tokens.
     * @param _name Name of the index token.
     * @param _symbol Symbol of the index token.
     * @dev The sum of _percentages must equal totalPercentage.
     */

    constructor(address _owner, address[] memory _tokens, uint256[] memory  _percentages, string memory _name, string memory _symbol) {
        if (_tokens.length == 0 || 
            _percentages.length == 0
            ) revert EmptyArray();

        if (_tokens.length != _percentages.length) revert NonMatchingArrays();

        creationTime = block.timestamp;
        
        //check percentages
        uint256 numOfTokens = _percentages.length;
        uint256 percentageCounter;

        for(uint256 i; i < numOfTokens; i++) {
            percentageCounter += _percentages[i];
        }

        if (percentageCounter != totalPercentage) revert PercentagesNotEqual100();

        // set token decimals
        for (uint256 i; i < _tokens.length; i++) {
            tokenDecimals.push(IERC20Extended(_tokens[i]).decimals());
        }

        percentages = _percentages;

        owner = _owner;
        tokens = _tokens;

        name = _name;
        symbol = _symbol;

    }

    // minimum amount of an underlying token given an amount of index token
    function getMinToken(uint256 _token,uint256 _amount) public view returns (uint256 result){

        uint256 numDecimals = tokenDecimals[_token];

        uint256 decimalOffset;

        if (numDecimals > 18) {
            decimalOffset = numDecimals - 18;
            uint256 percentage = percentages[_token];
            result = _amount * percentage / totalPercentage;
            result = result * (10 ** decimalOffset);
        }
        if (numDecimals < 18) {
            decimalOffset = 18 - numDecimals;
            uint256 percentage = percentages[_token];
            result = _amount * percentage / totalPercentage;
            result = result / (10 ** decimalOffset);
        }
        else {
        uint256 percentage = percentages[_token];
        result = _amount * percentage / totalPercentage;
        }
    }

    //Index token mint
    function mint(uint256 _amount) public {
        if(_amount == 0 ) revert ZeroAmount();
        //get number of tokens using length
        uint256 numOfTokens = tokens.length;
    
        //loop through all tokens
        for(uint256 i; i < numOfTokens; i++){
            address _token = tokens[i];

            uint256 transferAmount = getMinToken(i, _amount);
            IERC20(_token).safeTransferFrom(msg.sender,address(this), transferAmount);

        }

        _mint(_amount);
    }


    // burn index tokens for underlying tokens
    function redeem(uint256 _amount) public {
        //get number of tokens using length
        require(_amount <= balanceOf[msg.sender] );

        uint256 numOfTokens = tokens.length;
        address[] memory _tokens = tokens;

        //loop through all tokens
        for (uint256 i; i < numOfTokens; i++) {
            address _token = _tokens[i];

            uint256 transferAmount = getMinToken(i, _amount);

            IERC20(_token).safeTransfer(msg.sender, transferAmount);

        }

        burn(msg.sender,_amount); 
    }


    //owner withdraw streaming fee of 1% per year
    function streamingFee() public onlyOwner()  {
        if (block.timestamp < creationTime + 365 days || 
        block.timestamp > lastClaimFee + 365 days) revert InvalidFeeClaim();
        
        lastClaimFee = block.timestamp;

        uint256 numOfTokens = tokens.length;
        address[] memory _tokens = tokens;

        for (uint256 i; i < numOfTokens; i++) {
            address _token = _tokens[i];

            //calculate 1% to be withdrawn
            uint256 transferAmount = IERC20(_token).balanceOf(_token) / 100;
            IERC20(_token).safeTransfer(msg.sender, transferAmount);

        }

    }

        
function rebalancePercentages() internal {  
    
    uint256 numOfTokens = tokens.length;

    uint256 totalValueAdjusted = 0;

    uint256[] memory adjustedValues = new uint256[](numOfTokens);

    for (uint256 i = 0; i < numOfTokens; i++) {
        uint256 tokenDecimal_ = tokenDecimals[i];
        uint256 tokenBalance = IERC20(tokens[i]).balanceOf(address(this));
        
        uint256 adjustedBalance;
        if (tokenDecimal_ > 18) {
            adjustedBalance = tokenBalance / (10**(tokenDecimal_ - 18));
        } else if (tokenDecimal_ < 18) {
            adjustedBalance = tokenBalance * (10**(18 - tokenDecimal_));
        } else {
            adjustedBalance = tokenBalance;
        }

        adjustedValues[i] = adjustedBalance;

        totalValueAdjusted += adjustedBalance;
    }

    for (uint256 i = 0; i < numOfTokens; i++) {

        uint256 newPercentage = (adjustedValues[i] * totalPercentage) / totalValueAdjusted;
        
        percentages[i] = newPercentage;
    }
}



    function rebalance(uint256 tokenOut, uint256 tokenIn, uint256 _amountIn, uint256 _minTokenOut) public onlyOwner {
        address[] memory path = new address[](2);
        //path[0] = tokens[tokenOut]; 
        //path[1] = tokens[tokenIn];
        //better rates:
        path[0] = tokens[tokenOut];
        path[1] = wFTMAddr; 
        path[1] = tokens[tokenIn];

        
        IERC20(tokens[tokenOut]).safeIncreaseAllowance(spookySwapAddress,_amountIn);

        spookySwap.swapExactTokensForTokens(_amountIn, _minTokenOut, path, address(this), block.timestamp + 15);

        rebalancePercentages();
        
    }

    function getName() public view returns (string memory) {
        return name;
    }

    function getSymbol() public view returns (string memory) {
        return symbol;
    }

    function getPercentages(uint256 i) public view returns (uint256) {
        return percentages[i];
    }


    function getTotalSupply() public view returns (uint256){
        return totalSupply;
    }


    function transfer(address recipient, uint256 amount) external returns (bool) {
        balanceOf[msg.sender] -= amount;
        balanceOf[recipient] += amount;

        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool) {
        allowance[sender][msg.sender] -= amount;
        balanceOf[sender] -= amount;
        balanceOf[recipient] += amount;

        emit Transfer(sender, recipient, amount);
        return true;
    }

    function _mint(uint256 amount) internal {
        balanceOf[msg.sender] += amount;
        totalSupply += amount;

        emit Transfer(address(0), msg.sender, amount);
    }

    function burn(address burnee, uint256 amount) internal {
        balanceOf[burnee] -= amount;
        totalSupply -= amount;
        emit Transfer(msg.sender, address(0), amount);
    }


    //some getter helpers
    function getTokens() public view returns (address[] memory){
        return tokens;
    }

    function getSingleToken(uint256 _index) public view returns (address) {
        return tokens[_index];
    }

    function getAllPercentages() public view returns (uint256[] memory) {
        return percentages;
    }

    function getSinglePercentage(uint256 _index) public view returns (uint256) {
        return percentages[_index];
    }

    function getNumOfTokens() public view returns (uint256) {
        return tokens.length;
    }


}


interface IERC20Extended is IERC20 {
    function decimals() external view returns (uint8);
}