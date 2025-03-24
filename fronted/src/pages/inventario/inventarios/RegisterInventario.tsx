import { useState } from "react";
import { Button, Input } from "@heroui/react";
import useAuth from "@/hooks/useAuth";
import { useCreateInventario } from "@/hooks/inventario/inventarios/useCreateIventarios";
import useFetchInventarioMap from "@/hooks/inventario/inventarios/MapInventario";
import { toast } from "react-toastify";

const RegisterInventarioModal = ({ onClose }) => {
  useAuth();
  const { herramientas, insumos, loading } = useFetchInventarioMap();
  const { mutate: createInventario, isLoading } = useCreateInventario();

  const [formData, setFormData] = useState({
    fk_herramienta: "",
    fk_insumo: "",
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
    if (!formData.fk_herramienta || !formData.fk_insumo) {
      toast.error("Los campos con * son obligatorios.");
      return;
    }
    createInventario(formData, {
      onSuccess: () => {
        toast.success("✅ Inventario registrado correctamente");
        onClose();
      },
      onError: (error) => {
        console.error("❌ Error al registrar inventario:", error);
        toast.error("Error al registrar inventario.");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Registrar Inventario</h2>
        <form onSubmit={handleSubmit}>
          <label>Herramienta *</label>
          <select name="fk_herramienta" value={formData.fk_herramienta} onChange={handleChange} required>
            <option value="">Seleccione una herramienta</option>
            {herramientas?.map((herramienta) => (
              <option key={herramienta.id} value={herramienta.id}>{herramienta.nombre}</option>
            ))}
          </select>

          <label>Insumo *</label>
          <select name="fk_insumo" value={formData.fk_insumo} onChange={handleChange} required>
            <option value="">Seleccione un insumo</option>
            {insumos?.map((insumo) => (
              <option key={insumo.id} value={insumo.id}>{insumo.tipo}</option>
            ))}
          </select>

          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-blue-500 text-white px-4 py-2 rounded">
              {isLoading ? "Registrando..." : "Guardar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterInventarioModal;
