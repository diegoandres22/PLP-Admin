
"use client";

import { Button } from "@heroui/react";
import { useSession, signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export const ButtomsNextAuth = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Button isLoading className="light font-semibold my-4" color="default" onClick={() => signIn("google")}>
        Cargando sesión de Google
      </Button>;
  }

  if (!session) {
    return <Button className="light font-semibold my-4" color="default" startContent={<FcGoogle className="text-3xl" />} onClick={() => signIn("google")}>
        Iniciar sesión con Google
      </Button>;
  }

  return (
    <Button isDisabled  className="light font-semibold my-4" color="default" startContent={<FcGoogle className="text-3xl" />} onClick={() => signIn("google")}>
        Sesion iniciada con Google
      </Button>
  );
}
