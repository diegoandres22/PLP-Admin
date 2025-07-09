"use client"
import { LogoImage } from '@/component/3-elements/logoImage'
import { Link, Navbar, NavbarBrand, NavbarContent, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@heroui/react'
import { IconHome, IconPlus } from '@tabler/icons-react'
import React from 'react'

export const NavBar = () => {
    return (
        <Navbar className='bg-black bg-transparent py-4 flex sm:hidden' >

            <NavbarContent justify="start">
                <NavbarBrand>
                    <LogoImage />
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="sm:hidden" justify="center">
                <NavbarMenuToggle />
            </NavbarContent>

            <NavbarMenu className='flex items-center justify-center bg-transparent gap-4'>

                <NavbarMenuItem key={0}>
                    <Link className="flex items-center space-x-2" href='#'>
                        <IconHome stroke={2} />
                        <span>Home</span>
                    </Link>
                </NavbarMenuItem>

                <NavbarMenuItem key={0}>
                    <Link className="flex items-center space-x-2" href='#'>
                        <IconPlus stroke={2} />
                        <span>Nueva rifa</span>
                    </Link>
                </NavbarMenuItem>


            </NavbarMenu>
        </Navbar>
    )
}
