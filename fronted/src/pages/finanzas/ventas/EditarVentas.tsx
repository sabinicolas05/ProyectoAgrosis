import { useState, useEffect } from "react";
import { useFetchVentaById } from "@/hooks/finanzas/ventas/useFetchVentasById";
import { useUpdateVenta } from "@/hooks/finanzas/ventas/useUpdateVentas";
import { Button, Input } from "@heroui/react";
import { toast } from "react-toastify";

const EditarVentaModal = ({ id, onClose }: { id: string; onClose: () => void }) => {
  const { data: venta, isLoading } = useFetchVentaById(id);
  const { mutate: updateVenta, isLoading: isUpdating } = useUpdateVenta();

  const [formData, setFormData] = useState({
    fk_produccion: "",
    precio_unitario: "",
    cantidad_produccion: "",
    fecha: "",
  });

  useEffect(() => {
    if (venta && !isLoading) {
      setFormData({
        fk_produccion: venta.fk_produccion.toString() ?? "",
        precio_unitario: venta.precio_unitario.toString() ?? "",
        cantidad_produccion: venta.cantidad_produccion.toString() ?? "",
        fecha: venta.fecha ?? "",
      });
    }
  }, [venta, isLoading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const { fk_produccion, precio_unitario, cantidad_produccion, fecha } = formData;

    if (!fk_produccion || !precio_unitario || !cantidad_produccion || !fecha) {
      toast.error("⚠️ Todos los campos con * son obligatorios.");
      return;
    }

    updateVenta(
      {
        id,
        fk_produccion: parseInt(fk_produccion),
        precio_unitario: parseFloat(precio_unitario),
        cantidad_produccion: parseInt(cantidad_produccion),
        fecha,
      },
      {
        onSuccess: () => {
          toast.success("✅ Venta actualizada correctamente");
          onClose(); // Cierra el modal tras éxito
        },
        onError: (error) => {
          console.error("❌ Error al actualizar venta:", error);
          toast.error("❌ Error al actualizar venta");
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Editar Venta</h2>

        {isLoading ? (
          <p className="text-center text-gray-500">Cargando venta...</p>
        ) : (
          <form onSubmit={handleUpdate}>
            <label>Producción *</label>
            <Input
              type="number"
              name="fk_produccion"
              value={formData.fk_produccion}
              onChange={handleChange}
              required
            />

            <label>Precio Unitario *</label>
            <Input
              type="number"
              name="precio_unitario"
              value={formData.precio_unitario}
              onChange={handleChange}
              required
            />

            <label>Cantidad Producción *</label>
            <Input
              type="number"
              name="cantidad_produccion"
              value={formData.cantidad_produccion}
              onChange={handleChange}
              required
            />

            <label>Fecha *</label>
            <Input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              required
            />

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
                className="bg-blue-500 text-white px-4 py-2 rounded"
                disabled={isUpdating}
              >
                {isUpdating ? "Guardando..." : "Guardar"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditarVentaModal;
