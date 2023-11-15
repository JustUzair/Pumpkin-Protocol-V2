// Sources flattened with hardhat v2.19.0 https://hardhat.org

// SPDX-License-Identifier: MIT

// File @openzeppelin/contracts/utils/math/SafeMath.sol@v4.9.3

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts (last updated v4.9.0) (utils/math/SafeMath.sol)

pragma solidity ^0.8.0;

// CAUTION
// This version of SafeMath should only be used with Solidity 0.8 or later,
// because it relies on the compiler's built in overflow checks.

/**
 * @dev Wrappers over Solidity's arithmetic operations.
 *
 * NOTE: `SafeMath` is generally not needed starting with Solidity 0.8, since the compiler
 * now has built in overflow checking.
 */
library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function tryAdd(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            uint256 c = a + b;
            if (c < a) return (false, 0);
            return (true, c);
        }
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function trySub(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b > a) return (false, 0);
            return (true, a - b);
        }
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function tryMul(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
            // benefit is lost if 'b' is also tested.
            // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
            if (a == 0) return (true, 0);
            uint256 c = a * b;
            if (c / a != b) return (false, 0);
            return (true, c);
        }
    }

    /**
     * @dev Returns the division of two unsigned integers, with a division by zero flag.
     *
     * _Available since v3.4._
     */
    function tryDiv(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a / b);
        }
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers, with a division by zero flag.
     *
     * _Available since v3.4._
     */
    function tryMod(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a % b);
        }
    }

    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     *
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        return a + b;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return a - b;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     *
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        return a * b;
    }

    /**
     * @dev Returns the integer division of two unsigned integers, reverting on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator.
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return a / b;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * reverting when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return a % b;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * CAUTION: This function is deprecated because it requires allocating memory for the error
     * message unnecessarily. For custom revert reasons use {trySub}.
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        unchecked {
            require(b <= a, errorMessage);
            return a - b;
        }
    }

    /**
     * @dev Returns the integer division of two unsigned integers, reverting with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a / b;
        }
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * reverting with custom message when dividing by zero.
     *
     * CAUTION: This function is deprecated because it requires allocating memory for the error
     * message unnecessarily. For custom revert reasons use {tryMod}.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a % b;
        }
    }
}


// File contracts/interfaces/IERC20.sol

// Original license: SPDX_License_Identifier: MIT
pragma solidity ^0.8.19;

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.0.0/contracts/token/ERC20/IERC20.sol
interface IERC20 {
    function totalSupply() external view returns (uint);

    function balanceOf(address account) external view returns (uint);

    function transfer(address recipient, uint amount) external returns (bool);

    function allowance(address owner, address spender) external view returns (uint);

    function approve(address spender, uint amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
}


// File contracts/interfaces/IUniswapV2Router/IUniswapV2Router.sol

// Original license: SPDX_License_Identifier: MIT
pragma solidity ^0.8.19;

interface IUniswapV2Router01 {
    function factory() external pure returns (address);
    function WETH() external pure returns (address);

    function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        payable
        returns (uint[] memory amounts);

    function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        returns (uint[] memory amounts);
    
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
}

interface IUniswapV2Router02 is IUniswapV2Router01 {

    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external payable;


    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external;

}


// File contracts/IndexToken.sol

// Original license: SPDX_License_Identifier: MIT
pragma solidity ^0.8.19;
contract IndexTokenNew is IERC20 {
    using SafeMath for uint256;
    uint public totalSupply;
    mapping(address => uint) public balanceOf;
    mapping(address => mapping(address => uint)) public allowance;
    string public name;
    string public symbol;
    uint8 public decimals = 18;

    //Index token constants
    address immutable owner;
    address[] public holders;

    address[] public tokens;
    uint[] public percentages;

    address uniswapAddress = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D ;
    IUniswapV2Router02 uniswap = IUniswapV2Router02(uniswapAddress);
    address wMATICAddr = 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270;


    constructor(address _owner, address[] memory _tokens, uint[] memory  _percentages, string memory _name, string memory _symbol) {
        //check percentages
        uint numOfTokens = _percentages.length;
        uint percentageCounter;
        uint _decimalFactor = 10**16;

        for(uint i; i < numOfTokens; i++) {
            percentageCounter += _percentages[i];
        }

        //multiply to correct decimals
        for(uint i; i < numOfTokens; i++){
            _percentages[i] = _percentages[i] * _decimalFactor;
        }

        require(percentageCounter <= 100, "percentages do not add up to 100");
        owner = _owner;
        tokens = _tokens;
        percentages = _percentages;
        name = _name;
        symbol = _symbol;



    }

    function getMinToken(uint token,uint amount) public view returns (uint256 result){
        uint _decimalFactor = 10**18;
        uint percentage = percentages[token];
        result = percentage.mul(amount).div(_decimalFactor);
    }

    //Index token mint
    function mint(uint amount) public {
        //get number of tokens using length
        uint numOfTokens = tokens.length;
    
        //loop through all tokens
        for(uint i; i < numOfTokens; i++){
            address _token = tokens[i];

            uint transferAmount = getMinToken(i, amount);
            bool success = IERC20(_token).transferFrom(tx.origin,address(this), transferAmount);
            require(success, "transfer failed");
        }
        //add to holders array
        holders.push(tx.origin);

        _mint(amount);
    }



    function redeem(uint amount) public {
        //get number of tokens using length
        require(amount <= balanceOf[tx.origin] );

        uint numOfTokens = tokens.length;
        address[] memory _tokens = tokens;

        //loop through all tokens
        for (uint i; i < numOfTokens; i++) {
            address _token = _tokens[i];

            uint transferAmount = getMinToken(i, amount);
            IERC20(_token).approve(tx.origin, transferAmount);
            bool success = IERC20(_token).transfer(tx.origin, transferAmount);
            require(success, "transfer failed");
        }

        burn(tx.origin,amount); 
    }


    //owner withdraw streaming fee
    function streamingFee() public  {
        require(tx.origin == owner, "Not owner!");

        address[] memory _holders = holders;

        uint feeCounter;
     


    // REMOVE DUPLICATE HOLDERS IN ARRAY
    // use nested for loop to find the duplicate elements in array 
    uint x;
    uint y;
    uint z;
    uint size = holders.length;
    for ( x = 0; x < size; x ++)  
    {  
        for ( y = x + 1; y < size; y++)  
        {  
            // use if statement to check duplicate element  
            if ( _holders[x] == _holders[y])  
            {  
                // delete the current position of the duplicate element  
                for ( z = y; z < size - 1; z++)  
                {  
                    _holders[z] = _holders[z + 1];  
                }  
                // decrease the size of array after removing duplicate element  
                size--;  
                  
            // if the position of the elements is changes, don't increase the index j  
                y--;      
            }  
        }  
    }

        //rebase / reduce supply by 1%
        uint numHolders = _holders.length;
        for (uint i; i < numHolders; i++){
            if (balanceOf[_holders[i]] > 0){
            uint amtToBurn = (balanceOf[_holders[i]]) / 99;
            
            burn(_holders[i], amtToBurn);
            feeCounter += amtToBurn;
            }
        }

        _mint(feeCounter);

    
    }

    function rebalancePercentages() public {  
        require(tx.origin == owner); 
        uint numOfTokens = tokens.length;

        uint total;
        uint _decimalFactor = 10**18;

        //find balance of all tokens
        for (uint i; i < numOfTokens; i++) {

            total += IERC20(tokens[i]).balanceOf(address(this));

        }

        //change percentage values in storage
        for (uint i; i < numOfTokens; i++) {
            percentages[i] = IERC20(tokens[i]).balanceOf(address(this)) * _decimalFactor / total;
        }
        
    }


    function rebalance(uint tokenOut, uint tokenIn, uint _amount) public {
        address[] memory path = new address[](2);
        //path[0] = tokens[tokenOut]; 
        //path[1] = tokens[tokenIn];
        //better rates:
        path[0] = tokens[tokenOut];
        path[1] = wMATICAddr; 
        path[1] = tokens[tokenIn];

        
        IERC20(tokens[tokenOut]).approve(uniswapAddress,_amount);

        uniswap.swapExactTokensForTokens(_amount, 0, path, address(this), block.timestamp + 15);

        rebalancePercentages();
        
    }

    function getName() public view returns (string memory) {
        return name;
    }

    function getSymbol() public view returns (string memory) {
        return symbol;
    }

    function getPercentages(uint i) public view returns (uint) {
        return percentages[i];
    }


    function getTotalSupply() public view returns (uint256){
        return totalSupply;
    }


    function transfer(address recipient, uint amount) external returns (bool) {
        balanceOf[tx.origin] -= amount;
        balanceOf[recipient] += amount;

        //add to holders array
        holders.push(recipient);

        emit Transfer(tx.origin, recipient, amount);
        return true;
    }

    function approve(address spender, uint amount) external returns (bool) {
        allowance[tx.origin][spender] = amount;
        emit Approval(tx.origin, spender, amount);
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool) {
        allowance[sender][tx.origin] -= amount;
        balanceOf[sender] -= amount;
        balanceOf[recipient] += amount;


        //add to holders array
        holders.push(recipient);


        emit Transfer(sender, recipient, amount);
        return true;
    }

    function _mint(uint amount) internal {
        balanceOf[tx.origin] += amount;
        totalSupply += amount;

        emit Transfer(address(0), tx.origin, amount);
    }

    function burn(address burnee, uint amount) internal {
        balanceOf[burnee] -= amount;
        totalSupply -= amount;
        emit Transfer(tx.origin, address(0), amount);
    }


    //some getter helpers
    function getTokens() public view returns (address[] memory){
        return tokens;
    }

    function getSingleToken(uint _index) public view returns (address) {
        return tokens[_index];
    }

    function getAllPercentages() public view returns (uint[] memory) {
        return percentages;
    }

    function getSinglePercentage(uint _index) public view returns (uint) {
        return percentages[_index];
    }

    function getNumOfTokens() public view returns (uint) {
        return tokens.length;
    }


}


// File contracts/Token.sol

// Original license: SPDX_License_Identifier: MIT
pragma solidity ^0.8.0;
contract Token is IERC20 {
    uint public totalSupply;
    mapping(address => uint) public balanceOf;
    mapping(address => mapping(address => uint)) public allowance;
    string public name ;
    string public symbol;
    uint8 public decimals = 18;

    constructor(string memory _name,string memory _symbol){
        name=_name;
        symbol=_symbol;
    }
    function transfer(address recipient, uint amount) external returns (bool) {
        
        balanceOf[msg.sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function approve(address spender, uint amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool) {
        allowance[sender][msg.sender] -= amount;
        balanceOf[sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(sender, recipient, amount);
        return true;
    }

    function mint(uint amount) external {
        balanceOf[msg.sender] += amount;
        totalSupply += amount;
        emit Transfer(address(0), msg.sender, amount);
    }

    function burn(uint amount) external {
        balanceOf[msg.sender] -= amount;
        totalSupply -= amount;
        emit Transfer(msg.sender, address(0), amount);
    }
}


// File contracts/TokenFactory.sol

// Original license: SPDX_License_Identifier: MIT
pragma solidity ^0.8.19;
contract TokenFactory {

    mapping(address => mapping(uint => address)) public addressToTokens;
    mapping(address => uint) tokenCount;

    //STATE CHANGES

    function createToken(address[] memory _tokens, uint[] memory  _percentages, string memory _name, string memory _symbol) public {

        //create new index token
        IndexTokenNew newToken = new IndexTokenNew(msg.sender, _tokens, _percentages, _name, _symbol);
        ++tokenCount[msg.sender];
        //map msg.sender's tokenCounter to new token to msg.sender
        addressToTokens[msg.sender][tokenCount[msg.sender]] = address(newToken);   
    }

    /// @notice mint/issue tokens in existing Index Token
    /// @param _tokenAddress = address of Index Token
    /// @param amount = amount of tokens to issue
    function issueToken(address _tokenAddress, uint amount) public {
        IndexTokenNew(_tokenAddress).mint(amount);
    }

    /// @notice redeem token, burn index token, receive underlying assets
    /// @param _tokenAddress = address of Index Token
    /// @param amount = amount of Index Token to burn
    function redeemToken(address _tokenAddress, uint amount) public {
        IndexTokenNew(_tokenAddress).redeem(amount);
    }

    /// @notice rebalance, maybe give index of underlying asset to sell,receieve, and amount of token sold
    /// @param _tokenAddress = address of index token
    /// @param _underlyingSell = index of index token's underlying assets array to sell
    /// @param _underlyingBuy = index of index token's underlying assets array to buy
    /// @param _amtToSell = amount of underlying token to sell
    function rebalance(address _tokenAddress, uint _underlyingSell, uint _underlyingBuy, uint _amtToSell) public {
        IndexTokenNew(_tokenAddress).rebalance(_underlyingSell, _underlyingBuy, _amtToSell);
    }

    /// @notice sends 1% of all index tokens to token creator
    /// @param _indexAddress = index token to withdraw from, requires msg.sender is owner
    function collectFee(address _indexAddress) public {
        IndexTokenNew(_indexAddress).streamingFee();
    }

    //GETTERS

    /// @notice returns the amount of index tokens a user has created
    /// @param _creator = address of user
    function getAmountOfIndexTokens(address _creator) public view returns (uint) {
        return tokenCount[_creator];
    }

    /// @notice return array of tokens per address
    /// @param _creator = address of user
    function getAllTokenAddresses(address _creator) public view returns (address[] memory) {
        uint numTokens = tokenCount[_creator];
        address[] memory tokenAddresses = new address[](numTokens); 
        for(uint i = 0; i < numTokens; i++ ) {
            tokenAddresses[i] = addressToTokens[_creator][i+1];  
        }
        return tokenAddresses;
    }

    /// @notice Same as above, but returns address of a single index token by entering owner address, and index of the token
    /// @param  _creator = address of user
    /// @param  index = index of user's created Index token
    function getSingleTokenAddress(address _creator, uint index) public view returns (address) {
        return addressToTokens[_creator][index];
    }

    /// @notice get array of all underlying assets of an index token
    /// @param _indexAddress = address of index token
    function getAllUnderlying(address _indexAddress) public view returns (address[] memory) {
        return IndexTokenNew(_indexAddress).getTokens();
    }

    /// @notice Same as above, but returns address of a single underlying token of a index token
    /// @param _indexAddress = address of index token
    /// @param underlyingIndex = index of Index token's array of underlying assets
    function getSingleUnderlying(address _indexAddress, uint underlyingIndex) public view returns (address) {
        return IndexTokenNew(_indexAddress).getSingleToken(underlyingIndex);
    }

    /// @notice get array of all percentages for a token
    /// @param _indexAddress = address of index token
    function getAllPercentages(address _indexAddress) public view returns (uint[] memory) {
        return IndexTokenNew(_indexAddress).getAllPercentages();
    }

    /// @notice same as above, but get percentage for a specific underlying asset
    /// @param _indexAddress = address of index token
    /// @param underlyingIndex = index of index token's underlying assets array
    function getSinglePercentage(address _indexAddress, uint underlyingIndex) public view returns (uint) {
        return IndexTokenNew(_indexAddress).getSinglePercentage(underlyingIndex);
    }

    /// @notice return array of all token balances in an index
    /// @param _indexAddress = address of index token
    function getAllAmounts(address _indexAddress) public view returns (uint[] memory) {
        uint numOfTokens = IndexTokenNew(_indexAddress).getNumOfTokens();
        uint[] memory tokenAmounts = new uint[](numOfTokens); 
        for(uint i; i < numOfTokens; i++ ) {
            uint tokenAmount = getSingleAmount(_indexAddress, i);
            tokenAmounts[i] = tokenAmount;
        }
        return tokenAmounts;
        
    }


    /// @notice get balance of a single token balance in an index
    /// @param _indexAddress = address of index token
    /// @param underlyingIndex = index of Index token's underlying assets array
    function getSingleAmount(address _indexAddress, uint underlyingIndex) public view returns (uint) {
        address underlyingToken = getSingleUnderlying(_indexAddress, underlyingIndex);
        return IERC20(underlyingToken).balanceOf(_indexAddress);
    }

    function getName(address _indexAddress) public view returns (string memory) {
        return IndexTokenNew(_indexAddress).getName();
    }

    function getSymbol(address _indexAddress) public view returns (string memory) {
        return IndexTokenNew(_indexAddress).getSymbol();
    }

    function getAllNames(address _creator) public view returns (string[] memory) {
        uint numTokens = getAmountOfIndexTokens(_creator);
        string[] memory tokenNames = new string[](numTokens);
        for(uint i; i < numTokens; i++) {
            tokenNames[i] = getName(addressToTokens[_creator][i+1]);
        }
        return tokenNames;
    }

    function getAllSymbols(address _creator) public view returns (string[] memory) {
        uint numTokens = getAmountOfIndexTokens(_creator); //number of tokens a user has created
        string[] memory tokenSymbols = new string[](numTokens);   //memory array to store all symbols temporarily
        for(uint i; i < numTokens; i++) {
            tokenSymbols[i] = getSymbol(addressToTokens[_creator][i+1]); //assign 
        }
        
        return tokenSymbols;
    }

    
}


// File contracts/mintAllTestTokens.sol

// Original license: SPDX_License_Identifier: MIT
pragma solidity ^0.8.19;


contract mintAllTestTokens {
    address USDCAddress = 0x010999b77887cBc58831a1B56A452557bb2BF320;
    address WETHAddress = 0xb884adABb32f9B89711F417E7beBBD39161FABe4;
    address WBTCAddress = 0x54efa9BdAE57a9d6564D1C91494B4A6451ca3543;
    address MATICAddress = 0xea6f35519D0Ae39Dafe928fbeBC8c4bDEbe8F155;
    address AAVEAddress = 0xDe357BDc18B18b8A1518179322bcF4f31125Fff9;

    function mintAllTokens() public {
        IERC20(USDCAddress).mint(1000 ether);
        IERC20(WETHAddress).mint(1000 ether);
        IERC20(WBTCAddress).mint(1000 ether);
        IERC20(MATICAddress).mint(1000 ether);
        IERC20(AAVEAddress).mint(1000 ether);

        IERC20(USDCAddress).transfer(msg.sender,1000 ether);
        IERC20(WETHAddress).transfer(msg.sender,1000 ether);
        IERC20(WBTCAddress).transfer(msg.sender,1000 ether);
        IERC20(MATICAddress).transfer(msg.sender,1000 ether);
        IERC20(AAVEAddress).transfer(msg.sender,1000 ether);

                
    }
    

}   

interface IERC20 {
    function mint(uint amount) external;
    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool);
    function transfer(address recipient, uint amount) external returns (bool);
    function approve(address spender, uint amount) external returns (bool);
}
