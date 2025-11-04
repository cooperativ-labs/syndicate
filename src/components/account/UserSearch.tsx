'use client';

import { cn } from '@src/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import React, { FC, useContext } from 'react';
import { useForm } from 'react-hook-form';

import { ApplicationStoreProps, store } from '@/contexts/store';

import { Input } from '@src/components/ui/input';
import { Button } from '@src/components/ui/button';

type UserSearchProps = {
  fieldClass?: string;
  buttonClass?: string;
  fullWidth?: boolean;
};

const UserSearch: FC<UserSearchProps> = ({ fieldClass, buttonClass, fullWidth }) => {
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch } = applicationStore;
  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = (submission: string) => {
    dispatch({ type: 'SET_SEARCHTEXT', payload: submission });
    if (pathname !== '/') {
      router.push('/');
    }
  };

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState
  } = useForm<{ searchText: string }>({
    defaultValues: { searchText: '' }
  });

  return (
    <form
      onSubmit={rhfHandleSubmit(values => handleSubmit(values.searchText))}
      className={cn(fullWidth && 'w-full', 'flex items-center h-14')}
    >
      <Input
        className={cn(fieldClass ? fieldClass : 'h-10 md:h-14 w-56 md:w-96 border-0')}
        type="text"
        placeholder="  Search by name, email, or username"
        aria-label="Search"
        {...register('searchText')}
      />

      <Button
        type="submit"
        disabled={formState.isSubmitting}
        className={cn(
          buttonClass
            ? buttonClass
            : 'h-10 md:h-14 bg-blue-900 hover:bg-blue-800 text-white text-sm md:text-base font-bold uppercase px-2 md:p-4'
        )}
      >
        Search
      </Button>
    </form>
  );
};

export default UserSearch;
