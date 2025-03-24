import { useState } from "react";
import { useCreateResiduo } from "@/hooks/finanzas/residuos/useCreateResiduo";
import { Button, Input } from "@heroui/react";
import { toast } from "react-toastify";

const RegisterResiduoModal = ({ onClose }: { onClose: () => void }) => {
  const { mutate: createResiduo, isLoading: isCreating } = useCreateResiduo();

  const [formData, setFormData] = useState({
    cantidad: "",
    tipo_residuo: "",
    fk_cultivo_id: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const { cantidad, tipo_residuo, fk_cultivo_id } = formData;

    if (!cantidad || !tipo_residuo || !fk_cultivo_id) {
      toast.error("⚠️ Todos los campos con * son obligatorios.");
      return;
    }

    createResiduo(
      {
        cantidad: parseInt(cantidad),
        tipo_residuo,
        fk_cultivo_id: parseInt(fk_cultivo_id),
      },
      {
        onSuccess: () => {
          toast.success("✅ Residuo registrado correctamente");
          onClose(); // Cierra el modal tras éxito
        },
        onError: (error) => {
          console.error("❌ Error al registrar residuo:", error);
          toast.error("❌ Error al registrar residuo");
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Registrar Residuo</h2>
        <form onSubmit={handleRegister}>
          <label>Cantidad *</label>
          <Input type="number" name="cantidad" value={formData.cantidad} onChange={handleChange} required />

          <label>Tipo de Residuo *</label>
          <Input type="text" name="tipo_residuo" value={formData.tipo_residuo} onChange={handleChange} required />

          <label>Cultivo *</label>
          <Input type="number" name="fk_cultivo_id" value={formData.fk_cultivo_id} onChange={handleChange} required />

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

export default RegisterResiduoModal;
