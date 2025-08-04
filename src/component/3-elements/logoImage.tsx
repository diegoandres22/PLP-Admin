"use client"
import React from 'react'
import { Image } from "@heroui/image";
import isologo from '@/app/isologo.png'; 


export const LogoImage = () => {
    return (
            <Image
                src={isologo.src} 
                width={120}
                height={80}
                alt="Marca del sitio"
            />
    )
}
