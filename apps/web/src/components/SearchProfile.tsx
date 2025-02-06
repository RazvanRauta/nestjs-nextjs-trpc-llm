'use client';

import { trpc } from '@web/utils/trpc';
import { Input } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

interface IFormInput {
  name: string;
}

export const SearchProfile = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const { data, isLoading } = trpc.iceBreaker.getIceBreaker.useQuery(
    { name: searchTerm },
    {
      enabled: Boolean(searchTerm),
      staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    },
  );

  const onSubmit = (data: IFormInput) => {
    setSearchTerm(data.name);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('name', { required: true, minLength: 3 })}
          placeholder="Search profile"
        />
        <button type="submit">Search</button>
      </form>
      {errors.name && <span>This field is required</span>}
      {isLoading && <p>Loading...</p>}
      {data && <pre>{JSON.stringify(data.result, null, 2)}</pre>}
    </div>
  );
};
