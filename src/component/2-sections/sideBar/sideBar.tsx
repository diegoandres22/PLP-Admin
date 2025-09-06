'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import {
  IconHome,
  IconCheck,
  IconPlus,
  IconUsersGroup,
  IconDatabaseDollar,
  IconChartBar,
  IconSettings,
  IconLogout2,
  IconMenu,
  IconX,
  IconLoader
} from '@tabler/icons-react'
import { LogoImage } from '@/component/3-elements/logoImage'
import { Badge, Button } from '@heroui/react'
import { Image } from '@heroui/image'
import { NavBar } from './navBar'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { fetchPurchases } from '@/store/services/purchaseService'

const menuItems = [
  { label: 'Inicio', icon: IconHome, path: '/Inicio' },
  { label: 'Aprobaciones', icon: IconCheck, path: '/Aprobaciones', badge: 12 },
  { label: 'Rifar', icon: IconPlus, path: '/Rifar' },
  { label: 'Jugadores', icon: IconUsersGroup, path: '/Jugadores' },
  { label: 'Cuentas', icon: IconDatabaseDollar, path: '/Cuentas' },
  { label: 'Estadisticas', icon: IconChartBar, path: '/Estadisticas' },
  { label: 'Ajustes', icon: IconSettings, path: '/Ajustes' },
]

export const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>()

  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()
  const { purchasesList, error, loading } = useSelector((state: RootState) => state.Purchases)


  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 1280)
    }
    dispatch(fetchPurchases())

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [dispatch])

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/')

  return (
    <>
      <div className={`hidden sm:flex ${isOpen ? 'w-48' : 'w-40'} h-screen bg-gray-800 text-white transition-all duration-300 absolute`}>
        <div className="flex flex-col h-full justify-between">

          <div className="flex items-center justify-between p-2">
            <LogoImage />
            <button onClick={() => setIsOpen(prev => !prev)} className="xl:hidden">
              {isOpen ? <IconX stroke={2} /> : <IconMenu stroke={2} />}
            </button>
          </div>

          <nav className="flex flex-col space-y-4 p-4 gap-4 items-start">
            {menuItems.map(({ label, icon: Icon, path, badge }) => {
              const button = (
                <Button
                  aria-label={label}
                  variant={isActive(path) ? 'bordered' : 'light'}
                  color={isActive(path) ? 'primary' : 'default'}
                >
                  <div className="flex items-center space-x-2">
                    <Icon stroke={2} />
                    {isOpen && <span>{label}</span>}
                  </div>
                </Button>
              )

              return (
                <Link key={label} href={path} className="relative">
                  {badge ? (
                    <>
                      {loading && !error && (
                        <Badge
                          color="danger"
                          content={<IconLoader stroke={2} className="animate-[spin_2s_linear_infinite]" />}
                          shape="rectangle"
                          variant="faded"
                          className="absolute "
                        >
                          {button}

                        </Badge>
                      )}

                      {!loading && !error && purchasesList.length > 0 && (
                        <Badge
                          color="danger"
                          content={purchasesList.length}
                          shape="rectangle"
                          variant="faded"
                          className="absolute "
                        >
                          {button}
                        </Badge>
                      )}
                      {!loading && !error && purchasesList.length === 0 && (button)}
                    </>
                  ) : (
                    button
                  )}
                </Link>

              )
            })}
          </nav>

          {/* Perfil y logout */}
          <div className="flex flex-col space-y-4 p-4 items-start">
            <Link href="/Perfil">
              <Button
                aria-label="Perfil"
                variant={isActive('/Perfil') ? 'bordered' : 'light'}
                color="primary"
              >
                <div className="flex items-center space-x-2">

                  {session?.user?.image && (
                    <Image
                      src={session.user.image}
                      alt="avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  )}

                  {isOpen && <span className="font-semibold">Perfil</span>}
                </div>
              </Button>
            </Link>

            <Button
              aria-label="Cerrar sesión"
              variant="light"
              color="danger"
              onClick={() => signOut()}
            >
              <div className="flex items-center space-x-2">
                <IconLogout2 stroke={2} className="scale-150" />
                {isOpen && <span>Cerrar sesión</span>}
              </div>
            </Button>
          </div>

        </div>
      </div>

      {/* Navbar para móvil */}
      <NavBar />
    </>
  )
}
