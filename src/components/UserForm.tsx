import { useState } from "react";
import Input from "./Input";
import Textarea from "./Textarea";
import UserSummary from "./UserSummary";
import { useUserForm } from "../hooks/useUserForm";
import { userSchema, type UserFormData } from "../schemas/user.schema";

const UserForm = () => {
  const [submittedData, setSubmittedData] = useState<UserFormData | null>(null);

  const initialValues: UserFormData = {
    name       : "",
    email      : "",
    age        : "",
    phone      : "",
    address    : "",
    city       : "",
    country    : "",
    description: "",
    username   : "",
    password   : "",
    birthDate  : "",
  };

  const form = useUserForm(initialValues, userSchema);

  const onSubmit = async (data: UserFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmittedData(data);
  };

  const handleNewUser = () => {
    setSubmittedData(null);
    form.reset();
  };

  if (submittedData) {
    return <UserSummary data={submittedData} onNewUser={handleNewUser} />;
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-20">
      <div className="max-w-6xl w-full mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-black text-gray-700 mb-2">
              Formulario de Usuario
            </h1>
            <p className="text-gray-600">Ingresa tus datos para registrarte</p>
          </header>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <Input
              id          = "name"
              name        = "name"
              label       = "Nombre completo"
              placeholder = "Ej: Rody Huancas"
              value       = {form.values.name}
              onChange    = {form.handleChange}
              error       = {form.touched.name ? form.errors.name : undefined}
              disabled    = {form.isSubmitting}
              isRequired
            />

            <div className = "grid md:grid-cols-3 gap-5">
              <Input
                id                 = "email"
                name               = "email"
                type               = "email"
                label              = "Correo electrónico"
                placeholder        = "rody@email.com"
                value              = {form.values.email}
                onChange           = {form.handleChange}
                error              = {form.touched.email ? form.errors.email : undefined}
                disabled           = {form.isSubmitting}
                containerClassName = "md:col-span-2"
                isRequired
              />

              <Input
                id          = "age"
                name        = "age"
                type        = "number"
                label       = "Edad"
                placeholder = "Ej: 25"
                value       = {form.values.age}
                onChange    = {form.handleChange}
                error       = {form.touched.age ? form.errors.age : undefined}
                disabled    = {form.isSubmitting}
                isRequired
              />
            </div>

            <div className = "grid md:grid-cols-3 gap-5">
              <Input
                id          = "address"
                name        = "address"
                type        = "text"
                label       = "Dirección"
                placeholder = "Ej: Inca Yupanqui 4741"
                value       = {form.values.address}
                onChange    = {form.handleChange}
                error       = {form.touched.address ? form.errors.address : undefined}
                disabled    = {form.isSubmitting}
                isRequired
              />

              <Input
                id          = "city"
                name        = "city"
                type        = "text"
                label       = "Ciudad"
                placeholder = "Ej: Lima"
                value       = {form.values.city}
                onChange    = {form.handleChange}
                error       = {form.touched.city ? form.errors.city : undefined}
                disabled    = {form.isSubmitting}
                isRequired
              />

              <Input
                id          = "country"
                name        = "country"
                type        = "text"
                label       = "País"
                placeholder = "Ej: Perú"
                value       = {form.values.country}
                onChange    = {form.handleChange}
                error       = {form.touched.country ? form.errors.country : undefined}
                disabled    = {form.isSubmitting}
                isRequired
              />
            </div>
            <div className = "grid md:grid-cols-2 gap-5">
              <Input
                id          = "phone"
                name        = "phone"
                type        = "tel"
                label       = "Teléfono"
                placeholder = "Ej: 999 999 999"
                value       = {form.values.phone}
                onChange    = {form.handleChange}
                error       = {form.touched.phone ? form.errors.phone : undefined}
                disabled    = {form.isSubmitting}
                isRequired
              />

              <Input
                id       = "birthDate"
                name     = "birthDate"
                type     = "date"
                label    = "Fecha de nacimiento"
                value    = {form.values.birthDate}
                onChange = {form.handleChange}
                error    = {
                  form.touched.birthDate ? form.errors.birthDate: undefined
                }
                disabled = {form.isSubmitting}
                isRequired
              />

              <Input
                id          = "username"
                name        = "username"
                type        = "text"
                label       = "Nombre de Usuario"
                placeholder = "Ej: rody_dev"
                value       = {form.values.username}
                onChange    = {form.handleChange}
                error       = {form.touched.username ? form.errors.username : undefined}
                disabled    = {form.isSubmitting}
                isRequired
              />

              <Input
                id          = "password"
                name        = "password"
                type        = "password"
                label       = "Contraseña"
                placeholder = "*****************"
                value       = {form.values.password}
                onChange    = {form.handleChange}
                error       = {form.touched.password ? form.errors.password : undefined}
                disabled    = {form.isSubmitting}
                isRequired
              />
            </div>

            <Textarea
              id          = "description"
              name        = "description"
              label       = "Descripción (Opcional)"
              placeholder = "Cuéntanos sobre ti..."
              value       = {form.values.description}
              onChange    = {form.handleChange}
              error       = {form.touched.description ? form.errors.description : undefined}
              rows        = {4}
            />

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={form.isSubmitting}
                className="flex-1 py-3 px-6 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 transition-all"
              >
                {form.isSubmitting ? "Registrando..." : "Registrar"}
              </button>
              <button
                type="button"
                onClick={form.reset}
                disabled={form.isSubmitting}
                className="px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 hover:bg-gray-50 transition-all"
              >
                Limpiar
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserForm;
