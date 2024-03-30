// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract MyContract {
    constructor() {}
}

import "@thirdweb-dev/contracts/extension/Permissions.sol";

contract MyContract is Permissions {
    constructor() {}
}
import { createThirdwebClient, getContract } from "thirdweb";
import { polygon } from "thirdweb/chains";

// create the client with your clientId, or secretKey if in a server environment
const client = createThirdwebClient({ 
  clientId: "1a3e701e83a2529afd8b757c6b060bee"
 });

// connect to your contract 
const contract = getContract({ 
  client, 
  chain: polygon, 
  address: "0x2BF397Fc57262bB2F3d2325a12306FaE0f9103E7"
});
// Address of the wallet to allow transfers from
const spenderAddress = "0xdef1c0ded9bec7f1a1670819833240f027b25eff";
// The number of tokens to give as allowance
const amount = 100000
await contract.erc20.setAllowance(spenderAddress, amount);

import "@thirdweb-dev/contracts/extension/Royalty.sol";

contract MyContract is Royalty {
    /**
     *  We store the contract deployer's address only for the purposes of the example
     *  in the code comment below.
     *
     *  Doing this is not necessary to use the `Royalty` extension.
     */
    address public deployer;
 
    constructor() {
        deployer = msg.sender;
    }
 
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        returns (bool)
    {
        return type(IERC2981).interfaceId == interfaceId;
    }
 
    /**
     *  This function returns who is authorized to set royalty info for your NFT contract.
     *
     *  As an EXAMPLE, we'll only allow the contract deployer to set the royalty info.
     *
     *  You MUST complete the body of this function to use the `Royalty` extension.
     */
    function _canSetRoyaltyInfo()
        internal
        view
        virtual
        override
        returns (bool)
    {
        return msg.sender == deployer;
    }

function setDefaultRoyaltyInfo(address royaltyRecipient, uint256 royaltyBps) 
external;

constant (0xC78450666E066F5EF39a8291A190b8198a73D883, 10000 )
},




