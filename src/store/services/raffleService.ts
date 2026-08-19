import axios from "axios";
import { Raffle } from "@/types";
import { apiClient, API_BASE_URL } from "@/store/apiClient";

const API_URL = API_BASE_URL + "/raffle";

// Pública, sin token.
export const getRaffles = async (): Promise<Raffle[]> => {
  const { data } = await axios.get(`${API_URL}/all/`);
  return (data as { Rifas: Raffle[] }).Rifas;
};

export const getRaffleById = async (id: string): Promise<Raffle> => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data as Raffle;
};

// Requiere admin autenticado.
export const createRaffleService = async (formData: FormData): Promise<Raffle> => {
  const { data } = await apiClient.post(`${API_URL}/new/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data as Raffle;
};
