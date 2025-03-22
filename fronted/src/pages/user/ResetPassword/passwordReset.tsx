import { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { Button, Input } from "@heroui/react";

export function useSendPasswordReset() {
  const [formData, setFormData] = useState({ email: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const mutation = useMutation(async () => {
    const response = await fetch("https://tuapi.com/password-reset/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Error al enviar el correo de recuperación.");
    }

    return response.json();
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Correo de recuperación enviado. Revisa tu bandeja de entrada.");
      },
      onError: () => {
        toast.error("No se pudo enviar el correo. Verifica tu dirección.");
      },
    });
  };

  return { formData, handleChange, handleSubmit, isLoading: mutation.isLoading };
}

export default function PasswordReset({ isOpen, onClose }) {
  const { formData, handleChange, handleSubmit, isLoading } = useSendPasswordReset();
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Restablecer Contraseña</h2>
        <p>Ingresa tu correo electrónico para recibir un enlace de recuperación.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <label htmlFor="email" className="text-gray-700">Correo electrónico</label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ingresa tu correo..."
          />
          <Button type="submit" className="bg-blue-600 text-white" disabled={isLoading}>
            {isLoading ? "Enviando..." : "Enviar enlace de recuperación"}
          </Button>
        </form>
        <Button onClick={onClose} className="mt-4 bg-red-500 text-white">Cerrar</Button>
      </div>
    </div>
  );
}
