import { Control, FieldValues } from 'react-hook-form';

export interface ControlledTextFieldProps {
  name: string;
  label: string;
  control: Control<FieldValues, any>;
  required?: string;
  type: string;
  multiline?: boolean;
}
