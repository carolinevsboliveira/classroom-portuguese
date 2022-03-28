import React, { useEffect, useState } from 'react';
import { LocalizationProvider, DateTimePicker } from '@mui/lab';
import TextField from '@mui/material/TextField';
import DateAdapter from '@mui/lab/AdapterDayjs';
import { useFormContext } from 'react-hook-form';

export default function DateTimePickerSelector() {
  const [date, setDate] = useState<any>(null);
  //type MaterialUiPickersDate
  const { register, getValues, setValue } = useFormContext();

  useEffect(() => {
    register('selectedDate');
  }, [register]);
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <DateTimePicker
        label="Selecione uma data"
        value={date}
        onChange={(date) => {
          setDate(date);
          setValue('selectedDate', date, {
            shouldValidate: true,
            shouldDirty: true
          });
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
