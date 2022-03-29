import React from 'react';
import { FormControl, InputLabel, NativeSelect } from '@mui/material';
import { Controller } from 'react-hook-form';
import { For } from 'react-extras';
import { ControlledSelectProps } from './interface';

function ControlledSelect({
  label,
  items,
  name,
  control
}: ControlledSelectProps) {
  return (
    <Controller
      name="name"
      control={control}
      render={() => (
        <FormControl>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            {label}
          </InputLabel>

          <NativeSelect
            defaultValue={''}
            inputProps={{
              name: name
            }}
          >
            <For
              of={items ?? []}
              render={(item, index) => (
                <option value={item._id} key={index}>
                  {item.userName}
                </option>
              )}
            />
          </NativeSelect>
        </FormControl>
      )}
    ></Controller>
  );
}

export default ControlledSelect;
