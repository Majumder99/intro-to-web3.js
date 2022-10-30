// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.0;

contract demo{
    uint public x = 10;
    function setX(uint _x) public{
        x = _x;
    }
}