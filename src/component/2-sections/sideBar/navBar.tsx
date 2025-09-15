'use client'

import { usePathname } from 'next/navigation'
import { LogoImage } from '@/component/3-elements/logoImage'
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle
} from '@heroui/react'
import {
  IconHome,
  IconUser,
  IconSettings,
  IconChartBar,
  IconUsers,
  IconCreditCard,
  IconCheck,
  IconPlus,
  IconLogout2,
} from '@tabler/icons-react'
import React from 'react'
import { signOut } from 'next-auth/react'

const navItems = [
  { name: 'Inicio', icon: IconHome, path: '/Inicio' },
  { name: 'Aprobaciones', icon: IconCheck, path: '/Aprobaciones' },
  { name: 'Rifar', icon: IconPlus, path: '/Rifar' },
  { name: 'Jugadores', icon: IconUsers, path: '/Jugadores' },
  { name: 'Cuentas', icon: IconCreditCard, path: '/Cuentas' },
  { name: 'Estadísticas', icon: IconChartBar, path: '/Estadisticas' },
  { name: 'Ajustes', icon: IconSettings, path: '/Ajustes' },
  { name: 'Perfil', icon: IconUser, path: '/Perfil' },
]

export const NavBar = () => {
  const pathname = usePathname()

  return (
    <Navbar className="bg-transparent/10 py-4 flex sm:hidden">
      <NavbarContent justify="start">
        <NavbarBrand>
          <LogoImage />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="center">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu className="flex flex-col items-start justify-center bg-black/40 gap-6 px-4">
        {navItems.map(({ name, icon: Icon, path }, index) => {
          const isActive = pathname === path
          return (
            <NavbarMenuItem key={index}>
              <Link
                href={path}
                className={`flex items-center gap-3 text-xl transition-all ${isActive
                  ? 'text-blue-500 font-semibold'
                  : 'text-white hover:text-blue-600'
                  }`}
              >
                <Icon stroke={2} className="scale-150" />
                <span>{name}</span>
              </Link>
            </NavbarMenuItem>
          )
        })}
        <NavbarMenuItem key={99}>


          <Link
            aria-label="Cerrar sesión"
            color='danger'
            onPress={() => signOut()}
          >
            <div className="flex items-center space-x-2 ">
              <IconLogout2 stroke={2} className=" scale-150" />
              <span>Cerrar sesión</span>
            </div>
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  )
}
