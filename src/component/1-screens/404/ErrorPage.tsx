"use client"

// Los componentes de HeroUI usan React Context, que solo funciona en
// componentes de cliente. Sin esta directiva el servidor falla con
// "createContext only works in Client Components".
import React from 'react'
import { IconMoodSad2 } from "@tabler/icons-react";

// Antes mostraba /404Error.png, un archivo que no existe en el repo (no hay
// carpeta public/): la pantalla de error se veía rota. Se reemplaza por un
// ícono, sin depender de ningún asset externo.
export const ErrorPage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-surface-raised rounded-3xl text-foreground-muted">
      <IconMoodSad2 stroke={1.5} size={96} className="opacity-60" />
      <h2 className="text-2xl font-semibold">Página no encontrada</h2>
    </div>
  )
}
