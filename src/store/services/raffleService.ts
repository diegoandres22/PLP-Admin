import axios from "axios";
import { Raffle } from "@/types";


const API_URL = process.env.NEXT_PUBLIC_API_URL + "/raffle";


export const getRaffles = async (): Promise<Raffle[]> => {
  const { data } = await axios.get(`${API_URL}/all/`);
  return (data as { Rifas: Raffle[] }).Rifas;
};

export const getRaffleById = async (id: string): Promise<Raffle> => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data as Raffle;
};

