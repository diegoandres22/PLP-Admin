"use client"
import Link from 'next/link';
import { NavBar } from './navBar';
import { Button } from "@heroui/react";
import { LogoImage } from '@/component/3-elements/logoImage';
import React, { useState, useEffect } from 'react';
import { IconChartBar, IconChecklist, IconDatabaseDollar, IconHome, IconLogout2, IconMenu, IconPlus, IconSettings, IconUser, IconUsersGroup, IconX } from '@tabler/icons-react';

import { usePathname } from 'next/navigation';

export const Sidebar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [firstPathSegment, setFirstPathSegment] = useState<string>('');

    useEffect(() => {
        const segment = pathname.split('/')[1];
        setFirstPathSegment(segment);

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
    }, [pathname]);

    return (
        <>
            <div className={`hidden sm:flex ${isOpen ? 'w-48' : 'w-40'} h-screen bg-gray-800 text-white transition-all duration-300 absolute`}>
                <div className="flex flex-col h-[95vh] w-full justify-between">
                    <div className="flex items-center justify-between p-2">
                        <LogoImage />

                        <button onClick={() => setIsOpen(prev => !prev)} className="xl:hidden">
                            {isOpen ? <IconX stroke={2} /> : <IconMenu stroke={2} />}
                        </button>
                    </div>

                    <nav className="flex flex-col space-y-4 p-4 gap-6 items-start">
                        {['Inicio', "Aprobaciones", 'Rifar',  'Jugadores', 'Cuentas', 'Estadísticas', 'Ajustes'].map((button) => (
                            <Link key={button} href={`/${button}`}>
                                <Button
                                    aria-label={button}
                                    variant={firstPathSegment === button ? "bordered" : "light"}
                                    color={firstPathSegment === button ? 'primary' : 'default'}
                                >
                                    <div className="flex items-center space-x-2">
                                        {button === 'Inicio' && <IconHome stroke={2} />}
                                        {button === 'Aprobaciones' && <IconChecklist stroke={2} />}
                                        {button === 'Rifar' && <IconPlus stroke={2} />}
                                        {button === 'Jugadores' && <IconUsersGroup stroke={2} />}
                                        {button === 'Cuentas' && <IconDatabaseDollar stroke={2} />}
                                        {button === 'Estadísticas' && <IconChartBar stroke={2} />}
                                        {button === 'Ajustes' && <IconSettings stroke={2} />}

                                        {isOpen && <span>{button.charAt(0).toUpperCase() + button.slice(1)}</span>}
                                    </div>
                                </Button>
                            </Link>
                        ))}
                    </nav>

                    <div className="flex flex-col space-y-4 p-4 items-start">
                        <Link href={"/profile"}>
                            <Button
                                aria-label="Perfil"
                                variant={firstPathSegment === 'profile' ? "bordered" : "light"}
                                color="primary"
                            >
                                <div className="flex items-center space-x-2">
                                    <IconUser stroke={2} />
                                    {isOpen && <span>Profile</span>}
                                </div>
                            </Button>
                        </Link>

                        <Button
                            aria-label="Cerrar sesión"
                            variant="light"
                            color="danger"
                        >
                            <div className="flex items-center space-x-2">
                                <IconLogout2 stroke={2} className="scale-150" />
                                {isOpen && <span>Cerrar sesión</span>}
                            </div>
                        </Button>
                    </div>

                </div>
            </div >

            {/* Navbar para pantallas pequeñas */}
            < NavBar />
        </>
    );
};


