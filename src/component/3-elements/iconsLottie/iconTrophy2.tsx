import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const TrophyAnimation2 = () => {
  return (
    <div className="relative ml-5 w-[80px] h-[100px] grayscale ">
      <DotLottieReact src="/Trophy.json" loop autoplay />
    </div>
  );
};
