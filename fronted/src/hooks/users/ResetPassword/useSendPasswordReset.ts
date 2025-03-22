import { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

export function useSendPasswordReset() {
  const [formData, setFormData] = useState({ email: "" });

  // Maneja cambios en el input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función para enviar la solicitud al backend
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

  // Maneja el envío del formulario
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
