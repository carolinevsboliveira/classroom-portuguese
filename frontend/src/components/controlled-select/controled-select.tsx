import { FormControl, MenuItem, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { ControlledSelectProps } from './interface';

const ControlledSelect = ({ name, items, label }: ControlledSelectProps) => {
  const { register, setValue } = useFormContext();
  return (
    <FormControl>
      <TextField
        select
        label={label}
        inputProps={{
          inputRef: (ref: HTMLInputElement) => {
            if (!ref) return;
            register(name, { value: ref.value });
          }
        }}
      >
        {(items ?? []).map((item, index) => (
          <MenuItem
            key={index}
            value={item._id}
            onClick={() => setValue(name, item._id)}
          >
            {item.userName}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
};
export default ControlledSelect;
