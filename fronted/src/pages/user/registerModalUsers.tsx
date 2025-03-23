import { useState } from "react";
import { Button, Checkbox, Input } from "@heroui/react";
import { toast } from "react-toastify";
import { useCreateUsuario } from "@/hooks/users/useCreateUsuario"; // Importa el hook
import useAuth from "@/hooks/auth/useAuth"

const RegisterUserModal = ({ onClose }) => {
  useAuth()
  const { mutate: createUsuario, isLoading } = useCreateUsuario();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    identificacion: "",
    password: "",
    confirmPassword: "",
    is_staff: false,
    is_active: true, // Por defecto activo
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    const newUser = { ...formData };
    delete newUser.confirmPassword; // No enviar confirmPassword al backend

    createUsuario(newUser, {
      onSuccess: () => {
        toast.success("Usuario creado correctamente");
        onClose(); // Cierra el modal
      },
      onError: (error) => {
        console.error("❌ Error al crear usuario:", error);
        toast.error("Error al crear usuario.");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Registrar Usuario</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Usuario</label>
          <Input name="username" value={formData.username} onChange={handleChange} required />

          <label htmlFor="email">Email</label>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label htmlFor="identificacion">Identificación</label>
          <Input name="identificacion" value={formData.identificacion} onChange={handleChange} required />

          <label htmlFor="password">Contraseña</label>
          <Input type="password" name="password" value={formData.password} onChange={handleChange} required />

          <label htmlFor="confirmPassword">Confirmar contraseña</label>
          <Input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />

          <div className="flex gap-2">
            <Checkbox name="is_staff" checked={formData.is_staff} onChange={handleChange} />
            <label htmlFor="is_staff">Staff</label>
          </div>
          <div className="flex gap-2">
            <Checkbox name="is_active" checked={formData.is_active} onChange={handleChange} />
            <label htmlFor="is_active">Activo</label>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" onClick={onClose}>Cancelar</Button>
            <Button type="submit" disabled={isLoading}>{isLoading ? "Registrando..." : "Registrar"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterUserModal;
