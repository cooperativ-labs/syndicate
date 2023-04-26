Admin routes
/ - "admin login" (could eventually be an investor page)

Admin routes
/[orgId]/overview = Org overview Overview
/[orgId]/offerings/[offeringId] = Manage Entity Page - if not logged in, redirect to offering profile
/[orgId]/entities/[entityId] = Manage Entity Page

Public routes
/[orgId]
/[orgId]/[offeringId] = Offering profile page

Investor routes
/[orgId]/portal = investor dashboard for that org
/[orgId]/portal/[offeringId] = Offering dashboard page
/[orgId]/portal/[offeringId]/investor-application = Investor application page

