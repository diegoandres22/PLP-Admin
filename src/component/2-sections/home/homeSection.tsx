"use client"
import React, { useEffect, useMemo, useState } from 'react';
import { StatusRaffles } from '@/component/3-elements';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Raffle } from '@/types';

// Estados de rifa, en un solo sitio para no repetir el switch.
const ESTADOS = [
  { clave: 1, color: 'text-green-500/90', palabra: 'Activas' },
  { clave: 2, color: 'text-orange-500/80', palabra: 'Agotadas' },
  { clave: 3, color: 'text-foreground-subtle', palabra: 'Terminadas' },
  { clave: 4, color: 'text-red-700', palabra: 'Suspendidas' },
] as const;

export const HomeSection = () => {
  const { raffles, loading, error } = useSelector(
    (state: RootState) => state.Raffles
  );

  const [loadingCounter, setLoadingCounter] = useState(0);

  // useMemo en vez de useEffect + useState: el conteo es un valor derivado de
  // `raffles`, no un efecto. Así se evita el render extra por cada recuento.
  const counts = useMemo(() => {
    const acc: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };
    (raffles ?? []).forEach((r: Raffle) => {
      if (acc[r.raffle_status] !== undefined) acc[r.raffle_status] += 1;
    });
    return acc;
  }, [raffles]);

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setLoadingCounter((prev) => (prev + 1) % 10);
    }, 100);
    return () => clearInterval(interval);
  }, [loading]);

  // El error se muestra al administrador; antes solo se escribía en la consola
  // del navegador, así que en la práctica no se enteraba nadie.
  if (error) {
    return (
      <div
        role="alert"
        className="my-4 w-full rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-center"
      >
        <p className="font-semibold">No se pudieron cargar las rifas</p>
        <p className="mt-1 text-sm text-foreground-muted">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex w-full py-4 justify-center sm:justify-between gap-2 flex-wrap">
      {ESTADOS.map(({ clave, color, palabra }) => (
        <StatusRaffles
          key={clave}
          color={color}
          word={palabra}
          number={loading ? loadingCounter : counts[clave]}
        />
      ))}
    </div>
  );
};
