import type { FormEvent } from "react";

export interface IUser {
  id   ?: number;
  name  : string;
  email : string;
  age   : number;
}

export interface IFormErrors {
  name ?: string;
  email?: string;
  age  ?: string;
}

export interface IUseFormResult {
  values      : IUser;
  errors      : IFormErrors;
  touched     : Record<string, boolean>;
  isSubmitting: boolean;
  isValid     : boolean;
  handleChange: (field: keyof IUser, value: string | number) => void;
  handleBlur  : (field: keyof IUser) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
  resetForm   : () => void;
}
