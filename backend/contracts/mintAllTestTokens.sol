// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;


contract mintAllTestTokens {
    address USDCAddress = 0x4D424DF818920daA5E7c18d895FeEFf0a0aC7696;
    address WETHAddress = 0xFFB5915AEa9C1337b9B18A5Eea52E26570529D61;
    address WBTCAddress = 0xc8A83EB3B77C22C9189465db7F6F946592b30D4E;
    address MATICAddress = 0xEb1Eb59a354A536288d84CbF6028a2469CdAd741;
    address AAVEAddress = 0xC4577cE8C2a7746BdA75F678d5b951EB26E3567D;

    function mintAllTokens() public {
        genericToken(USDCAddress).mint(1000 ether);
        genericToken(WETHAddress).mint(1000 ether);
        genericToken(WBTCAddress).mint(1000 ether);
        genericToken(MATICAddress).mint(1000 ether);
        genericToken(AAVEAddress).mint(1000 ether);

        genericToken(USDCAddress).approve(msg.sender,1000 ether);
        genericToken(WETHAddress).approve(msg.sender,1000 ether);
        genericToken(WBTCAddress).approve(msg.sender,1000 ether);
        genericToken(MATICAddress).approve(msg.sender,1000 ether);
        genericToken(AAVEAddress).approve(msg.sender,1000 ether);

        genericToken(USDCAddress).transferFrom(address(this),msg.sender,1000);
        genericToken(WETHAddress).transferFrom(address(this),msg.sender,1000 ether);
        genericToken(WBTCAddress).transferFrom(address(this),msg.sender,1000 ether);
        genericToken(MATICAddress).transferFrom(address(this),msg.sender,1000 ether);
        genericToken(AAVEAddress).transferFrom(address(this),msg.sender,1000 ether);

                
    }
    

}   

interface genericToken {
    function mint(uint amount) external;
    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool);

    function approve(address spender, uint amount) external returns (bool);
}