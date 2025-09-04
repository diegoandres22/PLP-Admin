import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const GifAnimation = () => {
  return (
    <div className="relative w-[50px] h-[70px]">
      <DotLottieReact src="/Gif2.json" loop autoplay />
    </div>
  );
};
