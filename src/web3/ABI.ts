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
] as const

export default abi;
