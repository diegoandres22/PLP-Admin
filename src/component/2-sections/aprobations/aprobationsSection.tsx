"use client"

import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Tooltip, useDraggable, useDisclosure } from '@heroui/react'
import { IconBrandBinance, IconBuildingBank, IconPhoto, IconSquareRoundedCheck, IconSquareRoundedX } from '@tabler/icons-react'
import { ModalImage } from '@/component/3-elements';

const approvalData = [
    {
        jugador: "Diego",
        email: "diego.a.v3005@gmail.com",
        numero: "+584124998202",
        metodo: "Banesco",
        cantidad: 3,
        referencia: "19238467",
        total: "960 bs",
        imageUrl: "https://www.chevrolet.com.co/content/dam/chevrolet/south-america/colombia/espanol/index/plan-siempre-chevrolet/intro/plano-chevrolet-intro.jpg?imwidth=960"
    },
    {
        jugador: "jeferson",
        email: "jeferson@gmail.com",
        numero: "+584124998522",
        metodo: "Binance",
        cantidad: 3,
        referencia: "23567823",
        total: "9$",
        imageUrl: "https://www.chevrolet.com.co/content/dam/chevrolet/south-america/colombia/espanol/index/plan-siempre-chevrolet/intro/plano-chevrolet-intro.jpg?imwidth=960"

    },
    {
        jugador: "Maide",
        email: "maide@gmail.com",
        numero: "+584244568522",
        metodo: "Bank Of Americ",
        cantidad: 10,
        referencia: "2359823",
        total: "32$",
        imageUrl: "https://www.chevrolet.com.co/content/dam/chevrolet/south-america/colombia/espanol/index/plan-siempre-chevrolet/intro/plano-chevrolet-intro.jpg?imwidth=960"

    }
];

export const AprobationsSection: React.FC = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const targetRef = React.useRef(null) as unknown as React.RefObject<HTMLElement>;
    const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });
    const [selectedRow, setSelectedRow] = React.useState<typeof approvalData[0] | null>(null);


    return (
        <>
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
                    <TableColumn>
                        <div className="w-full h-full flex justify-center items-center">
                            Imagen
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
                            <TableCell>
                                <div className="w-full h-full flex justify-center items-center">
                                    <Tooltip content="Ver imagen" >
                                        <Button isIconOnly onPress={() => {
                                            setSelectedRow(row); // 👈 guardamos la fila seleccionada
                                            onOpen();
                                        }} aria-label="Ver imagen" color="default" variant="faded">
                                            <IconPhoto stroke={2} />
                                        </Button>
                                    </Tooltip>
                                </div>
                            </TableCell>
                            <TableCell className='text-yellow-600 text-lg font-semibold min-w-24'>
                                <div className="w-full h-full flex justify-center items-center">
                                    {row.total}
                                </div>
                            </TableCell>
                            <TableCell >
                                <div className='flex gap-2 w-full justify-center'>
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
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <ModalImage
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                targetRef={targetRef}
                moveProps={moveProps}
                data={selectedRow}
            />
        </>
    );
}
