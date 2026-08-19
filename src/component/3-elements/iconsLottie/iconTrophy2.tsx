import React from "react";
import { IconTrophy } from "@tabler/icons-react";

// Antes usaba /Trophy.json vía DotLottieReact: el archivo no existe en el
// repo. Se reemplaza por el mismo ícono en gris (premio secundario), sin
// animación, para diferenciarlo visualmente del premio principal.
export const TrophyAnimation2 = () => {
  return (
    <div className="relative w-[40px] h-[40px] flex justify-center items-center ml-5">
      <IconTrophy stroke={1.5} size={32} className="text-foreground-subtle" />
    </div>
  );
};
