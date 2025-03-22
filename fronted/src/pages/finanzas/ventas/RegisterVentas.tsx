import { useState } from "react";
import { useCreateVenta } from "@/hooks/finanzas/ventas/useCreateVentas";
import { Button, Input } from "@heroui/react";
import { toast } from "react-toastify";

const RegisterVentaModal = ({ onClose }: { onClose: () => void }) => {
  const { mutate: createVenta, isLoading: isCreating } = useCreateVenta();

  const [formData, setFormData] = useState({
    fk_produccion: "",
    precio_unitario: "",
    cantidad_produccion: "",
    fecha: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const { fk_produccion, precio_unitario, cantidad_produccion, fecha } = formData;

    if (!fk_produccion || !precio_unitario || !cantidad_produccion || !fecha) {
      toast.error("⚠️ Todos los campos con * son obligatorios.");
      return;
    }

    createVenta(
      {
        fk_produccion: parseInt(fk_produccion),
        precio_unitario: parseFloat(precio_unitario),
        cantidad_produccion: parseInt(cantidad_produccion),
        fecha,
      },
      {
        onSuccess: () => {
          toast.success("✅ Venta registrada correctamente");
          onClose(); // Cierra el modal tras éxito
        },
        onError: (error) => {
          console.error("❌ Error al registrar venta:", error);
          toast.error("❌ Error al registrar venta");
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Registrar Venta</h2>
        <form onSubmit={handleRegister}>
          <label>Producción *</label>
          <Input type="number" name="fk_produccion" value={formData.fk_produccion} onChange={handleChange} required />

          <label>Precio Unitario *</label>
          <Input type="number" step="0.01" name="precio_unitario" value={formData.precio_unitario} onChange={handleChange} required />

          <label>Cantidad Producción *</label>
          <Input type="number" name="cantidad_produccion" value={formData.cantidad_produccion} onChange={handleChange} required />

          <label>Fecha *</label>
          <Input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />

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

export default RegisterVentaModal;
