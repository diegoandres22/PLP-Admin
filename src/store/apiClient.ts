// src/store/apiClient.ts
//
// Cliente axios para llamadas AUTENTICADAS a la API de FastAPI (crear
// rifas, confirmar/rechazar compras, gestionar cuentas bancarias). No
// usar para los GET públicos (lista de rifas, cuentas activas): esos
// pueden seguir llamándose directo, sin token.
//
// El token se pide a /api/token (mismo origen, la cookie de sesión de
// NextAuth viaja sola) y se cachea en memoria hasta ~30s antes de
// expirar, momento en que se refresca automáticamente.
import axios, { InternalAxiosRequestConfig } from "axios";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

let cachedToken: string | null = null;
let cachedTokenExpiresAt = 0; // epoch ms

async function getValidToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && now < cachedTokenExpiresAt - 30_000) {
    return cachedToken;
  }

  const res = await fetch("/api/token", { credentials: "include" });
  if (!res.ok) {
    throw new Error("No se pudo obtener el token de administrador. Vuelve a iniciar sesión.");
  }
  const data: { token: string; expiresIn: number } = await res.json();
  cachedToken = data.token;
  cachedTokenExpiresAt = now + data.expiresIn * 1000;
  return cachedToken;
}

export const apiClient = axios.create({ baseURL: API_BASE_URL });

apiClient.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const token = await getValidToken();
  config.headers.set("Authorization", `Bearer ${token}`);
  return config;
});
