import React, { useState, useEffect } from 'react';
import { Link } from "@heroui/link";
import { IconHome, IconMenu, IconSettings, IconUser, IconX } from '@tabler/icons-react';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Button,
} from "@heroui/react";
import { LogoImage } from '@/component/3-elements/logoImage';


const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1280) { 
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <div className={`hidden sm:flex ${isOpen ? 'w-48' : 'w-40'} h-screen bg-gray-800 text-white 
            transition-all duration-300 `}>
                <div className="flex flex-col w-full">
                    <div className="flex items-center justify-between p-2">
                        <LogoImage />

                        <button onClick={toggleSidebar} className="xl:hidden">
                            {isOpen ? <IconX stroke={2} /> : <IconMenu stroke={2} />}
                        </button>
                    </div>

                    <nav className="flex flex-col space-y-4 p-4">

                        <Button aria-label="Ganadores" variant="light" >
                            <Link href="/#Winners" className="flex items-center space-x-2" >
                                <IconHome stroke={2} />
                                {isOpen && <span>Home</span>}
                            </Link>
                        </Button>

                        <Button aria-label="Perfil" variant="light" >
                            <Link className="flex items-center space-x-2">
                                <IconUser stroke={2} />
                                {isOpen && <span>Profile</span>}
                            </Link>
                        </Button>

                        <Button aria-label="Ajustes" variant="light" >
                            <Link className="flex items-center space-x-2">
                                <IconSettings stroke={2} />
                                {isOpen && <span>Settings</span>}
                            </Link>
                        </Button>
                    </nav>
                </div>
            </div>

            {/* Navbar para pantallas pequeñas */}
            <Navbar className='bg-black bg-transparent py-4 flex sm:hidden' >

                <NavbarContent justify="start">
                    <NavbarBrand>
                        <LogoImage />
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent className="sm:hidden" justify="center">
                    <NavbarMenuToggle />
                </NavbarContent>

                <NavbarMenu className=' justify-center bg-transparent gap-4'>

                    <NavbarMenuItem key={0}>
                        <Link className="flex items-center space-x-2" href="#">
                            <IconHome stroke={2} />
                            <span>Home</span>
                        </Link>
                    </NavbarMenuItem>



                </NavbarMenu>
            </Navbar>
        </>
    );
};

export default Sidebar;
