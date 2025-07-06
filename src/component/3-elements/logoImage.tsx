import React from 'react'
import { Image } from "@heroui/image";
import { Link } from '@heroui/react';
import isologo from '@/app/isologo.png'; 


export const LogoImage = () => {
    return (
        <Link href="/" >
            <Image
                src={isologo.src} 
                width={120}
                height={80}
                alt="Marca del sitio"
            />
        </Link>
    )
}
