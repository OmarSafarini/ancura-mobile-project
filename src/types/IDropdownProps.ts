import { Control } from "react-hook-form";

export type DropdownItem = {
  label: string;
  value: string | number;
};

export type FormDropdownProps = {
  control: Control<any>;
  name: string;
  label: string;
  data: DropdownItem[];
  placeholder: string;
  rules?: any;
  width?: number;
};