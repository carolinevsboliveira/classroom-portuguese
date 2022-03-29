import { Control, FieldValues } from 'react-hook-form';

export interface ControlledSelectProps {
  label: string;
  items?: Array<any>;
  control: Control<FieldValues, any>;
  name: string;
}
