import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { toast } from "react-toastify";
import Label from "@/components/Label";
import { useLogin } from "@/hooks/useFetchLogin";
import "react-toastify/dist/ReactToastify.css";

import LogoAgrosis from "@/assets/def_AGROSIS_LOGOTIC.png";
import SenaLogo from "@/assets/logo sena.png";

import  NotificationModal from "@/pages/NotificacionModal";


export default function LoginForm() {
  const { formData, handleChange, handleSubmit } = useLogin();
  const [modalNotificacionAbierto, setModalNotificacionAbierto] = useState(false);
  const [modalRecuperacionAbierto, setModalRecuperacionAbierto] = useState(false);

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      {/* Logo SENA en la esquina superior izquierda */}
      <img src={SenaLogo} alt="Logo SENA" className="absolute top-4 left-4 w-20" />

      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg flex overflow-hidden">
        {/* Sección Izquierda - Formulario */}
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-2xl font-bold mb-4">AGROSIS</h1>
          <p className="mb-4">¡Bienvenido de vuelta!</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="username">Nombre de Usuario</Label>
              <Input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Usuario.."
              />
            </div>
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
              />
            </div>
            <div className="text-sm text-gray-500">
              <button
                type="button"
                onClick={() => setModalRecuperacionAbierto(true)}
                className="text-blue-600 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </button>
              <br />
              ¿No tienes una cuenta?
              <a href="/register" className="hover:underline"> Regístrate aquí</a>
            </div>
            <Button type="submit" className="w-full bg-green-600 text-white">Iniciar</Button>
          </form>

          {/* Botón para activar la notificación */}
          <Button onClick={() => setModalNotificacionAbierto(true)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Como usar el login
          </Button>
        </div>

        {/* Sección Derecha - Imagen y mensaje */}
        <div className="w-1/2 bg-gray-200 flex flex-col items-center justify-center p-8">
          <p className="text-center text-lg font-semibold mb-4">¡Recuerda también descargar la App Móvil!</p>
          <img src={LogoAgrosis} alt="Logo Agrosis" className="w-40" />
        </div>
      </div>

      {/* Modal de Notificación */}
      <NotificationModal
        isOpen={modalNotificacionAbierto}
        onClose={() => setModalNotificacionAbierto(false)}
        message={"Como usar el login:\n 1) Crear un Superuser en el CMD del proyecto Django:\npython manage.py createsuperuser\n\n 2) Iniciar sesión en este login con tu superuser (Username y Password)\n\n 3) Ingresa y registra un nuevo usuario en el apartado de usuarios llenando el respectivo formulario\n\n 4) Listo, ya puedes iniciar sesión e ingresar a la aplicación con cualquier usuario"}
      />

      {/* Modal de Recuperación de Contraseña */}
      <PasswordResetModal
        isOpen={modalRecuperacionAbierto}
        onClose={() => setModalRecuperacionAbierto(false)}
      />
    </section>
  );
}
