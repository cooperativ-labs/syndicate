/**
 * useSharePanelUI Hook
 *
 * Determines which UI elements to show in the ShareManagerPanel based on:
 * - Order state (active vs terminal)
 * - Approval mode (none, listingOnly, txnOnly, both)
 * - User role (manager, initiator, filler)
 *
 * @see ai/ai-sale-manager-interface.md for full documentation
 */

export type SharePanelUIConfig = {
  // Listing layer controls (listingApprovalsRequired)
  showApproveListingButton: boolean;
  showDisapproveListingButton: boolean;
  showListingVisibilityToggle: boolean;
  showAwaitingListingApproval: boolean;

  // Transaction layer controls (txnApprovalsRequired)
  showApproveTxnButton: boolean;
  showDisapproveTxnButton: boolean;
  showRequestStatement: boolean;
  showAwaitingTxnApproval: boolean;

  // Universal controls
  showCancelButton: boolean;
  showArchiveButton: boolean;
  showClaimProceeds: boolean;
};

export type SharePanelUIProps = {
  // Order state from contract
  isApproved: boolean | undefined;
  isDisapproved: boolean | undefined;
  isAccepted: boolean | undefined;
  isCancelled: boolean | undefined;
  isFilled: boolean | undefined;

  // Approval configuration
  listingApprovalsRequired: boolean | undefined;
  txnApprovalsRequired: boolean | undefined;

  // User roles
  isContractOwner: boolean;
  currentUserInitiator: boolean | undefined;
  currentUserFiller: boolean | undefined;

  // Proceeds
  proceeds: number;
};

const DEFAULT_CONFIG: SharePanelUIConfig = {
  showApproveListingButton: false,
  showDisapproveListingButton: false,
  showListingVisibilityToggle: false,
  showAwaitingListingApproval: false,
  showApproveTxnButton: false,
  showDisapproveTxnButton: false,
  showRequestStatement: false,
  showAwaitingTxnApproval: false,
  showCancelButton: false,
  showArchiveButton: false,
  showClaimProceeds: false
};

export function useSharePanelUI(props: SharePanelUIProps): SharePanelUIConfig {
  const {
    isApproved,
    isDisapproved,
    isAccepted,
    isCancelled,
    isFilled,
    listingApprovalsRequired,
    txnApprovalsRequired,
    isContractOwner,
    currentUserInitiator,
    proceeds
  } = props;

  // ═══════════════════════════════════════════════════════════════════════════
  // STEP 1: Derive terminal state
  // ═══════════════════════════════════════════════════════════════════════════
  const isDead = Boolean(isDisapproved || isCancelled || isFilled);

  // ═══════════════════════════════════════════════════════════════════════════
  // STEP 2: Derive listing layer state (listingApprovalsRequired)
  // When listing approvals are required, the listing must be approved before
  // it's visible to buyers
  // ═══════════════════════════════════════════════════════════════════════════
  const listingNeedsApproval = Boolean(listingApprovalsRequired && !isApproved);
  const listingIsApproved = Boolean(!listingApprovalsRequired || isApproved);

  // ═══════════════════════════════════════════════════════════════════════════
  // STEP 3: Derive transaction layer state (txnApprovalsRequired)
  // When txn approvals are required, each individual trade must be approved
  // based on the counterparty
  // ═══════════════════════════════════════════════════════════════════════════
  const txnIsPending = Boolean(txnApprovalsRequired && isAccepted && !isApproved);
  const txnNotStarted = Boolean(txnApprovalsRequired && !isAccepted);

  // ═══════════════════════════════════════════════════════════════════════════
  // STEP 4: Build UI config based on user role and state
  // ═══════════════════════════════════════════════════════════════════════════
  const config: SharePanelUIConfig = { ...DEFAULT_CONFIG };

  // ───────────────────────────────────────────────────────────────────────────
  // TERMINAL STATE: Order is dead (filled, cancelled, or disapproved)
  // ───────────────────────────────────────────────────────────────────────────
  if (isDead) {
    // Manager or initiator can archive completed orders
    if (isContractOwner || currentUserInitiator) {
      config.showArchiveButton = true;
    }

    // Manager can toggle visibility for record-keeping
    if (isContractOwner) {
      config.showListingVisibilityToggle = true;
    }

    // Show claim proceeds if there are unclaimed funds
    if (proceeds > 0) {
      config.showClaimProceeds = true;
    }

    return config;
  }

  // ───────────────────────────────────────────────────────────────────────────
  // ACTIVE STATE - LAYER 1: LISTING APPROVAL (listingApprovalsRequired)
  // ───────────────────────────────────────────────────────────────────────────
  if (listingApprovalsRequired) {
    if (isContractOwner) {
      // Manager sees approve/disapprove listing buttons
      if (listingNeedsApproval) {
        config.showApproveListingButton = true;
      }
      if (!isDisapproved) {
        config.showDisapproveListingButton = true;
      }
    } else if (currentUserInitiator && listingNeedsApproval) {
      // Initiator sees "awaiting listing approval"
      config.showAwaitingListingApproval = true;
    }
  }

  // If listing not approved yet, txn layer is blocked - return early
  if (listingApprovalsRequired && !listingIsApproved) {
    // Initiator can still cancel their order while awaiting approval
    if (currentUserInitiator) {
      config.showCancelButton = true;
    }
    return config;
  }

  // ───────────────────────────────────────────────────────────────────────────
  // ACTIVE STATE - LAYER 2: TRANSACTION APPROVAL (txnApprovalsRequired)
  // ───────────────────────────────────────────────────────────────────────────
  if (txnApprovalsRequired) {
    if (txnIsPending) {
      // Transaction is pending approval
      if (isContractOwner) {
        // Manager sees pending transaction to approve/disapprove
        config.showRequestStatement = true;
        config.showApproveTxnButton = true;
        if (!isDisapproved) {
          config.showDisapproveTxnButton = true;
        }
      } else {
        // Filler/Initiator sees "awaiting approval"
        config.showAwaitingTxnApproval = true;
      }
    } else if (txnNotStarted) {
      // No transaction proposed yet - manager can manage visibility
      if (isContractOwner && !listingApprovalsRequired) {
        // Only show visibility toggle if listing approvals aren't handling it
        config.showListingVisibilityToggle = true;
      }
    }
  }

  // ───────────────────────────────────────────────────────────────────────────
  // NO APPROVALS MODE: Just visibility toggle for manager
  // ───────────────────────────────────────────────────────────────────────────
  if (!txnApprovalsRequired && !listingApprovalsRequired && isContractOwner) {
    config.showListingVisibilityToggle = true;
  }

  // ───────────────────────────────────────────────────────────────────────────
  // INITIATOR CONTROLS: Always available when order is active
  // ───────────────────────────────────────────────────────────────────────────
  if (currentUserInitiator) {
    config.showCancelButton = true;
  }

  return config;
}
