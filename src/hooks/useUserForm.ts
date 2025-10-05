import { z } from 'zod';
import { useState, type ChangeEvent, type FormEvent } from 'react';

export const useUserForm = <T extends Record<string, string>>(initialValues: T, schema: z.ZodSchema<T>) => {
  const [values      , setValues      ] = useState<T>(initialValues);
  const [errors      , setErrors      ] = useState<Partial<Record<keyof T, string>>>({});
  const [touched     , setTouched     ] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /****************************************************************/
  /********************** VALIDAR LOS CAMPOS **********************/
  /****************************************************************/

  const validateAllFields = (): boolean => {
    try {
      schema.parse(values);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof T, string>> = {};
        
        error.issues.forEach((issue) => {
          const fieldName = issue.path[0] as keyof T;
          if (fieldName) newErrors[fieldName] = issue.message;
        });
        
        setErrors(newErrors);
        return false;
      }
      return false;
    }
  };
    
  /****************************************************************/
  /*********************** EVENTO ONCHANGE ************************/
  /****************************************************************/
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });

    if (touched[name as keyof T]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  /****************************************************************/
  /****************** ENVIAR DATOS DEL FORMULARIO *****************/
  /****************************************************************/
  
  const handleSubmit = (onSubmit: (data: T) => Promise<void> | void) => {
    return async (e: FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      const allTouched: Partial<Record<keyof T, boolean>> = {};
      Object.keys(values).forEach((key) => {
        allTouched[key as keyof T] = true;
      });
      setTouched(allTouched);

      const isValid = validateAllFields();

      if (isValid) {
        try {
          await onSubmit(values);
        } catch (error) {
          console.error('Error al enviar:', error);
        }
      }

      setIsSubmitting(false);
    };
  };

  /****************************************************************/
  /******************** RESETEAR EL FORMULARIO ********************/
  /****************************************************************/

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleSubmit,
    reset,
  };
};