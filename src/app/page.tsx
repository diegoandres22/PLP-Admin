import React from 'react';
import DotGrid from '@/component/3-elements/dotGrid';
import { Login } from '@/component/1-screens';

export default function Page() {
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
