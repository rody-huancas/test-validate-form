import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es obligatorio")
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(50, "El nombre no debe exceder 50 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El nombre solo puede contener letras"),

  email: z
    .string()
    .min(1, "El email es obligatorio")
    .email("Ingresa un email válido")
    .toLowerCase(),

  age: z
    .string()
    .min(1, "La edad es obligatoria")
    .refine((val) => !isNaN(Number(val)), "Debe ser un número")
    .refine((val) => Number(val) >= 18, "Debes ser mayor de 18 años")
    .refine((val) => Number(val) <= 120, "Ingresa una edad válida"),

  phone: z
    .string()
    .min(1, "El teléfono es obligatorio")
    .min(9, "El teléfono debe tener al menos 9 dígitos")
    .max(15, "El teléfono no debe exceder 15 dígitos")
    .regex(/^[0-9+\s-]+$/, "Solo se permiten números, +, espacios y guiones"),

  address: z
    .string()
    .min(1, "La dirección es obligatoria")
    .min(10, "La dirección debe tener al menos 10 caracteres")
    .max(100, "La dirección no debe exceder 100 caracteres"),

  city: z
    .string()
    .min(1, "La ciudad es obligatoria")
    .min(3, "La ciudad debe tener al menos 3 caracteres")
    .max(50, "La ciudad no debe exceder 50 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "La ciudad solo puede contener letras"),

  country: z
    .string()
    .min(1, "El país es obligatorio")
    .min(3, "El país debe tener al menos 3 caracteres")
    .max(50, "El país no debe exceder 50 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El país solo puede contener letras"),

  description: z
    .string()
    .max(500, "La descripción no debe exceder 500 caracteres")
    .optional()
    .or(z.literal("")),

  username: z
    .string()
    .min(1, "El nombre de usuario es obligatorio")
    .min(4, "El nombre de usuario debe tener al menos 4 caracteres")
    .max(20, "El nombre de usuario no debe exceder 20 caracteres")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Solo se permiten letras, números y guiones bajos"
    )
    .toLowerCase(),

  password: z
    .string()
    .min(1, "La contraseña es obligatoria")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(50, "La contraseña no debe exceder 50 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
    .regex(/[a-z]/, "Debe contener al menos una minúscula")
    .regex(/[0-9]/, "Debe contener al menos un número")
    .regex(/[^A-Za-z0-9]/, "Debe contener al menos un carácter especial"),

  birthDate: z
    .string()
    .min(1, "La fecha de nacimiento es obligatoria")
    .refine((val) => {
      const date = new Date(val);
      
      return !isNaN(date.getTime());
    }, "Fecha inválida")
    .refine((val) => {
      const birthDate = new Date(val);
      const today     = new Date();
      const age       = today.getFullYear() - birthDate.getFullYear();

      return age >= 18;
    }, "Debes ser mayor de 18 años")
    .refine((val) => {
      const birthDate = new Date(val);
      const today     = new Date();

      return birthDate <= today;
    }, "La fecha no puede ser futura"),
});

export type UserFormData = z.infer<typeof userSchema>;
