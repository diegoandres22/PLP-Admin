import { LoginSections } from '@/component/2-sections'
import { LogoImage } from '@/component/3-elements'
import React from 'react'

export const Login = () => {
  return (
    <div className='absolute inset-0 flex items-center justify-center '>
      <div className="absolute top-4 left-4 ">
        <LogoImage />
      </div>
      <LoginSections />
    </div>
  )
}
