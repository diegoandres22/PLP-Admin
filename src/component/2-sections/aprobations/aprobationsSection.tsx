"use client"

import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Tooltip } from '@heroui/react'
import { IconBrandBinance, IconBuildingBank, IconSquareRoundedCheck, IconSquareRoundedX } from '@tabler/icons-react'

const approvalData = [
    {
        jugador: "Diego",
        email: "diego.a.v3005@gmail.com",
        numero: "+584124998202",
        metodo: "Banesco",
        cantidad: 3,
        referencia: "19238467",
        total: "960 bs",
    },
    {
        jugador: "jeferson",
        email: "jeferson@gmail.com",
        numero: "+584124998522",
        metodo: "Binance",
        cantidad: 3,
        referencia: "23567823",
        total: "9$",
    },
    {
        jugador: "Maide",
        email: "maide@gmail.com",
        numero: "+584244568522",
        metodo: "Bank Of Americ",
        cantidad: 10,
        referencia: "2359823",
        total: "32$",
    },
    {
        jugador: "morocho",
        email: "morocho@gmail.com",
        numero: "+584244232122",
        metodo: "Mercantil",
        cantidad: 5,
        referencia: "2323423123",
        total: "1500 bs",
    },
    {
        jugador: "Diego",
        email: "diego.a.v3005@gmail.com",
        numero: "+584124998202",
        metodo: "Banesco",
        cantidad: 3,
        referencia: "19238467",
        total: "960 bs",
    },
    {
        jugador: "Diego",
        email: "diego.a.v3005@gmail.com",
        numero: "+584124998202",
        metodo: "Banesco",
        cantidad: 3,
        referencia: "19238467",
        total: "960 bs",
    },
    {
        jugador: "jeferson",
        email: "jeferson@gmail.com",
        numero: "+584124998522",
        metodo: "Binance",
        cantidad: 3,
        referencia: "23567823",
        total: "9$",
    },
    {
        jugador: "Maide",
        email: "maide@gmail.com",
        numero: "+584244568522",
        metodo: "Bank Of Americ",
        cantidad: 10,
        referencia: "2359823",
        total: "32$",
    },
    {
        jugador: "morocho",
        email: "morocho@gmail.com",
        numero: "+584244232122",
        metodo: "Mercantil",
        cantidad: 5,
        referencia: "2323423123",
        total: "1500 bs",
    },
    {
        jugador: "Diego",
        email: "diego.a.v3005@gmail.com",
        numero: "+584124998202",
        metodo: "Banesco",
        cantidad: 3,
        referencia: "19238467",
        total: "960 bs",
    },
    {
        jugador: "Diego",
        email: "diego.a.v3005@gmail.com",
        numero: "+584124998202",
        metodo: "Banesco",
        cantidad: 3,
        referencia: "19238467",
        total: "960 bs",
    },
    {
        jugador: "jeferson",
        email: "jeferson@gmail.com",
        numero: "+584124998522",
        metodo: "Binance",
        cantidad: 3,
        referencia: "23567823",
        total: "9$",
    },
    {
        jugador: "Maide",
        email: "maide@gmail.com",
        numero: "+584244568522",
        metodo: "Bank Of Americ",
        cantidad: 10,
        referencia: "2359823",
        total: "32$",
    },
    {
        jugador: "morocho",
        email: "morocho@gmail.com",
        numero: "+584244232122",
        metodo: "Mercantil",
        cantidad: 5,
        referencia: "2323423123",
        total: "1500 bs",
    },
    {
        jugador: "Diego",
        email: "diego.a.v3005@gmail.com",
        numero: "+584124998202",
        metodo: "Banesco",
        cantidad: 3,
        referencia: "19238467",
        total: "960 bs",
    },
    // Agrega más objetos según sea necesario
];

export const AprobationsSection = () => {
    return (
        <Table
            aria-label="Tabla de aprobaciones"
            color={'default'}
            selectionMode="single"
            className='max-h-[70vh]'
            isHeaderSticky
        >
            <TableHeader>
                <TableColumn>
                    <div className="w-full h-full flex justify-center items-center">
                        Jugador
                    </div>
                </TableColumn>
                <TableColumn className="hidden lg:table-cell">
                    <div className="w-full h-full flex justify-center items-center">
                        Email
                    </div>
                </TableColumn>
                <TableColumn className="hidden lg:table-cell">
                    <div className="w-full h-full flex justify-center items-center">
                        Número
                    </div>
                </TableColumn>
                <TableColumn>
                    <div className="w-full h-full flex justify-center items-center">
                        Método
                    </div>
                </TableColumn>
                <TableColumn>
                    <div className="w-full h-full flex justify-center items-center">
                        Cantidad
                    </div>
                </TableColumn>
                <TableColumn>
                    <div className="w-full h-full flex justify-center items-center">
                        # Referencia
                    </div>
                </TableColumn>
                <TableColumn className='text-yellow-600'>
                    <div className="w-full h-full flex justify-center items-center">
                        TOTAL
                    </div>
                </TableColumn>
                <TableColumn>
                    <div className="w-full h-full flex justify-center items-center">
                        Acciones
                    </div>
                </TableColumn>
            </TableHeader>
            <TableBody>
                {approvalData.map((row, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            {row.metodo !== "Binace" && row.jugador}

                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                            <div className="w-full h-full flex justify-center items-center">
                                {row.email}
                            </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                            {row.numero}
                        </TableCell>
                        <TableCell>
                            {row.metodo === "Binance" ? (
                                <div className='flex gap-2 items-center justify-center'>
                                    <IconBrandBinance stroke={2} className="text-yellow-500" />
                                    <span className="xl:inline-block hidden">{row.metodo}</span>
                                </div>
                            ) : row.metodo === "Bank Of Americ" ? (
                                <div className="w-full h-full flex justify-center items-center">
                                    {row.metodo}
                                </div>
                            ) : row.metodo === "Banesco" ? (
                                <div className="w-full h-full flex justify-center items-center gap-1">
                                    <IconBuildingBank stroke={2} className='text-teal-500' />
                                    {row.metodo}
                                </div>
                            ) : (
                                <div className="w-full h-full flex justify-center items-center gap-1">
                                    <IconBuildingBank stroke={2} className='text-blue-700' />
                                    <span className="xl:inline-block hidden">{row.metodo}</span>

                                </div>
                            )}
                        </TableCell>
                        <TableCell>
                            <div className="w-full h-full flex justify-center items-center">
                                {row.cantidad}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="w-full h-full flex justify-center items-center">
                                {row.referencia}
                            </div>
                        </TableCell>
                        <TableCell className='text-yellow-600 text-lg font-semibold min-w-24'>
                            <div className="w-full h-full flex justify-center items-center">
                                {row.total}
                            </div>
                        </TableCell>
                        <TableCell className='flex gap-2'>
                            <Tooltip content="Aprobar" color='success'>
                                <Button isIconOnly aria-label="Aprobar" color="success" variant='ghost'>
                                    <IconSquareRoundedCheck stroke={2} />
                                </Button>
                            </Tooltip>
                            <Tooltip content="Rechazar" color='danger'>
                                <Button isIconOnly aria-label="Denegar" color="danger" variant='ghost'>
                                    <IconSquareRoundedX stroke={2} />
                                </Button>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
