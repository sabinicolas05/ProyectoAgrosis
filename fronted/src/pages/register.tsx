import { Button, Input, Checkbox } from "@heroui/react";
import { toast } from "react-toastify";
import Label from "@/components/Label";
import { useRegister } from "@/hooks/useRegister";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterForm() {
  const { formData, handleChange, handleCheckboxChange, handleSubmit } = useRegister();

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Registro de Usuario</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="username">Nombre de usuario</Label>
            <Input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Nombre de usuario"
            />
          </div>
          <div>
            <Label htmlFor="identificacion">Identificación</Label>
            <Input
              type="number"
              id="identificacion"
              name="identificacion"
              value={formData.identificacion}
              onChange={handleChange}
              placeholder="Número de identificación"
            />
          </div>
          <div>
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo electrónico"
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
              placeholder="Contraseña"
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirmar contraseña"
            />
          </div>
          <div className="flex gap-4">
            <Checkbox
              id="is_staff"
              name="is_staff"
              checked={formData.is_staff}
              onChange={handleCheckboxChange}
            />
            <Label htmlFor="is_staff">Es staff</Label>
          </div>
          <div className="flex gap-4">
            <Checkbox
              id="is_superuser"
              name="is_superuser"
              checked={formData.is_superuser}
              onChange={handleCheckboxChange}
            />
            <Label htmlFor="is_superuser">Es superusuario</Label>
          </div>
          <Button type="submit" className="w-full">
            Registrarse
          </Button>
          <h2>¿Ya tienes cuenta?</h2>
          <a href="/" className="bg-blue-500 text-white px-4 py-2 rounded inline-block">
  Ir a Login
</a>

        </form>
      </div>
    </section>
  );
}
