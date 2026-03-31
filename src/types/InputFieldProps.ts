import { Control } from "react-hook-form";

export type InputFieldProps = {
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
  rules?: any;
  isEdit?: boolean;
};