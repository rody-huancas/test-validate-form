# Form Validation System

Sistema completo de validación de formularios construido con React, TypeScript y Zod. Implementa validaciones en tiempo real, manejo de errores por campo y componentes reutilizables con un custom hook genérico para gestión de formularios.

## Características

- Validación en tiempo real con feedback inmediato al usuario
- 11 campos de formulario con reglas de validación específicas
- Componentes Input y Textarea completamente reutilizables
- Custom hook genérico `useUserForm` para cualquier formulario
- Manejo de estados: valores, errores, campos tocados y estado de envío
- Vista de resumen de datos enviados
- Diseño responsivo con Tailwind CSS
- Tipado estricto con TypeScript
- Integración con Zod para esquemas de validación

## Stack Tecnológico

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| React | 19.1.1 | Biblioteca principal de UI |
| TypeScript | 5.9.3 | Tipado estático |
| Zod | 4.1.11 | Validación de esquemas |
| Tailwind CSS | 4.1.14 | Framework de estilos |
| Vite | 7.1.7 | Build tool y dev server |
| React Icons | 5.5.0 | Iconos |
| clsx | 2.1.1 | Utilidad para clases condicionales |
| tailwind-merge | 3.3.1 | Merge inteligente de clases Tailwind |

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/rody-huancas/test-validate-form.git

# Navegar al directorio
cd test-validate-form

# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev
```

## Estructura del Proyecto

```
src/
├── components/
│   ├── Input.tsx          # Componente input reutilizable con validación
│   ├── Textarea.tsx       # Componente textarea reutilizable con validación
│   ├── UserForm.tsx       # Formulario principal de registro
│   └── UserSummary.tsx    # Vista de resumen de datos enviados
├── hooks/
│   └── useUserForm.ts     # Custom hook genérico para formularios
├── schemas/
│   └── user.schema.ts     # Esquema de validación con Zod
├── interfaces/
│   └── index.ts           # Definiciones de tipos TypeScript
├── utils/
│   └── functios.util.ts   # Función cn() para merge de clases
├── styles/
│   └── index.css          # Estilos globales y configuración Tailwind
├── App.tsx                # Componente raíz
└── main.tsx               # Punto de entrada de la aplicación
```

## Componentes Principales

### Input.tsx

Componente reutilizable para campos de entrada con soporte para validación y estados visuales.

**Props:**
- `label`: Etiqueta del campo
- `error`: Mensaje de error a mostrar
- `success`: Mensaje de éxito a mostrar
- `helperText`: Texto de ayuda
- `isRequired`: Indica si el campo es obligatorio
- `containerClassName`, `labelClassName`, `inputClassName`: Clases personalizadas

**Ejemplo de uso:**

```tsx
<Input
  id="email"
  name="email"
  type="email"
  label="Correo electrónico"
  placeholder="rody@email.com"
  value={form.values.email}
  onChange={form.handleChange}
  error={form.touched.email ? form.errors.email : undefined}
  isRequired
/>
```

### Textarea.tsx

Componente similar a Input pero para áreas de texto multilínea.

**Ejemplo de uso:**

```tsx
<Textarea
  id="description"
  name="description"
  label="Descripción (Opcional)"
  placeholder="Cuéntanos sobre ti..."
  value={form.values.description}
  onChange={form.handleChange}
  error={form.touched.description ? form.errors.description : undefined}
  rows={4}
/>
```

### UserForm.tsx

Formulario principal que integra todos los campos de registro. Maneja el estado del formulario usando el custom hook `useUserForm` y muestra `UserSummary` después del envío exitoso.

### UserSummary.tsx

Componente que muestra un resumen de los datos enviados con opción para registrar un nuevo usuario.

## Custom Hook: useUserForm

Hook genérico y reutilizable para manejar cualquier formulario con validación Zod.

**Parámetros:**
- `initialValues`: Objeto con valores iniciales del formulario
- `schema`: Esquema de validación Zod

**Retorna:**

```typescript
{
  values: T                    // Valores actuales del formulario
  errors: Partial<Record<keyof T, string>>  // Errores de validación
  touched: Partial<Record<keyof T, boolean>> // Campos que el usuario ha tocado
  isSubmitting: boolean        // Estado de envío
  handleChange: Function       // Manejador de cambios en campos
  handleSubmit: Function       // Manejador de envío del formulario
  reset: Function              // Función para resetear el formulario
}
```

**Ejemplo de uso:**

```typescript
const initialValues: UserFormData = {
  name: "",
  email: "",
  age: "",
  // ... más campos
};

const form = useUserForm(initialValues, userSchema);

const onSubmit = async (data: UserFormData) => {
  // Lógica de envío
  await sendToAPI(data);
};

// En el JSX
<form onSubmit={form.handleSubmit(onSubmit)}>
  {/* campos del formulario */}
</form>
```

## Validaciones

El esquema de validación en `user.schema.ts` define las siguientes reglas:

| Campo | Validaciones |
|-------|-------------|
| **name** | Obligatorio, 3-50 caracteres, solo letras y espacios |
| **email** | Obligatorio, formato email válido, convertido a minúsculas |
| **age** | Obligatorio, número entre 18-120 |
| **phone** | Obligatorio, 9-15 dígitos, permite +, espacios y guiones |
| **address** | Obligatorio, 10-100 caracteres |
| **city** | Obligatorio, 3-50 caracteres, solo letras |
| **country** | Obligatorio, 3-50 caracteres, solo letras |
| **username** | Obligatorio, 4-20 caracteres, alfanumérico y guión bajo, minúsculas |
| **password** | Obligatorio, 8-50 caracteres, debe incluir mayúscula, minúscula, número y carácter especial |
| **birthDate** | Obligatorio, fecha válida, mayor de 18 años, no puede ser futura |
| **description** | Opcional, máximo 500 caracteres |

**Ejemplo de validación con Zod:**

```typescript
name: z.string()
  .min(1, "El nombre es obligatorio")
  .min(3, "El nombre debe tener al menos 3 caracteres")
  .max(50, "El nombre no debe exceder 50 caracteres")
  .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El nombre solo puede contener letras")

password: z.string()
  .min(1, "La contraseña es obligatoria")
  .min(8, "La contraseña debe tener al menos 8 caracteres")
  .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
  .regex(/[a-z]/, "Debe contener al menos una minúscula")
  .regex(/[0-9]/, "Debe contener al menos un número")
  .regex(/[^A-Za-z0-9]/, "Debe contener al menos un carácter especial")
```

## Scripts Disponibles

```bash
# Iniciar servidor de desarrollo
pnpm dev

# Compilar TypeScript y construir para producción
pnpm build

# Ejecutar linter para análisis de código
pnpm lint

# Previsualizar build de producción
pnpm preview
```

## Autor

**Rody Huancas**

- GitHub: [@rody-huancas](https://github.com/rody-huancas)
- Repositorio: [test-validate-form](https://github.com/rody-huancas/test-validate-form)
