import React from 'react';
import DotGrid from '@/component/3-elements/dotGrid';
import { Login } from '@/component/1-screens';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/store/authOptions';

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/Inicio");
  }


  return (
    <div className="w-screen h-screen ">
      <DotGrid
        dotSize={4}
        gap={15}
        baseColor="#000000"
        activeColor="#0040FF"
        proximity={120}
        shockRadius={150}
        shockStrength={5}
        resistance={750}
        returnDuration={1.5}
      />
      <Login />
    </div>
  )
}
