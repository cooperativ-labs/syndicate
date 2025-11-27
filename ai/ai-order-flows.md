## Definitions
isDead: isDisapproved || isCancelled || fullyFilled;

## Flow Types
 - Propose 
    - sale 
    - bid
- Status 
  - txn required
    - awaiting approval
    - someone else is pending
    - approved 
  - swap approval
    - awaiting approval
    - 
- Execute 
    - sale
    - bid

 - Initiate sale
 - Initiate bid
 
## Ask Order Flow
  - txn approvals enabled
    - seller 
      - can propose to offer - initiates the swap
      - can cancel offer - isInitiator && isDead
      - is waiting for listing approval - isAccepted && !isApproved && isDead
    - buyer
      - can propose to buy - !isAccepted && !isApproved && noPendingFiller && isDead
      - is waiting for approval - isAccepted && !isApproved && isDead
      - can execute - isAccepted && isApproved &&  currentUserFiller && isDead
      - can cancelAcceptance - isAccepted && currentUserFiller && isDead
    - both
      - dead swap block

  ### if txn approvals disabled
    - seller
      - can propose to offer - initiates
      - can cancel offer - currentUserInitiator && isDead
      - sale has taken place - find some way to show this
    - buyer
      - can buy - isApproved && isDead
    - both
      - dead swap block
  ### if no approvals 
    - seller
      - can propose to offer - initiates
      - can cancel offer - currentUserInitiator && isDead
      - sale has taken place - find some way to show this
    - buyer
      - can buy - !isCancelled && !fullyFilled
      - sees sale has taken place
    - both
      - isCancelled || fullyFilled

## Bid Order Flow
  ### if txn approvals enabled
    - buyer (as initiator)
      - can propose to buy - initiates the swap
      - can cancel offer - isInitiator && isDead
      - is waiting for listing approval - this is frontend only
      - seller has made offer, awaiting approval - isAccepted && !isApproved && isDead
      - can execute - currentUserInitiator && isAccepted && isApproved && isDead
    - seller (as filler)
      - can propose to sell - !isAccepted && !isApproved && noPendingFiller && isDead
      - is waiting for approval - currentUserFiller && isAccepted && !isApproved && isDead
      - can cancelAcceptance - currentUserFiller && isAccepted && isDead
      - claim proceeds = proceeds > 0 
    - both
      - dead swap block
  ### if txn approvals disabled
    - buyer (as initiator)
      - can propose to buy - initiates
      - can cancel offer - currentUserInitiator && isDead
      - pending approval - !isApproved && isDead
      - awaiting seller - currentUserInitiator && isApproved && isDead
        - disapproved - find some way to show this 
      - can execute - currentUserInitiator && isApproved && isDead
    - seller (as filler)
      - sees offer - isApproved && isDead
      - can accept - isApproved && isDead
      - can cancelAcceptance - currentUserFiller && isAccepted && isDead
      - claim proceeds = proceeds > 0
    - both
      - dead swap block
  - No approvals
    - buyer (as initiator)
      - can propose to buy - initiates
      - can cancel offer - currentUserInitiator && isDead
      - can execute - currentUserInitiator && isAccepted && isDead

