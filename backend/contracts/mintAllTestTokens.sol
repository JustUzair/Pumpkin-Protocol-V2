// SPDX-License-Identifier: MIT
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