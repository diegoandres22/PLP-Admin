"use client";

import { ButtomsNextAuth } from "@/component/3-elements";
import React from "react";

export const LoginSections = () => {
  return (
    <div className="bg-white/50 w-80 sm:w-96 h-auto rounded-2xl flex flex-col justify-center items-center shadow-lg p-8 gap-4">
      <h1 className="text-4xl font-extrabold text-black/70 mb-4">Ingresar</h1>
      <p className="text-black/60 text-center text-sm">
        Acceso exclusivo para administradores autorizados.
      </p>
      <ButtomsNextAuth />
    </div>
  );
};
