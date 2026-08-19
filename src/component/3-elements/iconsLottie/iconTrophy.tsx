import React from "react";
import { IconTrophy } from "@tabler/icons-react";

// Antes usaba /Trophy.json y /Confetti.json vía DotLottieReact: ninguno de
// los dos archivos existe en el repo (no hay carpeta public/), así que la
// animación del premio principal no se renderizaba. Se reemplaza por un
// ícono estático con una animación CSS ligera (sin depender de assets).
export const TrophyAnimation = () => {
  return (
    <div className="relative w-[60px] h-[60px] flex justify-center items-center">
      <IconTrophy stroke={1.5} size={48} className="text-warning-500 animate-bounce" />
    </div>
  );
};
