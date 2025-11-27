# Share Manager Panel Interface

## Approval Mode Reference

| listingApprovalsRequired | txnApprovalsRequired | Mode | Description |
|--------------------------|----------------------|------|-------------|
| ❌ | ❌ | `none` | Open market - listings visible, trades execute immediately |
| ✅ | ❌ | `listingOnly` | Manager must approve listing visibility before buyers can see/purchase |
| ❌ | ✅ | `txnOnly` | Listings visible, but each transaction needs manager approval based on buyer |
| ✅ | ✅ | `both` | Manager approves listing visibility AND each individual transaction |

---

## Decision Tree

```
┌─────────────────────────────────────────────────────────────────────┐
│                     ShareManagerPanel Logic                          │
│          (listingApprovals & txnApprovals are INDEPENDENT)           │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                          ┌─────────▼─────────┐
                          │   Is order dead?   │
                          │ (filled/cancelled/ │
                          │    disapproved)    │
                          └─────────┬─────────┘
                                    │
                ┌───────────────────┴───────────────────┐
                │ YES                                   │ NO
                ▼                                       ▼
      ┌─────────────────────┐                 ┌─────────────────────┐
      │   TERMINAL STATE    │                 │    ACTIVE STATE     │
      ├─────────────────────┤                 └──────────┬──────────┘
      │ Manager OR Init:    │                            │
      │  • Archive button   │                            │
      │ Manager:            │              ┌─────────────┴─────────────┐
      │  • Visibility toggle│              │      APPROVAL LAYERS      │
      │ If proceeds > 0:    │              │  (evaluated independently)│
      │  • Claim proceeds   │              └─────────────┬─────────────┘
      └─────────────────────┘                            │
                                    ┌────────────────────┴────────────────────┐
                                    │                                         │
                          ┌─────────▼─────────┐                    ┌──────────▼──────────┐
                          │ LAYER 1: LISTING  │                    │ LAYER 2: TRANSACTION│
                          │ (listingApprovals │                    │ (txnApprovals       │
                          │  Required)        │                    │  Required)          │
                          └─────────┬─────────┘                    └──────────┬──────────┘
                                    │                                         │
               ┌────────────────────┴────────────────────┐    ┌───────────────┴───────────────┐
               │ ENABLED                                 │    │ ENABLED                       │
               ▼                                         │    ▼                               │
    ┌──────────────────────┐                             │    ┌──────────────────────┐        │
    │ Is listing approved? │                             │    │ Is txn accepted?     │        │
    └──────────┬───────────┘                             │    └──────────┬───────────┘        │
               │                                         │               │                    │
    ┌──────────┴──────────┐                    NOT       │    ┌──────────┴──────────┐   NOT   │
    │YES              NO  │                  ENABLED     │    │YES              NO  │ ENABLED │
    ▼                 ▼   │                       │      │    ▼                 ▼   │    │    │
┌────────┐    ┌────────┐  │                       │      │┌────────┐    ┌────────┐  │    │    │
│MANAGER:│    │MANAGER:│  │                       │      ││Pending │    │No trade│  │    │    │
│• Hide  │    │• Approve│ │                       │      ││approval│    │proposed│  │    │    │
│  (disap│    │  listing│ │                       │      │└───┬────┘    └────────┘  │    │    │
│  prove)│    │• Disapp │ │                       │      │    │                     │    │    │
└────────┘    └────────┘  │                       │      │    ▼                     │    │    │
                          │                       │      │┌────────────┐            │    │    │
                          │                       │      ││Is approved?│            │    │    │
                          │                       │      │└─────┬──────┘            │    │    │
                          │                       │      │  YES │ NO                │    │    │
                          │                       │      │      ▼                   │    │    │
                          │                       │      │  ┌────────┐ ┌────────┐   │    │    │
                          │                       │      │  │Execute │ │MANAGER:│   │    │    │
                          │                       │      │  │ready   │ │• Approve│  │    │    │
                          │                       │      │  └────────┘ │  trade │   │    │    │
                          │                       │      │             │• Disapp│   │    │    │
                          │                       │      │             └────────┘   │    │    │
                          │                       │      │                          │    │    │
                          └───────────────────────┴──────┴──────────────────────────┴────┴────┘
```

---

## Two-Gate Flow (when BOTH approvals enabled)

```
[Initiator creates order]
        │
        ▼
┌───────────────────┐
│ GATE 1: LISTING   │ ◄── listingApprovalsRequired
│ Manager approves  │
│ listing visibility│
└─────────┬─────────┘
          │ (listing now visible to buyers)
          ▼
┌───────────────────┐
│ Buyer proposes    │
│ to purchase       │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│ GATE 2: TRADE     │ ◄── txnApprovalsRequired
│ Manager approves  │
│ specific buyer    │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│ Trade executes    │
└───────────────────┘
```

---

## Panel Scenarios by User Role

### As the Manager

**If listingApprovalsRequired is NOT enabled:**
- If the order is not filled or cancelled, show the cancel button
- If the order is filled or cancelled, show the archive button

**If listingApprovalsRequired IS enabled:**
- If the order is not approved, show the "Approve Listing" button
- If the order is approved, show the "Disapprove Listing" button
- If the order is filled or cancelled, show the archive button

**If txnApprovalsRequired IS enabled:**
- If a transaction is pending (isAccepted && !isApproved):
  - Show request statement (who is buying/selling what)
  - Show "Approve Trade" button
  - Show "Disapprove Trade" button
- If no transaction is pending:
  - If listingApprovalsRequired: show Approve/Disapprove Listing buttons
  - If NOT listingApprovalsRequired: show visibility toggle
- If the order is filled or cancelled, show the archive button

---

### As the Sale Initiator

**If listingApprovalsRequired is NOT enabled:**
- If the order is not filled or cancelled, show the cancel button
- If the order is filled or cancelled, show the archive button

**If listingApprovalsRequired IS enabled:**
- If not approved, show "Awaiting listing approval"
- If approved, show cancel button
- If the order is filled or cancelled, show the archive button

**If txnApprovalsRequired IS enabled:**
- If listing not approved (and listingApprovalsRequired), show "Awaiting listing approval"
- If listing approved but no transaction pending, show cancel button
- If transaction pending approval, show "Awaiting transaction approval"

---

### As the Buyer/Investor

**If listingApprovalsRequired is NOT enabled:**
- Show purchase form

**If listingApprovalsRequired IS enabled:**
- Item does not appear until approved (filtered from list)

**If txnApprovalsRequired IS enabled:**
- Show purchase steps (propose → await approval → execute)

---

## Algorithm (Pseudocode)

```typescript
// Step 1: Derive terminal state
const isDead = isDisapproved || isCancelled || isFilled;

// Step 2: Derive listing layer state (listingApprovalsRequired)
const listingNeedsApproval = listingApprovalsRequired && !isApproved;
const listingIsApproved = !listingApprovalsRequired || isApproved;

// Step 3: Derive transaction layer state (txnApprovalsRequired)
const txnIsPending = txnApprovalsRequired && isAccepted && !isApproved;
const txnIsApproved = txnApprovalsRequired && isAccepted && isApproved;

// Step 4: Build UI config based on user role and state
if (isDead) {
  // TERMINAL: Archive, visibility toggle (manager), claim proceeds
} else if (!listingIsApproved) {
  // LISTING GATE BLOCKED: Approve/Disapprove listing (manager), awaiting (initiator)
} else if (txnIsPending) {
  // TXN GATE PENDING: Approve/Disapprove trade (manager), awaiting (filler)
} else {
  // ACTIVE: Cancel (initiator), visibility toggle (manager)
}
```

---

## UI Config Type

```typescript
type SharePanelUIConfig = {
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
```
