import { FieldType } from "../types";

export interface DynamicFormField {
  key: string;
  label: string;
  hint?: string;
  type: FieldType;
  options?: { key: string; value: string }[];
  placeholder?: string;
  required?: boolean;
  value?: any;
  validators?: any[];
}
