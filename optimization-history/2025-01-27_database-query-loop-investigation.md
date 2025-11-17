# Database Query Loop Investigation Report
**Date:** 2025-01-27  
**Issue:** Top-level routes (1/overview, 1/offerings, etc.) are querying the database in a loop

## Summary

Investigation into database query loops on organization routes revealed several potential causes, with the most critical issue being in the `OrganizationsContext` component's `useEffect` hook.

## Root Causes Identified

### 1. **CRITICAL: OrganizationsContext useEffect Dependency Issue**

**Location:** `contexts/OrganizationsContext.tsx:36-42`

**Problem:**
The `useEffect` hook is missing `setOrganizationUserId` in its dependency array, which violates React's exhaustive-deps rule. More critically, this effect runs every time `foundOrganizationId` or `savedOrganizationId` changes, and calls `setOrganizationUserId`, which updates state in the `UserContext`.

```36:42:contexts/OrganizationsContext.tsx
  useEffect(() => {
    const setOrgId = foundOrganizationId ?? savedOrganizationId ?? null;
    if (setOrgId) {
      setChosenOrganizationId(setOrgId);
      setOrganizationUserId(setOrgId);
    }
  }, [foundOrganizationId, savedOrganizationId]);
```

**Impact:**
- If `setOrganizationUserId` is not a stable reference (recreated on each render), this could cause the effect to run repeatedly
- The state update in `UserContext` could trigger re-renders that propagate up the component tree
- While server components shouldn't re-execute on client state changes, if there's any navigation or router refresh happening, this could cause the layout to re-execute

**Fix Required:**
- Add `setOrganizationUserId` to the dependency array (though this should be stable from `useUserContext`)
- Add a guard to prevent unnecessary state updates when the value hasn't actually changed
- Consider using `useCallback` or `useMemo` to stabilize references

### 2. **Root Layout Database Query on Every Render**

**Location:** `app/layout.tsx:51`

**Problem:**
The root layout (server component) calls `getOrgsFromUser()` on every execution:

```51:51:app/layout.tsx
  const organizations = await getOrgsFromUser();
```

**Impact:**
- In Next.js App Router, server components should only re-execute when their props/params change or when explicitly revalidated
- If something is causing the layout to re-execute repeatedly, this query will run in a loop
- The layout also calls `getUserProfile()` which adds another database query

**Potential Triggers:**
- Client component re-renders causing router navigation/refresh
- `revalidatePath` calls with layout-level revalidation
- Cookie changes triggering layout re-execution

### 3. **Duplicate getOrganization Calls**

**Location:** Multiple files

**Problem:**
Both the layout (`app/[organizationId]/layout.tsx:62`) and individual pages (e.g., `app/[organizationId]/overview/page.tsx:7`, `app/[organizationId]/offerings/page.tsx:7`) are calling `getOrganization()`:

```62:62:app/[organizationId]/layout.tsx
  const organization = (await getOrganization(organizationId, '[organizationId]/layout')) || null;
```

```7:7:app/[organizationId]/overview/page.tsx
  const organization = await getOrganization(organizationId, '/overview');
```

**Impact:**
- While not causing a loop by itself, this creates redundant queries
- If pages are re-rendering, each page will query the database again
- The layout query should be sufficient, and pages could receive the organization as a prop

### 4. **Heavy getOrganization Query**

**Location:** `src/utils/actions/organizationActions.ts:82-141`

**Problem:**
The `getOrganization` function performs a complex query with multiple joins:

```100:107:src/utils/actions/organizationActions.ts
      [
        "*",
        "organizationUsers:organization_user(id, user_id, permissions, profile(*))",
        "linkedAccounts:linked_account(*)",
        "emailAddresses:email_address(*)",
        "legalEntities:legal_entity(*, offerings:offering(*, offeringParticipants:offering_participant(*, walletAddress:wallet_address), legalEntity:legal_entity(*)))",
      ].join(", "),
```

**Impact:**
- This is a very expensive query with nested joins
- If running in a loop, it will significantly impact database performance
- The query includes deep nesting that may not be needed on every page

## Recommended Fixes

### Priority 1: Fix OrganizationsContext useEffect

1. **Add missing dependency and guard:**
```typescript
useEffect(() => {
  const setOrgId = foundOrganizationId ?? savedOrganizationId ?? null;
  if (setOrgId && setOrgId !== chosenOrganizationId) {
    setChosenOrganizationId(setOrgId);
    setOrganizationUserId(setOrgId);
  }
}, [foundOrganizationId, savedOrganizationId, setOrganizationUserId, chosenOrganizationId]);
```

2. **Or better yet, use a ref to track previous value:**
```typescript
const prevOrgIdRef = useRef<string | null>(null);

useEffect(() => {
  const setOrgId = foundOrganizationId ?? savedOrganizationId ?? null;
  if (setOrgId && setOrgId !== prevOrgIdRef.current) {
    prevOrgIdRef.current = setOrgId;
    setChosenOrganizationId(setOrgId);
    setOrganizationUserId(setOrgId);
  }
}, [foundOrganizationId, savedOrganizationId, setOrganizationUserId]);
```

### Priority 2: Optimize Root Layout

1. **Consider caching the organizations query** or using React cache:
```typescript
import { cache } from 'react';

const getCachedOrgsFromUser = cache(getOrgsFromUser);
```

2. **Investigate what's causing layout re-execution** - add logging to understand when/why the layout is re-running

### Priority 3: Reduce Duplicate Queries

1. **Pass organization from layout to pages** instead of querying again
2. **Use React Server Components properly** - the layout already fetches the organization, pages should receive it as a prop

### Priority 4: Optimize getOrganization Query

1. **Make the query more selective** - only fetch what's needed for each page
2. **Consider splitting into multiple functions** for different use cases (lightweight vs. full details)

## Testing Recommendations

1. Add console.log statements to track when queries are executed:
   - In `getOrgsFromUser()` 
   - In `getOrganization()`
   - In `OrganizationsContext` useEffect

2. Monitor database query logs to identify the exact pattern of the loop

3. Check browser network tab to see if there are repeated requests

4. Use React DevTools Profiler to identify what's causing re-renders

## Additional Notes

- The `organizationChangeServer` function uses `redirect()`, which should cause a full page navigation, not a loop
- Multiple `revalidatePath` calls exist throughout the codebase, but they should only trigger on specific actions, not continuously
- The root layout is a server component, so client-side state changes shouldn't cause it to re-execute unless there's a navigation event



