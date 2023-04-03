### Your request to invest in {{ offeringEntityName }}


### Purchase of Interests

Subject to the terms and conditions hereof and the provisions of the Limited Partnership Agreement, the undersigned hereby irrevocably tenders an offer in the amount of {{ purchasePrice }} {{ purchaseCurrency }}, representing the total purchase price of {{ numUnitsPurchase }} Units (at {{ offeringPrice }} per Unit) of the Company.

{% isNonHuman:
{{ purchaserEntityManager }}, {{ purchaserEntityManagerTitle }} of 
%} {{ purchaserEntityName }}, understands:
1. that their admission to the {{ offeringEntityName }} as a Limited Partner is contingent upon the acceptance in writing of my subscription by the {{ offeringEntityName }}.
2. that pending such acceptance, funds will be deposited in a bank account owned by the Company until used for the purposes described in the Memorandum, which shall not occur prior to the Breaking of Impounds, and that the General Partner will hold in trust any other documents I have furnished, including this Subscription Booklet.

Upon acceptance of your Subscription and Membership, the General Partner will send you a receipt from the Company showing the number of Units purchased and executed signature page from the Subscription Agreement to retain for your records.

### Adoption of Limited Partnership Agreement

The undersigned hereby specifically accepts and adopts each and every provision of the Limited Partnership Agreement, and executes this Subscription Agreement as a counterpart signature page to that Limited Partnership Agreement.

## Your purchase request
The undersigned, {% isNonHuman:
{{ purchaserEntityManager }}, {{ purchaserEntityManagerTitle }} of 
%} {{ purchaserEntityName }}, wishes to purchase {{ numUnitsPurchase }} Limited Partnership Interests (Units) of {{ offeringEntityName }}.

{% purchaseMethod:
A {{ purchaseMethod }} is purchasing these units.
%}

**Tax Jurisdiction:** {{ purchaserEntityJurisdiction }}  
**TaxID/SSN:** {{ taxId }}

{% enteringAgent:
Entering agent's name: {{ enteringAgent }} 
%}
Date: {{ dateSigned }} 

Signature: {{ signature }} 

If your purchase is approved, {{ numUnitsPurchase }} Units of {{ offeringEntityName }} will be sent to {{ walletAddress }}.
