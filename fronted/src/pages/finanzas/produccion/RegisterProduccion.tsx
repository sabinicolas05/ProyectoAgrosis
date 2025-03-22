import { useState } from "react";
import { useCreateProduccion } from "@/hooks/finanzas/produccion/useCreateProduccion";
import { Button, Input } from "@heroui/react";
import { toast } from "react-toastify";

const RegisterProduccionModal = ({ onClose }: { onClose: () => void }) => {
  const { mutate: createProduccion, isLoading: isCreating } = useCreateProduccion();

  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    contenido: "",
    unidades: "",
    fk_cultivo_id: "",
    fk_usuario_id: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const { nombre, precio, contenido, unidades, fk_cultivo_id, fk_usuario_id } = formData;

    if (!nombre || !precio || !contenido || !unidades || !fk_cultivo_id || !fk_usuario_id) {
      toast.error("⚠️ Todos los campos con * son obligatorios.");
      return;
    }

    createProduccion(
      {
        nombre,
        precio: parseFloat(precio),
        contenido,
        unidades: parseInt(unidades),
        fk_cultivo_id: parseInt(fk_cultivo_id),
        fk_usuario_id: parseInt(fk_usuario_id),
      },
      {
        onSuccess: () => {
          toast.success("✅ Producción registrada correctamente");
          onClose(); // Cierra el modal al completar la operación
        },
        onError: (error) => {
          console.error("❌ Error al registrar producción:", error);
          toast.error("❌ Error al registrar producción");
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Registrar Producción</h2>
        <form onSubmit={handleRegister}>
          <label>Nombre *</label>
          <Input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

          <label>Precio *</label>
          <Input type="number" name="precio" value={formData.precio} onChange={handleChange} required />

          <label>Contenido *</label>
          <Input type="text" name="contenido" value={formData.contenido} onChange={handleChange} required />

          <label>Unidades *</label>
          <Input type="number" name="unidades" value={formData.unidades} onChange={handleChange} required />

          <label>Cultivo *</label>
          <Input type="number" name="fk_cultivo_id" value={formData.fk_cultivo_id} onChange={handleChange} required />

          <label>Usuario *</label>
          <Input type="number" name="fk_usuario_id" value={formData.fk_usuario_id} onChange={handleChange} required />

          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={isCreating}>
              {isCreating ? "Guardando..." : "Registrar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterProduccionModal;
