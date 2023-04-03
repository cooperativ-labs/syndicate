{{ purchaserEntityName }}

{{ purchaserEntityJurisdiction }}

{{ purchaserEntitySupLegalText }}

{{ purchaserEntityAddressLine1 }}

{% purchaserEntityAddressLine2:
{{ purchaserEntityAddressLine2 }}
 %}

 {% purchaserEntityAddressLine3:
{{ purchaserEntityAddressLine3 }}
 %}

{{ purchaserEntityAddressCity }}

{% purchaserEntityAddressStateProvince:
{{ purchaserEntityAddressStateProvince }}
 %}

{{ purchaserEntityAddressPostalCode }}

{{ purchaserEntityAddressCountry }}


Offering entity Phone {{ offeringEntityPhone }}
Offering entity StartPrice {{ priceStart }}
Offering Entity min Units {{ minUnits }} 
Offering Entity {{ minInvestment }}

{{ purchaserAddress }} 

{{ purchaserEmail }} 

{{ purchaserPhone }} 

{{ taxId }} 

{% purchaserAccredited:
 User Is accredited 

{{ purchaserAccreditedType }} 

{{ purchaserAccreditedTypeOther }} 

{{ purchaserNetWorth }} 

{{ purchaserIncome }} 

 %}




{{ purchaserTaxState }} 




**{{ purchaserEntityName }}'s contact information:**  
**Phone number:** {{ purchaserPhone }}  
**Email address:** {{ purchaserEmail }}  
**Mailing address:**  
{{ purchaserEntityAddressLine1 }}  
{% purchaserEntityAddressLine2:
{{ purchaserEntityAddressLine2 }}  
 %}{% purchaserEntityAddressLine3:
{{ purchaserEntityAddressLine3 }}  
 %}{{ purchaserEntityAddressCity }}, {% purchaserEntityAddressStateProvince:
{{ purchaserEntityAddressStateProvince }}
 %}{{ purchaserEntityAddressPostalCode }}  
{{ purchaserEntityAddressCountry }}





The completed application will be sent to {{ GPEntityName }}, the General Partner managing this offering:

c/o {{ offeringEntityManager }} {{ offeringEntityManagerTitle }}  
{{ offeringEntityAddressLine1 }}  
{% offeringEntityAddressLine2:
{{ offeringEntityAddressLine2 }}
%}
{% offeringEntityAddressLine3:
{{ offeringEntityAddressLine3 }}
%}{{ offeringEntityAddressCity }}, {{ offeringEntityAddressStateProvince }} {{ offeringEntityAddressPostalCode }}  
{{ offeringEntityEmail }}  
{{ offeringEntityPhone }}


 GPEntityName: 'NEED GP NAME',
 offeringEntityManager: 'NEED GP ENTITY MANAGER',
  offeringEntityManagerTitle: 'NEED GP MANAGER TITLE',

     offeringEntityAddressLine1: offeringEntity.addresses[0].line1,
      offeringEntityAddressLine2: offeringEntity.addresses[0].line2,
      offeringEntityAddressLine3: offeringEntity.addresses[0].line3,
      offeringEntityAddressCity: offeringEntity.addresses[0].city,
      offeringEntityAddressStateProvince: offeringEntity.addresses[0].stateProvince,
      offeringEntityAddressPostalCode: offeringEntity.addresses[0].postalCode,
      offeringEntityEmail: offeringEntity.emailAddresses[0]?.address,
      offeringEntityPhone: offeringEntity.phone,

        minUnits: 30,
      minInvestment: numberWithCommas((30 * offeringPrice) / 100),