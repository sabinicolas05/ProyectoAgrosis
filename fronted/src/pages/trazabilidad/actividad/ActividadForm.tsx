import { useForm } from "react-hook-form";
import { Button, Input, Checkbox } from "@heroui/react";
import { usePostActividad } from "@/hooks/trazabilidad/actividad/usePostActividad";
import DefaultLayout from "@/layouts/default";
import useAuth from "@/hooks/auth/useAuth";


const ActividadForm = () => {
  useAuth()
  const { register, handleSubmit, reset } = useForm();
  const { mutate: saveActividad, isLoading } = usePostActividad();

  const onSubmit = (formData) => {
    formData.estado = formData.estado === "true"; 
    saveActividad(formData, {
      onSuccess: () => {
        reset(); 
      },
    });
  };

  return (
    <DefaultLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
        <h2 className="text-lg font-bold">Registrar Actividad</h2>

        <Input label="ID Usuario" type="number" {...register("fk_usuario", { required: true })} />
        <Input label="ID Bancal" type="number" {...register("fk_bancal", { required: true })} />
        <Input label="Descripción" type="text" {...register("descripcion", { required: true })} />
        <Input label="Fecha de Inicio" type="date" {...register("fecha_inicio", { required: true })} />
        <Input label="Fecha de Fin" type="date" {...register("fecha_fin", { required: true })} />
        <Checkbox label="Estado" {...register("estado")} />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Guardando..." : "Guardar"}
        </Button>
      </form>
    </DefaultLayout>
  );
};

export default ActividadForm;
