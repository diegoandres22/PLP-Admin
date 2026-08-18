// src/app/api/token/route.ts
//
// Emite un JWT corto (5 min) que el navegador adjunta como Bearer al
// llamar a la API de FastAPI. Este endpoint corre en el servidor de
// Next.js: valida la sesión de NextAuth (cookie httpOnly, no accesible
// desde JS del cliente) y firma el token con API_JWT_SECRET, que nunca
// se expone al navegador — solo el token ya firmado y de vida corta.
import { getServerSession } from "next-auth";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { authOptions } from "@/store/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const secret = process.env.API_JWT_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "API_JWT_SECRET no configurado" },
      { status: 500 }
    );
  }

  const token = jwt.sign(
    { sub: session.user.email, name: session.user.name, role: "admin" },
    secret,
    { expiresIn: "5m" }
  );

  return NextResponse.json({ token, expiresIn: 300 });
}
