import { TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import { ControlledTextFieldProps } from './interface';

const ControlledTextField = ({
  name,
  label,
  control,
  required,
  type,
  multiline
}: ControlledTextFieldProps) => {
  return (
    <React.Fragment>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            type={type}
            label={label}
            value={value}
            onChange={onChange}
            multiline={multiline}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
        rules={{ required: required }}
      />
    </React.Fragment>
  );
};
export default ControlledTextField;
