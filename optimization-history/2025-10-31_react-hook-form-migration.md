# React Hook Form + Zod Migration (initial pass)

## Summary

- Replaced Formik with react-hook-form and migrated to shadcn UI inputs where feasible.
- Replaced Yup validation with Zod where validation existed.

## Files updated

- `src/components/account/UserSearch.tsx`
  - Formik -> react-hook-form
  - `form-components/Inputs` -> `ui/input`, `ui/button`
- `src/components/offering/OfferingFinder.tsx`
  - Formik -> react-hook-form
  - Custom Button/Input -> `ui/button`, `ui/input`
- `src/components/offering/CreateOffering.tsx`
  - Formik -> react-hook-form with Zod resolver
  - Replaced `EntitySelector` (Formik-bound) with shadcn `Select` + RHF `Controller`
  - `form-components/Inputs` -> `ui/input`; added `ui/label`
- `src/components/offering/actions/ForceTransferForm.tsx`
  - Formik/Yup -> react-hook-form/Zod
  - Replaced `form-components/Inputs`/`Select` with shadcn `Input`/`Select` + RHF `Controller`

## Notes

- Validation now handled by Zod with `@hookform/resolvers/zod`.
- Buttons that require existing loading UX retained (e.g., `LoadingButtonText`) while inputs/selects moved to shadcn components.
- Follow-ups: migrate remaining Formik forms (`AddPropertyInfo`, `PostBidAskForm`, `InvestorApplicationForm`).
- ✅ `CreateEntity` migrated - see `2025-10-31_convert-create-entity-to-react-hook-form.md`
