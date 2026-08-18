"use client"

// Los componentes de HeroUI usan React Context, que solo funciona en
// componentes de cliente. Sin esta directiva el servidor falla con
// "createContext only works in Client Components".
import React from 'react'
import { Image } from "@heroui/react";


export const ErrorPage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black rounded-3xl">
      <Image
        shadow="lg"
        src="/404Error.png"
        width={1620}
        height={780}
        alt="404 Error"
        className="object-contain max-w-full max-h-full"
      />
    </div>
  )
}
