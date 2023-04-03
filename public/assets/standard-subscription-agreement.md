{% isNotMainnet:
**THIS AGREEMENT IS FOR TESTING PURPOSES ONLY AND SHOULD BE CONSIDERED NULL
AND VOID**

%}
By establishing the Real Estate Shares Contract with the hash of this Agreement, the
Agreement goes into effect and {{ organizationName }} agrees to the following:

### Definitions:

{% isNotIndividual:
- **"{{ organizationName }}"** means {{ organizationLegalName }}.
%}

- **"Real Estate Shares Contract"** means the smart contract located at
  `{{ contractAddress }}` on {{ chainName }}.

- **"Shares"** means the ERC token managed by the Real Estate Shares Contract

- **"Revenue"** means revenue in accordance with GAAP and excluding commission fees imposed by a distribution platform or platforms including, but not limited to, app stores, game marketplaces, and crowdfunding platforms.

- **"{{ bacName }}"** means the ERC token managed by the smart contract located at
  `{{ bacAddress }}` on {{ chainName }}.

- **"Person"** means any natural person, corporation, limited liability company,
  trust, joint venture, association, company, partnership, Governmental Authority
  or other entity.

- **"Affiliate"** means any Person or entity now or hereafter in control, controlled
  by or in common control with {{ organizationName }}. It shall also include any direct or
  indirect subsidiary of {{ organizationName }} and any company in which {{ organizationName }} has more than a
  ten percent (10%) ownership interest.

- **"Independent Party"** means one or more third Persons that do not collectively
  constitute Affiliates of {{ organizationName }}.

### Terms:

Here is a list of all of the other variables we will use in this contract:


{{ GPEntityName }}  
{{ offeringEntityManager }}
{{ offeringEntityManagerTitle}}  
{{ offeringEntityAddressLine1 }}  
{{ offeringEntityAddressLine2 }}  
{{ offeringEntityAddressLine3 }}  
{{ offeringEntityAddressCity }}, 
{{ offeringEntityAddressStateProvince }} 
{{ offeringEntityAddressPostalCode}}  
{{ offeringEntityEmail }}  
{{ offeringEntityPhone }}
 {{ priceStart }}
 {{ minUnits }} 
 {{ minInvestment }}

-----

{{ purchasingEntityName }}

{{ purchasingEntityJurisdiction }}

{{ purchasingEntitySupLegalText }}

{{ purchasingEntityAddressLine1 }}

{% purchasingEntityAddressLine2:
{{ purchasingEntityAddressLine2 }}
 %}

 {% purchasingEntityAddressLine3:
{{ purchasingEntityAddressLine3 }}
 %}

{{ purchasingEntityAddressCity }}

{% purchasingEntityAddressStateProvince:
{{ purchasingEntityAddressStateProvince }}
 %}

{{ purchasingEntityAddressPostalCode }}

{{ purchasingEntityAddressCountry }}

{{ numUnitsPurchase }} 

{{ purchasePrice }} {{ purchaseCurrency }}

{{ purchaseMethod }} 

{{ purchaserTitle }} 

{{ enteringAgent }} 

{{ dateSigned }} 

{{ signature }} 

{{ purchaserAddress }} 

{{ purchaserEmail }} 

{{ purchaserPhone }} 

{{ taxId }} 

{{ purchaserAge }} 

{{ purchaserPrincipleResidence }} 

{{ purchaserResidenceHistory }} 

{{ purchaserTaxState }} 

{% purchaserAccredited:
 User Is accredited 

{{ purchaserAccreditedType }} 

{{ purchaserAccreditedTypeOther }} 

{{ purchaserNetWorth }} 

{{ purchaserIncome }} 

 %}


{{ purchaserIsWithOfferingCompany }} 

{% purchaserSophisticated:
 User Is sophisticated 

 {{ purchaserExperienceFinancial }}
 %}

{% nonUSPerson:
  I meet the definition of a "Non-U.S. Person" as defined by Rule 902 of Regulation S. and will will also complete and submit the Supplemental Questionnaire for Foreign Investors, alongside the subscription agreement herein.
%}

{{ purchaserExperienceSecurities }} 

{{ purchaserExperienceLLCs }} 

{{ purchaserExperienceOther }} 

{{ purchaserPriorRelationship }} 

{{ workingWithAdvisor }} 

{% advisorRelationship:

{{ advisorRelationship }}

{{ advisorFullName }} 

{{ advisorEmail }} 

{{ advisorPhone }} 

{{ advisor_addressLine1 }} 

{{ advisor_addressLine2 }} 

{{ advisor_addressLine3 }} 

{{ advisor_city }} 

{{ advisor_stateProvince }} 

{{ advisor_country }} 

 
 %}


I, {{ signature }}, certify that I have authority to sign on behalf of and
legally bind {{ organizationName }}.