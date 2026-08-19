"use client"

// Reemplaza el 404 crudo que mostraban Jugadores/Estadísticas/Ajustes/Perfil
// antes de tener una vista real: esas rutas están en el menú (el admin puede
// hacer clic en ellas) pero la funcionalidad todavía no existe. Un 404 sin
// contexto se ve como que la app está rota; esto deja claro que es temporal.
import React from 'react'
import { IconClock } from '@tabler/icons-react'

// icon recibe un elemento YA RENDERIZADO (ej. <IconUsersGroup ... />), no el
// componente en sí: los page.tsx que usan esto son Server Components, y
// React no puede serializar una referencia a un componente/función al
// pasarla a un Client Component (sí puede serializar un elemento JSX).
type ComingSoonProps = {
    label: string
    icon: React.ReactNode
}

export const ComingSoon: React.FC<ComingSoonProps> = ({ label, icon }) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-surface-raised rounded-3xl text-foreground-muted">
            <div className="opacity-60">{icon}</div>
            <h2 className="text-2xl font-semibold uppercase text-foreground">{label}</h2>
            <p className="flex items-center gap-2 text-sm">
                <IconClock stroke={2} size={18} />
                Próximamente
            </p>
        </div>
    )
}
