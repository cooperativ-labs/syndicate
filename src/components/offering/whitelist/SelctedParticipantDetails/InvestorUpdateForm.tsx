import JurisdictionSelect from '@src/components/form-components/JurisdictionSelect';
import { Button } from '@src/components/ui/button';
import { Field, FieldError, FieldGroup, FieldSet } from '@src/components/ui/field';
import { Input } from '@src/components/ui/input';
import { updateOfferingParticipant } from '@src/utils/actions/offeringActions';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { EnrichedOfferingParticipant } from '@/types';

const ParticipantFormSchema = z.object({
  name: z.string().nullable().optional(),
  jurCountry: z.string().min(1, 'Please select a country'),
  jurProvince: z.string().optional().default(''),
  externalId: z.string().optional()
});
type ParticipantFormValues = z.infer<typeof ParticipantFormSchema>;

export default function UpdateInvestorForm({
  itemType,
  participant,
  setSpecEditOn
}: {
  itemType: 'name' | 'jurisdiction' | 'externalId';
  participant: EnrichedOfferingParticipant;
  setSpecEditOn: (editOn: 'name' | 'jurisdiction' | 'externalId' | 'none') => void;
}) {
  const jurisdiction = participant?.jurisdiction;
  const participantExternalId = participant?.external_id;
  const participantName = participant?.name;
  const participantId = participant?.id;

  const defaultValues = useMemo(
    () => ({
      name: participantName ?? '',
      jurCountry: jurisdiction?.country ?? '',
      jurProvince: jurisdiction?.province ?? '',
      externalId: participantExternalId ?? ''
    }),
    [participantName, jurisdiction?.country, jurisdiction?.province, participantExternalId]
  );

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isSubmitting, errors }
  } = useForm<ParticipantFormValues>({
    defaultValues
  });

  const onSubmit = handleSubmit(async values => {
    await updateOfferingParticipant({
      id: participant?.id,
      name: values.name,
      jurisdictionId: participant?.jurisdiction?.id,
      jurCountry: values.jurCountry,
      jurProvince: values.jurProvince,
      externalId: values.externalId,
      revalidationPath: {
        path: '[organizationId]/offering/[offeringId]',
        type: 'page'
      }
    });
    setSpecEditOn('none');
  });

  return (
    <form className='flex w-full'>
      <FieldGroup>
        <FieldSet className='flex flex-row items-center gap-2'>
          {itemType === 'name' && (
            <Field>
              <Input className='bg-opacity-0' aria-label='participant name' {...register('name')} />
            </Field>
          )}
          {itemType === 'jurisdiction' && (
            <Field>
              <JurisdictionSelect
                values={{ jurCountry: watch('jurCountry'), jurProvince: watch('jurProvince') }}
                errors={errors}
                setValue={setValue}
              />
            </Field>
          )}
          {itemType === 'externalId' && (
            <Field>
              <Input
                className='bg-opacity-0'
                aria-label='participant external id'
                {...register('externalId')}
              />
            </Field>
          )}

          <Button onClick={onSubmit} disabled={isSubmitting} variant='default'>
            Save
          </Button>
          <Button
            type='button'
            variant='secondary'
            onClick={() => {
              setSpecEditOn('none');
              reset(defaultValues);
            }}
          >
            Cancel
          </Button>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}
