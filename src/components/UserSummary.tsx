import type { UserFormData } from "../schemas/user.schema";
import { FaCheckCircle } from "react-icons/fa";

interface IUserSummaryProps {
  data     : UserFormData;
  onNewUser: () => void;
}

const UserSummary = ({ data, onNewUser }: IUserSummaryProps) => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-20">
      <div className="max-w-4xl w-full mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <header className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <FaCheckCircle className="w-16 h-16 text-green-600" />
            </div>
            <h1 className="text-4xl font-black text-gray-700 mb-2">
              ¡Usuario Registrado Exitosamente!
            </h1>
            <p className="text-gray-600">Aquí está la información registrada</p>
          </header>

          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Nombre completo
                </p>
                <p className="text-lg text-gray-900">{data.name}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500">Email</p>
                <p className="text-lg text-gray-900">{data.email}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500">Edad</p>
                <p className="text-lg text-gray-900">{data.age} años</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500">Teléfono</p>
                <p className="text-lg text-gray-900">{data.phone}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Fecha de nacimiento
                </p>
                <p className="text-lg text-gray-900">{data.birthDate}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Nombre de usuario
                </p>
                <p className="text-lg text-gray-900">{data.username}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-semibold text-gray-500">Dirección</p>
                <p className="text-lg text-gray-900">{data.address}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500">Ciudad</p>
                <p className="text-lg text-gray-900">{data.city}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500">País</p>
                <p className="text-lg text-gray-900">{data.country}</p>
              </div>
              {data.description && (
                <div className="col-span-2">
                  <p className="text-sm font-semibold text-gray-500">
                    Descripción
                  </p>
                  <p className="text-lg text-gray-900">{data.description}</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={onNewUser}
              className="py-3 px-8 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
            >
              Registrar Nuevo Usuario
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserSummary;
