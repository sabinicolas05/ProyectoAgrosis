import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { useCreatePlaga } from "@/hooks/trazabilidad/plaga/useCreatePlaga";
import { toast } from "react-toastify";
import useFetchPlagaOptions from "@/hooks/trazabilidad/plaga/Map_plaga"; // ✅ IMPORTACIÓN CORRECTA
import useAuth from "@/hooks/auth/useAuth";

const RegisterPlagaModal = ({ onClose }) => {
  useAuth();
  const { mutate: createPlaga, isLoading } = useCreatePlaga();
  const { tiposPlaga } = useFetchPlagaOptions(); // ✅ OBTENER TIPOS DE PLAGA

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    fk_tipo_plaga: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.descripcion || !formData.fk_tipo_plaga) {
      toast.error("Los campos con * son obligatorios.");
      return;
    }

    console.log("📤 Enviando datos al backend:", formData);

    createPlaga(formData, {
      onSuccess: () => {
        toast.success("✅ Plaga registrada correctamente");
        onClose();
      },
      onError: (error) => {
        console.error("❌ Error al registrar plaga:", error);
        toast.error("Error al registrar plaga.");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Registrar Plaga</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre *</label>
          <Input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />

          <label>Descripción *</label>
          <Input
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />

          <label>Tipo de Plaga *</label>
          <select
            name="fk_tipo_plaga"
            value={formData.fk_tipo_plaga}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Seleccione un tipo de plaga</option>
            {tiposPlaga?.map((tipoPlaga) => (
              <option key={tipoPlaga.id} value={tipoPlaga.id}>
                {tipoPlaga.nombre} {/* ✅ Mostrando el nombre del tipo */}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-2 mt-4">
            <Button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {isLoading ? "Registrando..." : "Guardar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPlagaModal;
