'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@src/lib/utils';
import { currencyOptionsExcludeCredits, getCurrencyOption } from '@src/utils/enumConverters';
import { currentDate } from '@src/utils/graphQueries/gqlUtils';
import { renderJurisdiction } from '@src/utils/helpersUserAndEntity';
import React, { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { CurrencyCodeType, LegalEntity } from '@/types';

import ClickToEditItem from '../form-components/ClickToEditItem';
import JurisdictionSelect from '../form-components/JurisdictionSelect';
import { EditOrganizationSelectionType } from '../organization/OrganizationSpecifications';
import { Button } from '../ui/button';
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

export type EditEntitySelectionType =
  | 'displayName'
  | 'legalName'
  | 'jurisdiction'
  | 'currency'
  | 'taxId'
  | 'purpose'
  | 'none';

export type ChangeFormProps = {
  displayName: string | null | undefined;
  legalName: string;
  jurCountry: string;
  jurProvince: string | null | undefined;
  operatingCurrencyCode: string;
  taxId: string | null | undefined;
  purpose: string | null | undefined;
};

const createEntityValidationSchema = () =>
  z.object({
    displayName: z.string().optional().catch(undefined),
    legalName: z.string().min(1, 'Please include the legal name of this syndication.'),
    jurCountry: z.string().min(1, 'Please select a country for jurisdiction.'),
    jurProvince: z.string().optional().catch(undefined),
    operatingCurrencyCode: z.string().min(1, 'Please select an operating currency.'),
    taxId: z.string().optional().catch(undefined),
    purpose: z.string().optional().catch(undefined)
  });

type EntityFormProps = {
  itemType: EditEntitySelectionType;
  entity: LegalEntity;
  setEditOn: (editOn: EditEntitySelectionType) => void;
  handleChange: (values: ChangeFormProps) => void;
};

const EntityEditForm: FC<EntityFormProps> = ({ itemType, entity, setEditOn, handleChange }) => {
  const schema = createEntityValidationSchema();
  type EntityFormData = z.infer<typeof schema>;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues
  } = useForm<EntityFormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      displayName: entity.display_name || '',
      legalName: entity.legal_name || '',
      jurCountry: '',
      jurProvince: '',
      operatingCurrencyCode: entity.operating_currency || '',
      taxId: entity.tax_id || '',
      purpose: entity.purpose || ''
    }
  });

  const onSubmit = (values: EntityFormData) => {
    handleChange(values);
    setEditOn('none');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        itemType !== 'purpose' && 'md:grid',
        'flex flex-col grid-cols-5 w-full items-center gap-2 my-4'
      )}
    >
      <div className="w-full md:col-span-3">
        {itemType === 'displayName' && (
          <Controller
            name="displayName"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Display Name</FieldLabel>
                <FieldContent>
                  <Input {...field} value={field.value || ''} placeholder="Enter display name" />
                  {errors.displayName && <FieldError errors={[errors.displayName]} />}
                </FieldContent>
              </Field>
            )}
          />
        )}

        {itemType === 'legalName' && (
          <Controller
            name="legalName"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Legal Name *</FieldLabel>
                <FieldContent>
                  <Input {...field} value={field.value || ''} placeholder="Enter legal name" />
                  {errors.legalName && <FieldError errors={[errors.legalName]} />}
                </FieldContent>
              </Field>
            )}
          />
        )}

        {itemType === 'jurisdiction' && (
          <div className="w-full">
            <JurisdictionSelect values={getValues()} errors={errors} />
          </div>
        )}

        {itemType === 'currency' && (
          <Controller
            name="operatingCurrencyCode"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Currency *</FieldLabel>
                <FieldContent>
                  <Select value={field.value || ''} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencyOptionsExcludeCredits.map((option, i) => (
                        <SelectItem key={i} value={option.value}>
                          {option.symbol}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.operatingCurrencyCode && (
                    <FieldError errors={[errors.operatingCurrencyCode]} />
                  )}
                </FieldContent>
              </Field>
            )}
          />
        )}

        {itemType === 'taxId' && (
          <Controller
            name="taxId"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Tax ID</FieldLabel>
                <FieldContent>
                  <Input {...field} value={field.value || ''} placeholder="Tax ID" />
                  {errors.taxId && <FieldError errors={[errors.taxId]} />}
                </FieldContent>
              </Field>
            )}
          />
        )}

        {itemType === 'purpose' && (
          <Controller
            name="purpose"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Entity Purpose</FieldLabel>
                <FieldContent>
                  <Textarea
                    {...field}
                    value={field.value || ''}
                    placeholder="Describe the entity purpose"
                    className="w-full"
                  />
                  {errors.purpose && <FieldError errors={[errors.purpose]} />}
                </FieldContent>
              </Field>
            )}
          />
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-cLightBlue hover:bg-cLightBlue text-white font-semibold uppercase h-11 rounded w-full"
      >
        Save
      </Button>

      <Button
        type="button"
        disabled={isSubmitting}
        className="border-2 border-cLightBlue hover:bg-cLightBlue text-cLightBlue hover:text-white font-medium uppercase h-11 rounded w-full"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          setEditOn('none');
        }}
      >
        Cancel
      </Button>
    </form>
  );
};

type EntitySpecificationsProps = {
  entity: LegalEntity;
  isManager: boolean | undefined;
  updateLegalEntity: (arg0: {
    variables: {
      currentDate: string;
      entityId: number;
      displayName: string | undefined;
      legalName: string | undefined;
      jurCountry: string | undefined;
      jurProvince?: string | undefined;
      operatingCurrencyCode: CurrencyCodeType | undefined;
      taxId: string | undefined;
      purpose: string | undefined;
    };
  }) => void;
};

const EntitySpecifications: FC<EntitySpecificationsProps> = ({
  entity,
  isManager,
  updateLegalEntity
}) => {
  const [editOn, setEditOn] = useState<
    EditEntitySelectionType | EditOrganizationSelectionType | string
  >('none');
  const {
    id,
    legal_name: legalName,
    display_name: displayName,
    operating_currency: operatingCurrency,
    tax_id: taxId,
    purpose
  } = entity;

  const handleChange = async (values: ChangeFormProps) => {
    const { legalName, displayName, operatingCurrencyCode, taxId, purpose } = values;
    try {
      updateLegalEntity({
        variables: {
          currentDate: currentDate,
          entityId: id,
          displayName: displayName,
          legalName: legalName,
          jurCountry: values.jurCountry,
          jurProvince: values.jurProvince,
          operatingCurrencyCode: operatingCurrencyCode,
          taxId: taxId,
          purpose: purpose
        }
      });
      setEditOn('none');
    } catch (e: any) {
      alert(`Oops. Looks like something went wrong: ${e.message}`);
    }
  };

  return (
    <>
      <ClickToEditItem
        label="Legal name"
        currentValue={legalName}
        form={
          <EntityEditForm
            itemType="legalName"
            entity={entity}
            setEditOn={setEditOn}
            handleChange={handleChange}
          />
        }
        editOn={editOn}
        itemType="legalName"
        isManager={isManager}
        setEditOn={setEditOn}
      />
      <ClickToEditItem
        label="d/b/a"
        currentValue={displayName}
        form={
          <EntityEditForm
            itemType="displayName"
            entity={entity}
            setEditOn={setEditOn}
            handleChange={handleChange}
          />
        }
        editOn={editOn}
        itemType="displayName"
        isManager={isManager}
        setEditOn={setEditOn}
      />
      <ClickToEditItem
        label="Jurisdiction"
        currentValue={entity.jurisdiction_id || 'Not set'}
        form={
          <EntityEditForm
            itemType="jurisdiction"
            entity={entity}
            setEditOn={setEditOn}
            handleChange={handleChange}
          />
        }
        editOn={editOn}
        itemType="jurisdiction"
        isManager={isManager}
        setEditOn={setEditOn}
      />
      <ClickToEditItem
        label="Currency"
        currentValue={getCurrencyOption(operatingCurrency)?.symbol}
        form={
          <EntityEditForm
            itemType="currency"
            entity={entity}
            setEditOn={setEditOn}
            handleChange={handleChange}
          />
        }
        editOn={editOn}
        itemType="currency"
        isManager={isManager}
        setEditOn={setEditOn}
      />
      <ClickToEditItem
        label="Tax ID"
        currentValue={taxId}
        form={
          <EntityEditForm
            itemType="taxId"
            entity={entity}
            setEditOn={setEditOn}
            handleChange={handleChange}
          />
        }
        editOn={editOn}
        itemType="taxId"
        isManager={isManager}
        setEditOn={setEditOn}
      />
      <ClickToEditItem
        label="Entity purpose"
        currentValue={purpose}
        form={
          <EntityEditForm
            itemType="purpose"
            entity={entity}
            setEditOn={setEditOn}
            handleChange={handleChange}
          />
        }
        editOn={editOn}
        itemType="purpose"
        isManager={isManager}
        setEditOn={setEditOn}
      />
    </>
  );
};
export default EntitySpecifications;
