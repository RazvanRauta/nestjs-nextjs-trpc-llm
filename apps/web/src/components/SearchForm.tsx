'use client';

import { Input, Button } from '@headlessui/react';
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';

export interface IFormInput {
  name: string;
}

export interface SearchFormProps {
  register: UseFormRegister<IFormInput>;
  onSubmit: (data: IFormInput) => void;
  handleSubmit: UseFormHandleSubmit<IFormInput, undefined>;
  errors: FieldErrors<IFormInput>;
  isLoading: boolean;
}

export const SearchForm = ({
  register,
  onSubmit,
  handleSubmit,
  errors,
  isLoading,
}: SearchFormProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-end gap-2 justify-center">
          <Input
            {...register('name', {
              required: true,
              minLength: 3,
            })}
            className="w-96 rounded-lg p-3 border border-gray-300 data-[hover]:shadow data-[focus]:bg-blue-100"
            placeholder="Search profile"
          />
          <Button
            className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[hover]:data-[active]:bg-sky-700"
            type="submit"
            disabled={isLoading}
          >
            Do your magic!
          </Button>
        </div>
      </form>
      {errors.name && <span>This field is required</span>}
    </div>
  );
};
