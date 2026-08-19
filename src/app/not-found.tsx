import React from 'react'
import { ErrorPage } from '@/component/1-screens'

// Antes no existía este archivo: cualquier ruta que no coincidiera con
// ninguna página (ej. una URL escrita a mano o un enlace roto) mostraba el
// 404 genérico de Next.js en vez de la pantalla propia del panel.
export default function NotFound() {
    return (
        <div className="w-full h-auto sm:h-[89vh] pl-4 sm:pl-52 sm:py-4 pr-4 mt-2 sm:mt-0">
            <ErrorPage />
        </div>
    )
}
