import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ClassForm, DateTimePickerSelector } from '../src/components';
const Classes = () => {
  const methods = useForm();
  const onSubmit = (data) => console.log(data?.selectedDate['$d']);
  return <ClassForm />;
};

export default Classes;
