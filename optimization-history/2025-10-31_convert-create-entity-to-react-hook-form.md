# Convert CreateEntity to React Hook Form

## Summary

- Converted `src/components/entity/CreateEntity.tsx` from Formik to react-hook-form with Zod validation
- Replaced Formik-bound form components with shadcn UI components controlled by RHF Controller
- Built custom jurisdiction select with country/state dropdowns using Controller

## Changes Made

### Imports

- Added `'use client'` directive for client component
- Replaced Formik imports with react-hook-form and Zod:
  - `useForm, Controller` from react-hook-form
  - `zodResolver` from @hookform/resolvers/zod
  - `z` from zod
- Replaced old form components:
  - `Input, Select` from form-components → `Input, Label, Textarea, Select` from ui
  - Added `Country, IState, State` from country-state-city for jurisdiction handling
- Added `LegalEntityType` to GraphQL imports

### Form Structure

- Replaced `<Formik>` with `<form>` element
- Removed Formik render props pattern
- Used `useForm` hook with Zod resolver
- Removed Formik `<Field>` components in favor of:
  - `register()` for simple inputs (legalName, entityPurpose)
  - `Controller` for complex components (Select dropdowns)

### Validation

- Created Zod schema for form validation
- Address validation handled manually in `onSubmit` (address component not form-integrated)
- Used `setError()` and `clearErrors()` from RHF for dynamic address validation

### Field Components

1. **Type of entity**: Controller + shadcn Select
2. **Legal name**: register() + shadcn Input
3. **Operating currency**: Controller + shadcn Select
4. **Jurisdiction**: Custom implementation with Controller + shadcn Select for country and conditional state dropdown
5. **Purpose**: register() + shadcn Textarea
6. **Address**: Existing AddressAutoComplete component (unchanged)

### Special Features

- State dropdown updates when country changes via `useEffect` watching `watchedJurCountry`
- Address validation runs in `onSubmit` with manual error display
- Maintained button state management and LoadingButton component
- Kept existing Apollo mutation logic unchanged

## Technical Notes

- Used `country-state-city` to populate and manage jurisdiction dropdowns
- States list managed via local state, updated on country change
- Type safety maintained with proper TypeScript typing
- Follows existing project patterns from CreateOffering migration
- No breaking changes to component props or behavior

## Files Modified

- `src/components/entity/CreateEntity.tsx`

## Related Migrations

- See `2025-10-31_react-hook-form-migration.md` for initial migration work
