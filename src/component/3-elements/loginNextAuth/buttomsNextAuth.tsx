
"use client";

import { Button } from "@heroui/react";
import { IconBrandGoogle } from "@tabler/icons-react";
import { useSession, signIn } from "next-auth/react";

export const ButtomsNextAuth = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Button isLoading className="light font-semibold my-4" color="default" onClick={() => signIn("google")}>
        Cargando sesión de Google
      </Button>;
  }

  if (!session) {
    return <Button className="light font-semibold my-4" color="default" startContent={<IconBrandGoogle stroke={2} />} onClick={() => signIn("google")}>
        Iniciar sesión con Google
      </Button>;
  }

  return (
    <Button isDisabled  className="light font-semibold my-4" color="default" startContent={<IconBrandGoogle stroke={2} />} onClick={() => signIn("google")}>
        Sesion iniciada con Google
      </Button>
  );
}

