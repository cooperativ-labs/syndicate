import { zodResolver } from '@hookform/resolvers/zod';
import { Field, FieldError } from '@src/components/ui/field';
import { Input } from '@src/components/ui/input';
import { cn } from '@src/lib/utils';
import { ChevronRight } from 'lucide-react';
import React, { FC, useEffect } from 'react';
import { Button } from 'react-day-picker';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type AccessCodeFormProps = {
  accessCode: string | undefined | null;
  handleCodeSubmission: (arg0: string) => void;
  mini?: boolean;
  isOfferingManager?: boolean;
};

const formSchema = z.object({
  code: z.string().min(1, 'Please enter your four-digit code.')
});

type FormValues = z.infer<typeof formSchema>;

const AccessCodeForm: FC<AccessCodeFormProps> = ({
  mini,
  accessCode,
  handleCodeSubmission,
  isOfferingManager
}) => {
  const fieldClasses = mini
    ? 'h-6 text-xs w-14 bg-opacity-0 px-2 rounded-md focus:border-blue-900 focus:outline-none'
    : 'text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-300 rounded-l-md focus:border-blue-900 focus:outline-none';
  const buttonClasses = mini
    ? 'text-xs font-medium  rounded-md p-1 px-2 flex justify-center items-center whitespace-nowrap'
    : 'font-semibold rounded-r-full px-5 h-12 flex justify-center items-center ';

  const code = isOfferingManager && accessCode;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: code ? code : ''
    }
  });

  // Reset form when code changes (e.g. if it comes from props)
  useEffect(() => {
    reset({ code: code ? code : '' });
  }, [code, reset]);

  const onSubmit = (values: FormValues) => {
    handleCodeSubmission(values.code);
  };

  return (
    <>
      {isOfferingManager && accessCode ? (
        <button className={buttonClasses} onClick={() => handleCodeSubmission('')}>
          Remove code
        </button>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={cn(
            'flex items-center',
            mini ? 'gap-1 border-2  border-gray-400 rounded-lg' : ' gap-0'
          )}
        >
          <Field>
            <Input
              className={cn(fieldClasses, 'max-w-[60px] placeholder:text-gray-500')}
              type='text'
              placeholder={isOfferingManager ? '1234' : 'e.g. 1234'}
              {...register('code')}
            />
            {errors.code && !mini && (
              <FieldError errors={[{ message: errors.code.message }]} className='absolute mt-1' />
            )}
          </Field>
          <Button
            type='submit'
            disabled={isSubmitting}
            className={cn('hover:cursor-pointer', buttonClasses)}
          >
            {mini ? 'Set access code' : <ChevronRight className='mr-2 text-lg' />}
          </Button>
        </form>
      )}
    </>
  );
};

export default AccessCodeForm;
