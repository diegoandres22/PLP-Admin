
"use client";

import { Button } from "@heroui/react";
import { IconBrandGoogle } from "@tabler/icons-react";
import { useSession, signIn } from "next-auth/react";

export const ButtomsNextAuth = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Cargando sesión...</p>;
  }

  if (!session) {
    return <Button className="light font-semibold my-4" color="default" startContent={<IconBrandGoogle stroke={2} />} onClick={() => signIn("google")}>
        Iniciar sesión con Google
      </Button>;
    
  }

  return (
    <div>
      <p>Sesion iniciada con Google </p>
      
    </div>
  );
}

