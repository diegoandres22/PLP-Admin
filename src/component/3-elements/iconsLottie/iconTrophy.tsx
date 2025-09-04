import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const TrophyAnimation = () => {
  return (
    <div className="relative w-[120px] h-[150px] flex justify-center items-center">
      {/* Confeti detrás */}
      <DotLottieReact
        src="/Confetti.json"
        loop
        autoplay
        style={{ width: '100%', height: '100%', zIndex: 0 }}
      />

      {/* Trofeo delante */}
      <DotLottieReact
        src="/Trophy.json"
        loop
        autoplay
        style={{ width: '80%', height: '80%', position: 'absolute', zIndex: 1 }}
      />
    </div>
  );
};
