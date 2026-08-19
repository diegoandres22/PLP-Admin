import React from "react";
import { IconGift } from "@tabler/icons-react";

// Antes usaba /Gif2.json vía DotLottieReact: el archivo no existe en el
// repo. Se usa el ícono de regalo (coherente con "premio adicional", que es
// donde se usa este componente en cardRaffles.tsx).
export const GifAnimation = () => {
  return (
    <div className="relative w-[36px] h-[36px] flex justify-center items-center">
      <IconGift stroke={1.5} size={28} className="text-primary-500" />
    </div>
  );
};
