// Generated by @wagmi/cli@1.0.0 on 5/20/2023 at 2:18:05 PM

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PrivateOffering
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x18201F3219e818eE419cF3aa193ff269ABAB0df8)
 */
export const privateOfferingABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'account', internalType: 'address', type: 'address', indexed: true }],
    name: 'AddressAddedToWhitelist',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'account', internalType: 'address', type: 'address', indexed: true }],
    name: 'AddressRemovedFromWhitelist',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'tokenHolder', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'AuthorizedOperator',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'partition', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'tokenHolder', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'AuthorizedOperatorByPartition',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_name', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: '_uri', internalType: 'string', type: 'string', indexed: false },
      { name: '_documentHash', internalType: 'bytes32', type: 'bytes32', indexed: false },
    ],
    name: 'DocumentRemoved',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_name', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: '_uri', internalType: 'string', type: 'string', indexed: false },
      { name: '_documentHash', internalType: 'bytes32', type: 'bytes32', indexed: false },
    ],
    name: 'DocumentUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'partition', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'IssuedByPartition',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'manager', internalType: 'address', type: 'address', indexed: true }],
    name: 'ManagerAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'manager', internalType: 'address', type: 'address', indexed: true }],
    name: 'ManagerRemoved',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousOwner', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'partition', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'RedeemedByPartition',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'tokenHolder', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'RevokedOperator',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'partition', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'tokenHolder', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'RevokedOperatorByPartition',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_fromPartition', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: '_from', internalType: 'address', type: 'address', indexed: true },
      { name: '_to', internalType: 'address', type: 'address', indexed: true },
      { name: '_value', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'TransferByPartition',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_partition', internalType: 'bytes32', type: 'bytes32' },
      { name: '_to', internalType: 'address', type: 'address' },
    ],
    name: '_validPartitionForReceiver',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_manager', internalType: 'address', type: 'address' }],
    name: 'addManager',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'addToWhitelist',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_operator', internalType: 'address', type: 'address' },
      { name: 'tokenHolder', internalType: 'address', type: 'address' },
    ],
    name: 'authorizeOperator',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_partition', internalType: 'bytes32', type: 'bytes32' },
      { name: '_operator', internalType: 'address', type: 'address' },
      { name: 'tokenHolder', internalType: 'address', type: 'address' },
    ],
    name: 'authorizeOperatorByPartition',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_tokenHolder', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'partition', internalType: 'bytes32', type: 'bytes32' },
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_blockNumber', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOfAt',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_partition', internalType: 'bytes32', type: 'bytes32' },
      { name: '_tokenHolder', internalType: 'address', type: 'address' },
    ],
    name: 'balanceOfByPartition',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_from', internalType: 'address', type: 'address' },
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_partition', internalType: 'bytes32', type: 'bytes32' },
      { name: '_value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'canTransferByPartition',
    outputs: [
      { name: '', internalType: 'bytes1', type: 'bytes1' },
      { name: '', internalType: 'bytes32', type: 'bytes32' },
      { name: '', internalType: 'bytes32', type: 'bytes32' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getAllDocuments',
    outputs: [{ name: '', internalType: 'bytes32[]', type: 'bytes32[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_name', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getDocument',
    outputs: [
      { name: '', internalType: 'string', type: 'string' },
      { name: '', internalType: 'bytes32', type: 'bytes32' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_manager', internalType: 'address', type: 'address' }],
    name: 'isManager',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_operator', internalType: 'address', type: 'address' },
      { name: '_tokenHolder', internalType: 'address', type: 'address' },
    ],
    name: 'isOperator',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_partition', internalType: 'bytes32', type: 'bytes32' },
      { name: '_operator', internalType: 'address', type: 'address' },
      { name: '_tokenHolder', internalType: 'address', type: 'address' },
    ],
    name: 'isOperatorForPartition',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'isOwner',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'isWhitelisted',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_partition', internalType: 'bytes32', type: 'bytes32' },
      { name: '_tokenHolder', internalType: 'address', type: 'address' },
      { name: '_value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'issueByPartition',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_partition', internalType: 'bytes32', type: 'bytes32' },
      { name: '_tokenHolder', internalType: 'address', type: 'address' },
      { name: '_value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'operatorRedeemByPartition',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_partition', internalType: 'bytes32', type: 'bytes32' },
      { name: '_from', internalType: 'address', type: 'address' },
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'operatorTransferByPartition',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_tokenHolder', internalType: 'address', type: 'address' }],
    name: 'partitionsOf',
    outputs: [{ name: '', internalType: 'bytes32[]', type: 'bytes32[]' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_partition', internalType: 'bytes32', type: 'bytes32' },
      { name: '_value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'redeemByPartition',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_name', internalType: 'bytes32', type: 'bytes32' }],
    name: 'removeDocument',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'removeFromWhitelist',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_manager', internalType: 'address', type: 'address' }],
    name: 'removeManager',
    outputs: [],
  },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'renounceOwnership', outputs: [] },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_operator', internalType: 'address', type: 'address' },
      { name: 'tokenHolder', internalType: 'address', type: 'address' },
    ],
    name: 'revokeOperator',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_partition', internalType: 'bytes32', type: 'bytes32' },
      { name: '_operator', internalType: 'address', type: 'address' },
      { name: 'tokenHolder', internalType: 'address', type: 'address' },
    ],
    name: 'revokeOperatorByPartition',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_name', internalType: 'bytes32', type: 'bytes32' },
      { name: '_uri', internalType: 'string', type: 'string' },
      { name: '_documentHash', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'setDocument',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'partition', internalType: 'bytes32', type: 'bytes32' },
      { name: '_blockNumber', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'totalSupplyAt',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_partition', internalType: 'bytes32', type: 'bytes32' }],
    name: 'totalSupplyByPartition',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
] as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x18201F3219e818eE419cF3aa193ff269ABAB0df8)
 */
export const privateOfferingAddress = {
  11155111: '0x18201F3219e818eE419cF3aa193ff269ABAB0df8',
} as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x18201F3219e818eE419cF3aa193ff269ABAB0df8)
 */
export const privateOfferingConfig = { address: privateOfferingAddress, abi: privateOfferingABI } as const
