const abi = [
  {
    type: 'event',
    name: 'AddressAddedToWhitelist',
    inputs: [
      {
        type: 'address',
        name: 'account',
        indexed: true,
        internalType: 'address',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'AddressRemovedFromWhitelist',
    inputs: [
      {
        type: 'address',
        name: 'account',
        indexed: true,
        internalType: 'address',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'AuthorizedOperator',
    inputs: [
      {
        type: 'address',
        name: 'operator',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'address',
        name: 'tokenHolder',
        indexed: true,
        internalType: 'address',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'AuthorizedOperatorByPartition',
    inputs: [
      {
        type: 'bytes32',
        name: 'partition',
        indexed: true,
        internalType: 'bytes32',
      },
      {
        type: 'address',
        name: 'operator',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'address',
        name: 'tokenHolder',
        indexed: true,
        internalType: 'address',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'DocumentRemoved',
    inputs: [
      {
        type: 'bytes32',
        name: '_name',
        indexed: true,
        internalType: 'bytes32',
      },
      {
        type: 'string',
        name: '_uri',
        indexed: false,
        internalType: 'string',
      },
      {
        type: 'bytes32',
        name: '_documentHash',
        indexed: false,
        internalType: 'bytes32',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'DocumentUpdated',
    inputs: [
      {
        type: 'bytes32',
        name: '_name',
        indexed: true,
        internalType: 'bytes32',
      },
      {
        type: 'string',
        name: '_uri',
        indexed: false,
        internalType: 'string',
      },
      {
        type: 'bytes32',
        name: '_documentHash',
        indexed: false,
        internalType: 'bytes32',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'IssuedByPartition',
    inputs: [
      {
        type: 'bytes32',
        name: 'partition',
        indexed: true,
        internalType: 'bytes32',
      },
      {
        type: 'address',
        name: 'to',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'uint256',
        name: 'value',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ManagerAdded',
    inputs: [
      {
        type: 'address',
        name: 'manager',
        indexed: true,
        internalType: 'address',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ManagerRemoved',
    inputs: [
      {
        type: 'address',
        name: 'manager',
        indexed: true,
        internalType: 'address',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      {
        type: 'address',
        name: 'previousOwner',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'address',
        name: 'newOwner',
        indexed: true,
        internalType: 'address',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'RedeemedByPartition',
    inputs: [
      {
        type: 'bytes32',
        name: 'partition',
        indexed: true,
        internalType: 'bytes32',
      },
      {
        type: 'address',
        name: 'operator',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'address',
        name: 'from',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'uint256',
        name: 'value',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'RevokedOperator',
    inputs: [
      {
        type: 'address',
        name: 'operator',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'address',
        name: 'tokenHolder',
        indexed: true,
        internalType: 'address',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'RevokedOperatorByPartition',
    inputs: [
      {
        type: 'bytes32',
        name: 'partition',
        indexed: true,
        internalType: 'bytes32',
      },
      {
        type: 'address',
        name: 'operator',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'address',
        name: 'tokenHolder',
        indexed: true,
        internalType: 'address',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'TransferByPartition',
    inputs: [
      {
        type: 'bytes32',
        name: '_fromPartition',
        indexed: true,
        internalType: 'bytes32',
      },
      {
        type: 'address',
        name: '_from',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'address',
        name: '_to',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'uint256',
        name: '_value',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'function',
    name: '_validPartitionForReceiver',
    inputs: [
      {
        type: 'bytes32',
        name: '_partition',
        internalType: 'bytes32',
      },
      {
        type: 'address',
        name: '_to',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        type: 'bool',
        name: '',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'addManager',
    inputs: [
      {
        type: 'address',
        name: '_manager',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'addToWhitelist',
    inputs: [
      {
        type: 'address',
        name: 'account',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'authorizeOperator',
    inputs: [
      {
        type: 'address',
        name: '_operator',
        internalType: 'address',
      },
      {
        type: 'address',
        name: 'tokenHolder',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'authorizeOperatorByPartition',
    inputs: [
      {
        type: 'bytes32',
        name: '_partition',
        internalType: 'bytes32',
      },
      {
        type: 'address',
        name: '_operator',
        internalType: 'address',
      },
      {
        type: 'address',
        name: 'tokenHolder',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'balanceOf',
    inputs: [
      {
        type: 'address',
        name: '_tokenHolder',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        type: 'uint256',
        name: '',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'balanceOfAt',
    inputs: [
      {
        type: 'bytes32',
        name: 'partition',
        internalType: 'bytes32',
      },
      {
        type: 'address',
        name: '_owner',
        internalType: 'address',
      },
      {
        type: 'uint256',
        name: '_blockNumber',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        type: 'uint256',
        name: '',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'balanceOfByPartition',
    inputs: [
      {
        type: 'bytes32',
        name: '_partition',
        internalType: 'bytes32',
      },
      {
        type: 'address',
        name: '_tokenHolder',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        type: 'uint256',
        name: '',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'canTransferByPartition',
    inputs: [
      {
        type: 'address',
        name: '_from',
        internalType: 'address',
      },
      {
        type: 'address',
        name: '_to',
        internalType: 'address',
      },
      {
        type: 'bytes32',
        name: '_partition',
        internalType: 'bytes32',
      },
      {
        type: 'uint256',
        name: '_value',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        type: 'bytes1',
        name: '',
        internalType: 'bytes1',
      },
      {
        type: 'bytes32',
        name: '',
        internalType: 'bytes32',
      },
      {
        type: 'bytes32',
        name: '',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getAllDocuments',
    inputs: [],
    outputs: [
      {
        type: 'bytes32[]',
        name: '',
        internalType: 'bytes32[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getDocument',
    inputs: [
      {
        type: 'bytes32',
        name: '_name',
        internalType: 'bytes32',
      },
    ],
    outputs: [
      {
        type: 'string',
        name: '',
        internalType: 'string',
      },
      {
        type: 'bytes32',
        name: '',
        internalType: 'bytes32',
      },
      {
        type: 'uint256',
        name: '',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isManager',
    inputs: [
      {
        type: 'address',
        name: '_manager',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        type: 'bool',
        name: '',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isOperator',
    inputs: [
      {
        type: 'address',
        name: '_operator',
        internalType: 'address',
      },
      {
        type: 'address',
        name: '_tokenHolder',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        type: 'bool',
        name: '',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isOperatorForPartition',
    inputs: [
      {
        type: 'bytes32',
        name: '_partition',
        internalType: 'bytes32',
      },
      {
        type: 'address',
        name: '_operator',
        internalType: 'address',
      },
      {
        type: 'address',
        name: '_tokenHolder',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        type: 'bool',
        name: '',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isOwner',
    inputs: [],
    outputs: [
      {
        type: 'bool',
        name: '',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isWhitelisted',
    inputs: [
      {
        type: 'address',
        name: 'account',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        type: 'bool',
        name: '',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'issueByPartition',
    inputs: [
      {
        type: 'bytes32',
        name: '_partition',
        internalType: 'bytes32',
      },
      {
        type: 'address',
        name: '_tokenHolder',
        internalType: 'address',
      },
      {
        type: 'uint256',
        name: '_value',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'operatorRedeemByPartition',
    inputs: [
      {
        type: 'bytes32',
        name: '_partition',
        internalType: 'bytes32',
      },
      {
        type: 'address',
        name: '_tokenHolder',
        internalType: 'address',
      },
      {
        type: 'uint256',
        name: '_value',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'operatorTransferByPartition',
    inputs: [
      {
        type: 'bytes32',
        name: '_partition',
        internalType: 'bytes32',
      },
      {
        type: 'address',
        name: '_from',
        internalType: 'address',
      },
      {
        type: 'address',
        name: '_to',
        internalType: 'address',
      },
      {
        type: 'uint256',
        name: '_value',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        type: 'bytes32',
        name: '',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [
      {
        type: 'address',
        name: '',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'partitionsOf',
    inputs: [
      {
        type: 'address',
        name: '_tokenHolder',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        type: 'bytes32[]',
        name: '',
        internalType: 'bytes32[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'redeemByPartition',
    inputs: [
      {
        type: 'bytes32',
        name: '_partition',
        internalType: 'bytes32',
      },
      {
        type: 'uint256',
        name: '_value',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'removeDocument',
    inputs: [
      {
        type: 'bytes32',
        name: '_name',
        internalType: 'bytes32',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'removeFromWhitelist',
    inputs: [
      {
        type: 'address',
        name: 'account',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'removeManager',
    inputs: [
      {
        type: 'address',
        name: '_manager',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'renounceOwnership',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'revokeOperator',
    inputs: [
      {
        type: 'address',
        name: '_operator',
        internalType: 'address',
      },
      {
        type: 'address',
        name: 'tokenHolder',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'revokeOperatorByPartition',
    inputs: [
      {
        type: 'bytes32',
        name: '_partition',
        internalType: 'bytes32',
      },
      {
        type: 'address',
        name: '_operator',
        internalType: 'address',
      },
      {
        type: 'address',
        name: 'tokenHolder',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setDocument',
    inputs: [
      {
        type: 'bytes32',
        name: '_name',
        internalType: 'bytes32',
      },
      {
        type: 'string',
        name: '_uri',
        internalType: 'string',
      },
      {
        type: 'bytes32',
        name: '_documentHash',
        internalType: 'bytes32',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'totalSupply',
    inputs: [],
    outputs: [
      {
        type: 'uint256',
        name: '',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'totalSupplyAt',
    inputs: [
      {
        type: 'bytes32',
        name: 'partition',
        internalType: 'bytes32',
      },
      {
        type: 'uint256',
        name: '_blockNumber',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        type: 'uint256',
        name: '',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'totalSupplyByPartition',
    inputs: [
      {
        type: 'bytes32',
        name: '_partition',
        internalType: 'bytes32',
      },
    ],
    outputs: [
      {
        type: 'uint256',
        name: '',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [
      {
        type: 'address',
        name: 'newOwner',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

export default abi;

export const _bytecode =
  '0x60806040523480156200001157600080fd5b5033600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3620000e133620000e760201b60201c565b62000579565b620000f7620002f260201b60201c565b806200011057506200010f336200034a60201b60201c565b5b62000152576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620001499062000427565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603620001c4576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620001bb90620004bf565b60405180910390fd5b600b60008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161562000254576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200024b9062000557565b60405180910390fd5b6001600b60008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508073ffffffffffffffffffffffffffffffffffffffff167f534d18c8ff24ba5980906d732f3075704749427353734fbbf05d50485643b12460405160405180910390a250565b6000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614905090565b6000600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff169050919050565b600082825260208201905092915050565b7f43616c6c6572206973206e6f7420746865206f776e6572206f72206d616e616760008201527f6572000000000000000000000000000000000000000000000000000000000000602082015250565b60006200040f602283620003a0565b91506200041c82620003b1565b604082019050919050565b60006020820190508181036000830152620004428162000400565b9050919050565b7f4552433134313057686974654c6973743a20696e76616c69642061646472657360008201527f7300000000000000000000000000000000000000000000000000000000000000602082015250565b6000620004a7602183620003a0565b9150620004b48262000449565b604082019050919050565b60006020820190508181036000830152620004da8162000498565b9050919050565b7f4552433134313057686974654c6973743a206164647265737320616c7265616460008201527f792077686974656c697374656400000000000000000000000000000000000000602082015250565b60006200053f602d83620003a0565b91506200054c82620004e1565b604082019050919050565b60006020820190508181036000830152620005728162000530565b9050919050565b615a5680620005896000396000f3fe608060405234801561001057600080fd5b50600436106101fb5760003560e01c80638da5cb5b1161011a578063b6363cf2116100ad578063f2e356471161007c578063f2e35647146105d2578063f2fde38b14610602578063f3ae24151461061e578063fab1e3c11461064e578063fd44c1141461067e576101fb565b8063b6363cf21461054e578063c35018481461057e578063c79eb9bd1461059a578063e43252d7146105b6576101fb565b80639fa5f50b116100e95780639fa5f50b146104b2578063a26734dc146104d0578063ac18de4314610500578063b10d6b411461051c576101fb565b80638da5cb5b1461043e5780638f32d59b1461045c57806396db34521461047a5780639908b7ae14610496576101fb565b806365acd5a311610192578063740ab8f411610161578063740ab8f4146103ba57806379f5dd33146103ea5780638ab1d681146104065780638cc500a914610422576101fb565b806365acd5a31461031e5780636d77cad61461035057806370a0823114610380578063715018a6146103b0576101fb565b806330e82803116101ce57806330e828031461028657806335d68018146102b65780633af32abf146102d2578063569d6ba214610302576101fb565b8063010648ca1461020057806318160ddd1461021c578063220a3f711461023a5780632d06177a1461026a575b600080fd5b61021a60048036038101906102159190614398565b6106ae565b005b6102246108d6565b6040516102319190614425565b60405180910390f35b610254600480360381019061024f91906144ca565b6108e0565b6040516102619190614425565b60405180910390f35b610284600480360381019061027f919061451d565b610943565b005b6102a0600480360381019061029b919061454a565b61099f565b6040516102ad9190614425565b60405180910390f35b6102d060048036038101906102cb91906144ca565b6109b3565b005b6102ec60048036038101906102e7919061451d565b610e52565b6040516102f991906145a5565b60405180910390f35b61031c600480360381019061031791906145c0565b610ea8565b005b61033860048036038101906103339190614600565b610fe2565b604051610347939291906146b1565b60405180910390f35b61036a600480360381019061036591906146e8565b61129b565b60405161037791906145a5565b60405180910390f35b61039a6004803603810190610395919061451d565b611341565b6040516103a79190614425565b60405180910390f35b6103b861138a565b005b6103d460048036038101906103cf919061451d565b611492565b6040516103e191906147f9565b60405180910390f35b61040460048036038101906103ff91906146e8565b61160f565b005b610420600480360381019061041b919061451d565b61175c565b005b61043c6004803603810190610437919061481b565b6117bf565b005b61044661185c565b604051610453919061486a565b60405180910390f35b610464611886565b60405161047191906145a5565b60405180910390f35b610494600480360381019061048f91906146e8565b611895565b005b6104b060048036038101906104ab91906144ca565b6119e2565b005b6104ba611b07565b6040516104c791906147f9565b60405180910390f35b6104ea60048036038101906104e59190614885565b611b5f565b6040516104f79190614425565b60405180910390f35b61051a6004803603810190610515919061451d565b611b71565b005b61053660048036038101906105319190614885565b611bcd565b60405161054593929190614942565b60405180910390f35b610568600480360381019061056391906145c0565b611caf565b60405161057591906145a5565b60405180910390f35b61059860048036038101906105939190614885565b611d43565b005b6105b460048036038101906105af91906145c0565b612003565b005b6105d060048036038101906105cb919061451d565b61213d565b005b6105ec60048036038101906105e7919061454a565b6121a0565b6040516105f991906145a5565b60405180910390f35b61061c6004803603810190610617919061451d565b612284565b005b6106386004803603810190610633919061451d565b6122d7565b60405161064591906145a5565b60405180910390f35b6106686004803603810190610663919061481b565b6122e9565b6040516106759190614425565b60405180910390f35b61069860048036038101906106939190614980565b61230f565b6040516106a591906149e7565b60405180910390f35b6106b661252b565b806106c657506106c533612583565b5b610705576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106fc90614a74565b60405180910390fd5b6000801b840361074a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161074190614ae0565b60405180910390fd5b60008383905011610790576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161078790614b4c565b60405180910390fd5b6000600c600086815260200190815260200160002060010154036107f557600e849080600181540180825580915050600190039060005260206000200160009091909190915055600e80549050600d6000868152602001908152602001600020819055505b604051806060016040528082815260200142815260200184848080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050815250600c6000868152602001908152602001600020600082015181600001556020820151816001015560408201518160020190816108909190614da7565b50905050837fb4c22d60cd550a815744f04e3ff5278bf19684565ee00e2b084041b6024bd6f68484846040516108c893929190614eb5565b60405180910390a250505050565b6000600254905090565b600061093a60008086815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020836125d9565b90509392505050565b61094b61252b565b61098a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161098190614f33565b60405180910390fd5b6109938161278d565b61099c816128e3565b50565b60006109ab8383612ad4565b905092915050565b6109bb61252b565b806109cb57506109ca33612583565b5b610a0a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a0190614a74565b60405180910390fd5b81610a1481610e52565b610a53576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a4a90614fc5565b60405180910390fd5b610a5d8483612bb6565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610acc576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ac390615031565b60405180910390fd5b6000600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600086815260200190815260200160002054905060008103610c5857600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020604051806040016040528085815260200187815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000155602082015181600101555050600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002080549050600660008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600087815260200190815260200160002081905550610d4c565b610cd983600460008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600184610ca89190615080565b81548110610cb957610cb86150b4565b5b906000526020600020906002020160000154612c4290919063ffffffff16565b600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600183610d259190615080565b81548110610d3657610d356150b4565b5b9060005260206000209060020201600001819055505b610d6183600254612c4290919063ffffffff16565b600281905550610db983600360008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054612c4290919063ffffffff16565b600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508373ffffffffffffffffffffffffffffffffffffffff16857f1dbbe618f2c7a9f1debd8e797e1577d775be2ca6a03382b04be5648e68c7810485604051610e439190614425565b60405180910390a35050505050565b6000600b60008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff169050919050565b610eb061252b565b610eef576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ee690614f33565b60405180910390fd5b6001600a60008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167ff4caeb2d6ca8932a215a353d0703c326ec2d81fc68170f320eb2ab49e9df61f960405160405180910390a35050565b6000806000610ff18588612c6a565b61102c57605060008160f81b91507f506172746974696f6e206e6f742065786973747300000000000000000000000090925092509250611291565b83600460008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600660008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600088815260200190815260200160002054815481106110ce576110cd6150b4565b5b906000526020600020906002020160000154101561111d57605260008160f81b91507f496e737566666963656e742062616c616e63650000000000000000000000000090925092509250611291565b600073ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff160361118857605760008160f81b91507f496e76616c69642072656365697665720000000000000000000000000000000090925092509250611291565b6111d1600360008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205485612d75565b15806112235750611221600360008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205485612d92565b155b1561125f57605060008160f81b91507f4f766572666c6f7700000000000000000000000000000000000000000000000090925092509250611291565b6051858160f81b91507f5375636365737300000000000000000000000000000000000000000000000000909250925092505b9450945094915050565b6000600960008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600085815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1690509392505050565b6000600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b61139261252b565b6113d1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113c890614f33565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff16600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a36000600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b60606000600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208054905067ffffffffffffffff8111156114f2576114f1614b6c565b5b6040519080825280602002602001820160405280156115205781602001602082028036833780820191505090505b50905060005b600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208054905081101561160557600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081815481106115c1576115c06150b4565b5b9060005260206000209060020201600101548282815181106115e6576115e56150b4565b5b60200260200101818152505080806115fd906150e3565b915050611526565b5080915050919050565b61161761252b565b611656576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161164d90614f33565b60405180910390fd5b6000600960008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600085815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16847f3b287c4f1bab4df949b33bceacef984f544dc5d5479930d00e4ee8c9d8dd96f260405160405180910390a4505050565b61176461252b565b80611774575061177333612583565b5b6117b3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016117aa90614a74565b60405180910390fd5b6117bc81612dc1565b50565b600b60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1661184b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016118429061519d565b60405180910390fd5b6118588233600084612f5a565b5050565b6000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600061189061252b565b905090565b61189d61252b565b6118dc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016118d390614f33565b60405180910390fd5b6001600960008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600085815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16847f3646a897c70797ecc134b0adc32f471b07bf1d6f451133b0384badab531e3fd660405160405180910390a4505050565b816119ec81610e52565b611a2b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a2290614fc5565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603611a9a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a9190615209565b60405180910390fd5b611aa43384611caf565b80611ab65750611ab584338561129b565b5b611af5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611aec90615275565b60405180910390fd5b611b0184843385612f5a565b50505050565b6060600e805480602002602001604051908101604052809291908181526020018280548015611b5557602002820191906000526020600020905b815481526020019060010190808311611b41575b5050505050905090565b6000611b6a82613361565b9050919050565b611b7961252b565b611bb8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611baf90614f33565b60405180910390fd5b611bc18161337e565b611bca81612dc1565b50565b6060600080600c6000858152602001908152602001600020600201600c600086815260200190815260200160002060000154600c600087815260200190815260200160002060010154828054611c2290614bca565b80601f0160208091040260200160405190810160405280929190818152602001828054611c4e90614bca565b8015611c9b5780601f10611c7057610100808354040283529160200191611c9b565b820191906000526020600020905b815481529060010190602001808311611c7e57829003601f168201915b505050505092509250925092509193909250565b6000600a60008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b611d4b61252b565b80611d5b5750611d5a33612583565b5b611d9a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611d9190614a74565b60405180910390fd5b6000600c60008381526020019081526020016000206001015403611df3576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611dea906152e1565b60405180910390fd5b6000600d60008381526020019081526020016000205411611e49576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611e409061534d565b60405180910390fd5b60006001600d600084815260200190815260200160002054611e6b9190615080565b90506000600e80549050118015611e9357506001600e80549050611e8f9190615080565b8114155b15611f2d57600e6001600e80549050611eac9190615080565b81548110611ebd57611ebc6150b4565b5b9060005260206000200154600e8281548110611edc57611edb6150b4565b5b9060005260206000200181905550600181611ef7919061536d565b600d6000600e8481548110611f0f57611f0e6150b4565b5b90600052602060002001548152602001908152602001600020819055505b6000600e805490501115611f6457600e805480611f4d57611f4c6153a1565b5b600190038181906000526020600020016000905590555b817f3d9bba27d3e360d8c80645beed7e991454a8271bf6f269a24f7782be0f0d0654600c6000858152602001908152602001600020600201600c600086815260200190815260200160002060000154604051611fc1929190615454565b60405180910390a2600c60008381526020019081526020016000206000808201600090556001820160009055600282016000611ffd9190614203565b50505050565b61200b61252b565b61204a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161204190614f33565b60405180910390fd5b6000600a60008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f50546e66e5f44d728365dc3908c63bc5cfeeab470722c1677e3073a6ac294aa160405160405180910390a35050565b61214561252b565b80612155575061215433612583565b5b612194576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161218b90614a74565b60405180910390fd5b61219d816128e3565b50565b600080600090505b600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805490508110156122785783600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208281548110612244576122436150b4565b5b9060005260206000209060020201600101540361226557600191505061227e565b8080612270906150e3565b9150506121a8565b50600090505b92915050565b61228c61252b565b6122cb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016122c290614f33565b60405180910390fd5b6122d481613464565b50565b60006122e282612583565b9050919050565b600061230760016000858152602001908152602001600020836125d9565b905092915050565b60008433600960008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff168061243f5750600a60008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b61247e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612475906154f6565b60405180910390fd5b8561248881610e52565b6124c7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016124be90614fc5565b60405180910390fd5b856124d181610e52565b612510576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161250790614fc5565b60405180910390fd5b61251c8888888c61355d565b88945050505050949350505050565b6000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614905090565b6000600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff169050919050565b6000808380549050036125ef5760009050612787565b8261260860018580549050613cbb90919063ffffffff16565b81548110612619576126186150b4565b5b9060005260206000209060020201600001548210612674578261264a60018580549050613cbb90919063ffffffff16565b8154811061265b5761265a6150b4565b5b9060005260206000209060020201600101549050612787565b82600081548110612688576126876150b4565b5b9060005260206000209060020201600001548210156126aa5760009050612787565b6000806126c560018680549050613cbb90919063ffffffff16565b90505b8181111561275d57600061270b60026126fd60016126ef8787612c4290919063ffffffff16565b612c4290919063ffffffff16565b613ce490919063ffffffff16565b905084868281548110612721576127206150b4565b5b9060005260206000209060020201600001541161274057809250612757565b612754600182613cbb90919063ffffffff16565b91505b506126c8565b8482815481106127705761276f6150b4565b5b906000526020600020906002020160010154925050505b92915050565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036127fc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016127f390615588565b60405180910390fd5b61280581612583565b15612845576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161283c906155f4565b60405180910390fd5b6001600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508073ffffffffffffffffffffffffffffffffffffffff167f3b4a40cccf2058c593542587329dd385be4f0b588db5471fbd9598e56dd7093a60405160405180910390a250565b6128eb61252b565b806128fb57506128fa33612583565b5b61293a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161293190614a74565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036129a9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016129a090615686565b60405180910390fd5b600b60008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1615612a36576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612a2d90615718565b60405180910390fd5b6001600b60008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508073ffffffffffffffffffffffffffffffffffffffff167f534d18c8ff24ba5980906d732f3075704749427353734fbbf05d50485643b12460405160405180910390a250565b6000612ae08383612c6a565b15612bab57600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600086815260200190815260200160002054612b819190615080565b81548110612b9257612b916150b4565b5b9060005260206000209060020201600001549050612bb0565b600090505b92915050565b60008103612bf9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612bf090615784565b60405180910390fd5b6000801b8203612c3e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612c35906157f0565b60405180910390fd5b5050565b6000808284612c51919061536d565b905083811015612c6057600080fd5b8091505092915050565b6000600660008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600084815260200190815260200160002054600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805490501080612d5c57506000600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600085815260200190815260200160002054145b15612d6a5760009050612d6f565b600190505b92915050565b6000828211612d875760019050612d8c565b600090505b92915050565b6000808284612da1919061536d565b905083811015612db5576000915050612dbb565b60019150505b92915050565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603612e30576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612e2790615686565b60405180910390fd5b600b60008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16612ebc576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612eb390614fc5565b60405180910390fd5b6000600b60008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508073ffffffffffffffffffffffffffffffffffffffff167f535611fb62fa2a833988f283b779e417e996813e44046f521d76c17b5943b08c60405160405180910390a250565b612f648482612bb6565b612f6e8484612c6a565b612fad576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612fa4906157f0565b60405180910390fd5b60006001600660008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008781526020019081526020016000205461300c9190615080565b905081600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002082815481106130605761305f6150b4565b5b90600052602060002090600202016000015410156130b3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016130aa9061585c565b60405180910390fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208281548110613105576131046150b4565b5b9060005260206000209060020201600001540361312c57613127848683613d0c565b613208565b6131a182600460008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208381548110613181576131806150b4565b5b906000526020600020906002020160000154613cbb90919063ffffffff16565b600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002082815481106131f2576131f16150b4565b5b9060005260206000209060020201600001819055505b61325a82600360008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054613cbb90919063ffffffff16565b600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506132b282600254613cbb90919063ffffffff16565b6002819055506132d76132c5868661400d565b866132d08888612ad4565b6001614066565b6132f46132e3866141e7565b866132ed88613361565b6000614066565b8373ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16867f0b01e7770fcd6cf1eef5f220fee6fb1ed951bc67f9701b9542dd1763e7e3ee8e856040516133529190614425565b60405180910390a45050505050565b600060056000838152602001908152602001600020549050919050565b61338781612583565b6133c6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016133bd906158c8565b60405180910390fd5b6000600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508073ffffffffffffffffffffffffffffffffffffffff167fef69f7d97228658c92417be1b16b19058315de71fecb435d07b7d23728b6bd3160405160405180910390a250565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361349d57600080fd5b8073ffffffffffffffffffffffffffffffffffffffff16600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a380600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6135678185612c6a565b6135a6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161359d906157f0565b60405180910390fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001600660008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000858152602001908152602001600020546136439190615080565b81548110613654576136536150b4565b5b90600052602060002090600202016000015410156136a7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161369e90615934565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603613716576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161370d906159a0565b60405180910390fd5b60006001600660008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000848152602001908152602001600020546137759190615080565b905061378182856121a0565b6138b157600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060405180604001604052806000815260200184815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000155602082015181600101555050600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002080549050600660008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000848152602001908152602001600020819055505b60006001600660008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000858152602001908152602001600020546139109190615080565b905061398784600460008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208481548110613967576139666150b4565b5b906000526020600020906002020160000154613cbb90919063ffffffff16565b600460008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002083815481106139d8576139d76150b4565b5b906000526020600020906002020160000181905550613a3f84600360008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054613cbb90919063ffffffff16565b600360008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550613af784600460008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208381548110613ad757613ad66150b4565b5b906000526020600020906002020160000154612c4290919063ffffffff16565b600460008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208281548110613b4857613b476150b4565b5b906000526020600020906002020160000181905550613baf84600360008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054612c4290919063ffffffff16565b600360008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550613c11613bff848861400d565b84613c0a868a612ad4565b6001614066565b613c30613c1e848761400d565b84613c298689612ad4565b6001614066565b613c4d613c3c846141e7565b84613c4686613361565b6000614066565b8473ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff16847f0f527c5f31fde91835354ad82e863e96d8637df7a0254bfb42879978fc047e5687604051613cab9190614425565b60405180910390a4505050505050565b600082821115613cca57600080fd5b60008284613cd89190615080565b90508091505092915050565b6000808211613cf257600080fd5b60008284613d0091906159ef565b90508091505092915050565b60006001600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002080549050613d5d9190615080565b9050808214613eff57600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208181548110613db757613db66150b4565b5b9060005260206000209060020201600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208381548110613e1657613e156150b4565b5b90600052602060002090600202016000820154816000015560018201548160010155905050600182613e48919061536d565b600660008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000600460008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208581548110613eda57613ed96150b4565b5b9060005260206000209060020201600101548152602001908152602001600020819055505b600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600084815260200190815260200160002060009055600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805480613fa257613fa16153a1565b5b6001900381819060005260206000209060020201600080820160009055600182016000905550509055613fea613fd8848661400d565b84613fe38688612ad4565b6001614066565b614007613ff6846141e7565b8461400086613361565b6000614066565b50505050565b600080600084815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905092915050565b6000848054905014806140b35750438461408e60018780549050613cbb90919063ffffffff16565b8154811061409f5761409e6150b4565b5b906000526020600020906002020160000154105b156141125783604051806040016040528043815260200184815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000155602082015181600101555050614153565b818461412c60018780549050613cbb90919063ffffffff16565b8154811061413d5761413c6150b4565b5b9060005260206000209060020201600101819055505b80156141bd578360008085815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209080546141b7929190614243565b506141e1565b83600160008581526020019081526020016000209080546141df929190614243565b505b50505050565b6000600160008381526020019081526020016000209050919050565b50805461420f90614bca565b6000825580601f106142215750614240565b601f01602090049060005260206000209081019061423f91906142af565b5b50565b82805482825590600052602060002090600202810192821561429e5760005260206000209160020282015b8281111561429d578282600082015481600001556001820154816001015550509160020191906002019061426e565b5b5090506142ab91906142cc565b5090565b5b808211156142c85760008160009055506001016142b0565b5090565b5b808211156142ef576000808201600090556001820160009055506002016142cd565b5090565b600080fd5b600080fd5b6000819050919050565b614310816142fd565b811461431b57600080fd5b50565b60008135905061432d81614307565b92915050565b600080fd5b600080fd5b600080fd5b60008083601f84011261435857614357614333565b5b8235905067ffffffffffffffff81111561437557614374614338565b5b6020830191508360018202830111156143915761439061433d565b5b9250929050565b600080600080606085870312156143b2576143b16142f3565b5b60006143c08782880161431e565b945050602085013567ffffffffffffffff8111156143e1576143e06142f8565b5b6143ed87828801614342565b935093505060406144008782880161431e565b91505092959194509250565b6000819050919050565b61441f8161440c565b82525050565b600060208201905061443a6000830184614416565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061446b82614440565b9050919050565b61447b81614460565b811461448657600080fd5b50565b60008135905061449881614472565b92915050565b6144a78161440c565b81146144b257600080fd5b50565b6000813590506144c48161449e565b92915050565b6000806000606084860312156144e3576144e26142f3565b5b60006144f18682870161431e565b935050602061450286828701614489565b9250506040614513868287016144b5565b9150509250925092565b600060208284031215614533576145326142f3565b5b600061454184828501614489565b91505092915050565b60008060408385031215614561576145606142f3565b5b600061456f8582860161431e565b925050602061458085828601614489565b9150509250929050565b60008115159050919050565b61459f8161458a565b82525050565b60006020820190506145ba6000830184614596565b92915050565b600080604083850312156145d7576145d66142f3565b5b60006145e585828601614489565b92505060206145f685828601614489565b9150509250929050565b6000806000806080858703121561461a576146196142f3565b5b600061462887828801614489565b945050602061463987828801614489565b935050604061464a8782880161431e565b925050606061465b878288016144b5565b91505092959194509250565b60007fff0000000000000000000000000000000000000000000000000000000000000082169050919050565b61469c81614667565b82525050565b6146ab816142fd565b82525050565b60006060820190506146c66000830186614693565b6146d360208301856146a2565b6146e060408301846146a2565b949350505050565b600080600060608486031215614701576147006142f3565b5b600061470f8682870161431e565b935050602061472086828701614489565b925050604061473186828701614489565b9150509250925092565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b614770816142fd565b82525050565b60006147828383614767565b60208301905092915050565b6000602082019050919050565b60006147a68261473b565b6147b08185614746565b93506147bb83614757565b8060005b838110156147ec5781516147d38882614776565b97506147de8361478e565b9250506001810190506147bf565b5085935050505092915050565b60006020820190508181036000830152614813818461479b565b905092915050565b60008060408385031215614832576148316142f3565b5b60006148408582860161431e565b9250506020614851858286016144b5565b9150509250929050565b61486481614460565b82525050565b600060208201905061487f600083018461485b565b92915050565b60006020828403121561489b5761489a6142f3565b5b60006148a98482850161431e565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156148ec5780820151818401526020810190506148d1565b60008484015250505050565b6000601f19601f8301169050919050565b6000614914826148b2565b61491e81856148bd565b935061492e8185602086016148ce565b614937816148f8565b840191505092915050565b6000606082019050818103600083015261495c8186614909565b905061496b60208301856146a2565b6149786040830184614416565b949350505050565b6000806000806080858703121561499a576149996142f3565b5b60006149a88782880161431e565b94505060206149b987828801614489565b93505060406149ca87828801614489565b92505060606149db878288016144b5565b91505092959194509250565b60006020820190506149fc60008301846146a2565b92915050565b7f43616c6c6572206973206e6f7420746865206f776e6572206f72206d616e616760008201527f6572000000000000000000000000000000000000000000000000000000000000602082015250565b6000614a5e6022836148bd565b9150614a6982614a02565b604082019050919050565b60006020820190508181036000830152614a8d81614a51565b9050919050565b7f5a65726f2076616c7565206973206e6f7420616c6c6f77656400000000000000600082015250565b6000614aca6019836148bd565b9150614ad582614a94565b602082019050919050565b60006020820190508181036000830152614af981614abd565b9050919050565b7f53686f756c64206e6f74206265206120656d7074792075726900000000000000600082015250565b6000614b366019836148bd565b9150614b4182614b00565b602082019050919050565b60006020820190508181036000830152614b6581614b29565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680614be257607f821691505b602082108103614bf557614bf4614b9b565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302614c5d7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82614c20565b614c678683614c20565b95508019841693508086168417925050509392505050565b6000819050919050565b6000614ca4614c9f614c9a8461440c565b614c7f565b61440c565b9050919050565b6000819050919050565b614cbe83614c89565b614cd2614cca82614cab565b848454614c2d565b825550505050565b600090565b614ce7614cda565b614cf2818484614cb5565b505050565b5b81811015614d1657614d0b600082614cdf565b600181019050614cf8565b5050565b601f821115614d5b57614d2c81614bfb565b614d3584614c10565b81016020851015614d44578190505b614d58614d5085614c10565b830182614cf7565b50505b505050565b600082821c905092915050565b6000614d7e60001984600802614d60565b1980831691505092915050565b6000614d978383614d6d565b9150826002028217905092915050565b614db0826148b2565b67ffffffffffffffff811115614dc957614dc8614b6c565b5b614dd38254614bca565b614dde828285614d1a565b600060209050601f831160018114614e115760008415614dff578287015190505b614e098582614d8b565b865550614e71565b601f198416614e1f86614bfb565b60005b82811015614e4757848901518255600182019150602085019450602081019050614e22565b86831015614e645784890151614e60601f891682614d6d565b8355505b6001600288020188555050505b505050505050565b82818337600083830152505050565b6000614e9483856148bd565b9350614ea1838584614e79565b614eaa836148f8565b840190509392505050565b60006040820190508181036000830152614ed0818587614e88565b9050614edf60208301846146a2565b949350505050565b7f43616c6c6572206973206e6f7420746865206f776e6572000000000000000000600082015250565b6000614f1d6017836148bd565b9150614f2882614ee7565b602082019050919050565b60006020820190508181036000830152614f4c81614f10565b9050919050565b7f4552433134313057686974654c6973743a2061646472657373206e6f7420776860008201527f6974656c69737465640000000000000000000000000000000000000000000000602082015250565b6000614faf6029836148bd565b9150614fba82614f53565b604082019050919050565b60006020820190508181036000830152614fde81614fa2565b9050919050565b7f496e76616c696420746f6b656e20726563656976657200000000000000000000600082015250565b600061501b6016836148bd565b915061502682614fe5565b602082019050919050565b6000602082019050818103600083015261504a8161500e565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061508b8261440c565b91506150968361440c565b92508282039050818111156150ae576150ad615051565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60006150ee8261440c565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036151205761511f615051565b5b600182019050919050565b7f4552433134313057686974654c6973743a2063616c6c6572206973206e6f742060008201527f77686974656c6973746564000000000000000000000000000000000000000000602082015250565b6000615187602b836148bd565b91506151928261512b565b604082019050919050565b600060208201905081810360008301526151b68161517a565b9050919050565b7f496e76616c69642066726f6d2061646472657373000000000000000000000000600082015250565b60006151f36014836148bd565b91506151fe826151bd565b602082019050919050565b60006020820190508181036000830152615222816151e6565b9050919050565b7f4e6f7420617574686f72697a6564000000000000000000000000000000000000600082015250565b600061525f600e836148bd565b915061526a82615229565b602082019050919050565b6000602082019050818103600083015261528e81615252565b9050919050565b7f446f63756d656e7420646f6573206e6f74206578697374000000000000000000600082015250565b60006152cb6017836148bd565b91506152d682615295565b602082019050919050565b600060208201905081810360008301526152fa816152be565b9050919050565b7f446f63756d656e7420696e646578206973206e6f742076616c69640000000000600082015250565b6000615337601b836148bd565b915061534282615301565b602082019050919050565b600060208201905081810360008301526153668161532a565b9050919050565b60006153788261440c565b91506153838361440c565b925082820190508082111561539b5761539a615051565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fd5b600081546153dd81614bca565b6153e781866148bd565b9450600182166000811461540257600181146154185761544b565b60ff19831686528115156020028601935061544b565b61542185614bfb565b60005b8381101561544357815481890152600182019150602081019050615424565b808801955050505b50505092915050565b6000604082019050818103600083015261546e81856153d0565b905061547d60208301846146a2565b9392505050565b7f4e6f7420616e206f70657261746f7220666f722074686973207061727469746960008201527f6f6e000000000000000000000000000000000000000000000000000000000000602082015250565b60006154e06022836148bd565b91506154eb82615484565b604082019050919050565b6000602082019050818103600083015261550f816154d3565b9050919050565b7f43616e6e6f7420616464207a65726f2061646472657373206173206d616e616760008201527f6572000000000000000000000000000000000000000000000000000000000000602082015250565b60006155726022836148bd565b915061557d82615516565b604082019050919050565b600060208201905081810360008301526155a181615565565b9050919050565b7f4164647265737320697320616c72656164792061206d616e6167657200000000600082015250565b60006155de601c836148bd565b91506155e9826155a8565b602082019050919050565b6000602082019050818103600083015261560d816155d1565b9050919050565b7f4552433134313057686974654c6973743a20696e76616c69642061646472657360008201527f7300000000000000000000000000000000000000000000000000000000000000602082015250565b60006156706021836148bd565b915061567b82615614565b604082019050919050565b6000602082019050818103600083015261569f81615663565b9050919050565b7f4552433134313057686974654c6973743a206164647265737320616c7265616460008201527f792077686974656c697374656400000000000000000000000000000000000000602082015250565b6000615702602d836148bd565b915061570d826156a6565b604082019050919050565b60006020820190508181036000830152615731816156f5565b9050919050565b7f5a65726f2076616c7565206e6f7420616c6c6f77656400000000000000000000600082015250565b600061576e6016836148bd565b915061577982615738565b602082019050919050565b6000602082019050818103600083015261579d81615761565b9050919050565b7f496e76616c696420706172746974696f6e000000000000000000000000000000600082015250565b60006157da6011836148bd565b91506157e5826157a4565b602082019050919050565b60006020820190508181036000830152615809816157cd565b9050919050565b7f496e73756666696369656e742076616c75650000000000000000000000000000600082015250565b60006158466012836148bd565b915061585182615810565b602082019050919050565b6000602082019050818103600083015261587581615839565b9050919050565b7f41646472657373206973206e6f742061206d616e616765720000000000000000600082015250565b60006158b26018836148bd565b91506158bd8261587c565b602082019050919050565b600060208201905081810360008301526158e1816158a5565b9050919050565b7f496e73756666696369656e742062616c616e6365000000000000000000000000600082015250565b600061591e6014836148bd565b9150615929826158e8565b602082019050919050565b6000602082019050818103600083015261594d81615911565b9050919050565b7f30782061646472657373206e6f7420616c6c6f77656400000000000000000000600082015250565b600061598a6016836148bd565b915061599582615954565b602082019050919050565b600060208201905081810360008301526159b98161597d565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60006159fa8261440c565b9150615a058361440c565b925082615a1557615a146159c0565b5b82820490509291505056fea2646970667358221220402333c67401daf0fa70cd25ebd5fc7252252d52b415f5dafed0fd64d2515dd164736f6c63430008120033';
