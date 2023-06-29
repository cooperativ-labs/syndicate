// Generated by @wagmi/cli@1.3.0 on 6/28/2023 at 1:01:30 PM

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ShareContract
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const shareContractABI = [
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
    inputs: [{ name: 'operator', internalType: 'address', type: 'address', indexed: true }],
    name: 'AuthorizedOperator',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'partition', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
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
    inputs: [{ name: 'operator', internalType: 'address', type: 'address', indexed: true }],
    name: 'RevokedOperator',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'partition', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
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
    inputs: [{ name: '_operator', internalType: 'address', type: 'address' }],
    name: 'authorizeOperator',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_partition', internalType: 'bytes32', type: 'bytes32' },
      { name: '_operator', internalType: 'address', type: 'address' },
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
    name: 'contractVersion',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
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
    inputs: [{ name: '_operator', internalType: 'address', type: 'address' }],
    name: 'isOperator',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_partition', internalType: 'bytes32', type: 'bytes32' },
      { name: '_operator', internalType: 'address', type: 'address' },
    ],
    name: 'isOperatorForPartition',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'isOwner',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_address', internalType: 'address', type: 'address' }],
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
    name: 'operatorIssueByPartition',
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
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'partitionList',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
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
    inputs: [{ name: '_operator', internalType: 'address', type: 'address' }],
    name: 'revokeOperator',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_partition', internalType: 'bytes32', type: 'bytes32' },
      { name: '_operator', internalType: 'address', type: 'address' },
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
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_partition', internalType: 'bytes32', type: 'bytes32' },
      { name: '_to', internalType: 'address', type: 'address' },
    ],
    name: 'validPartitionForReceiver',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SwapContract
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const swapContractABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_shareToken', internalType: 'contract IERC1410', type: 'address' },
      { name: '_paymentToken', internalType: 'contract IERC20', type: 'address' },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'orderId', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'OrderReset',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address', indexed: true },
      { name: 'ethAmount', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'tokenAmount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'ProceedsWithdrawn',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'UnsafeWithdrawAllProceeds',
    outputs: [{ name: 'success', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'orderId', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'acceptOrder',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'acceptedOrderQty',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'orderId', internalType: 'uint256', type: 'uint256' }],
    name: 'approveOrder',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_address', internalType: 'address', type: 'address' }],
    name: 'banAddress',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'orderId', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'canFillOrder',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'orderId', internalType: 'uint256', type: 'uint256' }],
    name: 'cancelOrder',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'cannotPurchase',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'claimProceeds', outputs: [] },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'contractVersion',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'orderId', internalType: 'uint256', type: 'uint256' },
      { name: 'amt', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'fillOrder',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'partition', internalType: 'bytes32', type: 'bytes32' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'price', internalType: 'uint256', type: 'uint256' },
      { name: 'isAskOrder', internalType: 'bool', type: 'bool' },
      { name: 'isShareIssuance', internalType: 'bool', type: 'bool' },
      { name: 'isErc20Payment', internalType: 'bool', type: 'bool' },
    ],
    name: 'initiateOrder',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'orderId', internalType: 'uint256', type: 'uint256' }],
    name: 'managerResetOrder',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'nextOrderId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'orders',
    outputs: [
      { name: 'initiator', internalType: 'address', type: 'address' },
      { name: 'partition', internalType: 'bytes32', type: 'bytes32' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'price', internalType: 'uint256', type: 'uint256' },
      { name: 'filledAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'filler', internalType: 'address', type: 'address' },
      {
        name: 'orderType',
        internalType: 'struct SwapContract.orderType',
        type: 'tuple',
        components: [
          { name: 'isShareIssuance', internalType: 'bool', type: 'bool' },
          { name: 'isAskOrder', internalType: 'bool', type: 'bool' },
          { name: 'isErc20Payment', internalType: 'bool', type: 'bool' },
        ],
      },
      {
        name: 'status',
        internalType: 'struct SwapContract.status',
        type: 'tuple',
        components: [
          { name: 'isApproved', internalType: 'bool', type: 'bool' },
          { name: 'isCancelled', internalType: 'bool', type: 'bool' },
          { name: 'orderAccepted', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'paymentToken',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'shareToken',
    outputs: [{ name: '', internalType: 'contract IERC1410', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'swapApprovalsEnabled',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'toggleSwapApprovals', outputs: [] },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'toggleTxnApprovals', outputs: [] },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'txnApprovalsEnabled',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'unclaimedProceeds',
    outputs: [
      { name: 'ethProceeds', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenProceeds', internalType: 'uint256', type: 'uint256' },
    ],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DividendContract
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const dividendContractABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_sharesToken', internalType: 'contract IERC1410', type: 'address' },
      { name: '_reclaim_time', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'claimer', internalType: 'address', type: 'address', indexed: true },
      { name: 'dividendIndex', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'isERC20', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'DividendClaimed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'depositor', internalType: 'address', type: 'address', indexed: true },
      { name: 'dividendIndex', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'partition', internalType: 'bytes32', type: 'bytes32', indexed: false },
      { name: 'isERC20', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'DividendDeposited',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'recycler', internalType: 'address', type: 'address', indexed: true },
      { name: 'dividendIndex', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'DividendRecycled',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'balances',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_dividendIndex', internalType: 'uint256', type: 'uint256' }],
    name: 'claimDividend',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'claimedAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'contractVersion',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: '_exDividendDate', internalType: 'uint256', type: 'uint256' },
      { name: '_recordDate', internalType: 'uint256', type: 'uint256' },
      { name: '_payoutDate', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_payoutToken', internalType: 'address', type: 'address' },
      { name: '_partition', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'depositDividend',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'dividends',
    outputs: [
      { name: 'partition', internalType: 'bytes32', type: 'bytes32' },
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'exDividendDate', internalType: 'uint256', type: 'uint256' },
      { name: 'recordDate', internalType: 'uint256', type: 'uint256' },
      { name: 'payoutDate', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'totalSupplyOfShares', internalType: 'uint256', type: 'uint256' },
      { name: 'payoutToken', internalType: 'address', type: 'address' },
      { name: 'isERC20Payout', internalType: 'bool', type: 'bool' },
      { name: 'amountRemaining', internalType: 'uint256', type: 'uint256' },
      { name: 'recycled', internalType: 'bool', type: 'bool' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_address', internalType: 'address', type: 'address' },
      { name: '_dividendIndex', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getClaimableAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_address', internalType: 'address', type: 'address' },
      { name: '_dividendIndex', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'hasClaimedDividend',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_dividendIndex', internalType: 'uint256', type: 'uint256' }],
    name: 'reclaimDividend',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'reclaim_time',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'sharesToken',
    outputs: [{ name: '', internalType: 'contract IERC1410', type: 'address' }],
  },
] as const
