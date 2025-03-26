import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";

interface Plaga {
  id?: string;
  fk_tipo_plaga: number | null;
  nombre: string;
  descripcion?: string;
}

const API_URL = "http://127.0.0.1:8000/api/plaga/";
const getToken = () => localStorage.getItem("token");

// Obtener todas las plagas
const fetchPlagas = async () => {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!response.ok) throw new Error("Error al obtener las plagas");
  return response.json();
};

export const useFetchPlagas = () => {
  return useQuery({
    queryKey: ["plagas"],
    queryFn: fetchPlagas,
    staleTime: 5000,
    refetchInterval: 5000,
  });
};

// Obtener una plaga por ID
const fetchPlagaById = async (id: string) => {
  const { data } = await axios.get(`${API_URL}${id}/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
  });
  return data;
};

export const useFetchPlagaById = (id: string) => {
  return useQuery({
    queryKey: ["plaga", id],
    queryFn: () => fetchPlagaById(id),
    enabled: !!id,
  });
};

// Crear una nueva plaga
const createPlaga = async (nuevaPlaga: Plaga) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(nuevaPlaga),
  });
  if (!response.ok) throw new Error("Error al registrar la plaga");
  return response.json();
};

export const useCreatePlaga = () => {
  return useMutation({
    mutationFn: createPlaga,
    onSuccess: () => toast.success("✅ Plaga registrada exitosamente"),
    onError: () => toast.error("❌ Error al registrar la plaga"),
  });
};

// Actualizar una plaga
const updatePlaga = async ({ id, ...plaga }: any) => {
  const { data } = await axios.patch(`${API_URL}${id}/`, plaga, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
  });
  return data;
};

export const useUpdatePlaga = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePlaga,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plagas"] });
      toast.success("✅ Plaga actualizada correctamente");
    },
    onError: () => {
      toast.error("❌ Error al actualizar la plaga");
    },
  });
};

// Eliminar una plaga
const deletePlaga = async (id: string) => {
  await axios.delete(`${API_URL}${id}/`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

export const useDeletePlaga = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePlaga,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plagas"] });
      toast.success("✅ Plaga eliminada correctamente");
    },
    onError: () => {
      toast.error("❌ Error al eliminar la plaga");
    },
  });
};
