import { useState, useEffect } from "react";
import { useCreateCultivo } from "@/hooks/trazabilidad/cultivo/useCreateCultivo";
import useFetchCultivoMap from "@/hooks/trazabilidad/cultivo/CultivoMap";
import { Button, Input } from "@heroui/react";
import { toast } from "react-toastify";
import useAuth from "@/hooks/auth/useAuth";

const RegisterCultivoModal = ({ onClose }) => {
  useAuth();

  const { semilleros, especies, loading: loadingMap } = useFetchCultivoMap();
  const { mutate: createCultivo, isLoading: isCreating } = useCreateCultivo();

  // Log para verificar si los datos están llegando correctamente
  console.log("Semilleros:", semilleros);
  console.log("Especies:", especies);

  const [formData, setFormData] = useState({
    fk_semillero: "",
    fk_especie: "",
    nombre: "",
    descripcion: "",
    cantidad: "",
    fecha_siembra: "",
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

    if (!formData.fk_semillero || !formData.fk_especie || !formData.nombre) {
      toast.error("Los campos con * son obligatorios.");
      return;
    }

    createCultivo(formData, {
      onSuccess: () => {
        toast.success("✅ Cultivo registrado correctamente");
        onClose();
      },
      onError: (error) => {
        console.error("❌ Error al registrar cultivo:", error);
        toast.error("Error al registrar cultivo.");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Registrar Cultivo</h2>
        {loadingMap ? (
          <p className="text-center text-gray-500">Cargando datos...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>Semillero *</label>
            <br />
            <select name="fk_semillero" value={formData.fk_semillero} onChange={handleChange} required>
              <option value="">Seleccione un semillero</option>
              {semilleros && semilleros.length > 0 ? (
                semilleros.map((semillero) => (
                  <option key={semillero.id} value={semillero.id}>
                    {semillero.nombre_semilla}
                  </option>
                ))
              ) : (
                <option disabled>No hay semilleros disponibles</option>
              )}
            </select>
                <br />
            <label>Especie *</label>
            <br />
            <select name="fk_especie" value={formData.fk_especie} onChange={handleChange} required>
              <option value="">Seleccione una especie</option>
              {especies && especies.length > 0 ? (
                especies.map((especie) => (
                <option key={especie.id} value={especie.id}>
                  {especie.nombre}
                </option>
                ))
              ) : (
                <option disabled>No hay especies disponibles</option>
              )}
            </select>
                <br />
            <label>Nombre *</label>
            <br />
            <Input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

            <label>Descripción</label>
            <Input type="text" name="descripcion" value={formData.descripcion} onChange={handleChange} />

            <label>Cantidad *</label>
            <Input type="number" name="cantidad" value={formData.cantidad} onChange={handleChange} required />

            <label>Fecha de Siembra *</label>
            <Input type="date" name="fecha_siembra" value={formData.fecha_siembra} onChange={handleChange} required />

            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isCreating} className="bg-blue-500 text-white px-4 py-2 rounded">
                {isCreating ? "Guardando..." : "Registrar"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegisterCultivoModal;
