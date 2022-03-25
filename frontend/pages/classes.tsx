import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { DateTimePickerSelector } from '../src/components';
const Classes = () => {
  const methods = useForm();
  const onSubmit = (data) => console.log(data?.selectedDate['$d']);
  return (
    <div style={{ marginTop: '200px' }}>
      {' '}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <DateTimePickerSelector />
          <button type="submit"> HEREE </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default Classes;
