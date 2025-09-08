"use client"

import React, { useState, useRef, useEffect } from 'react'
import {
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Button, Tooltip, useDraggable, useDisclosure, Spinner,
    Skeleton
} from '@heroui/react'
import {
    IconBrandBinance, IconBuildingBank, IconCheck, IconEye, IconPhoto,
    IconSquareRoundedCheck, IconSquareRoundedX,
    IconX
} from '@tabler/icons-react'
import { ModalImage } from '@/component/3-elements'
import { AppDispatch, RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import { ImageOnly, Purchase } from '@/types/purchaseProps'
import { confirmPurchase, declinePurchase } from '@/store/slices/purchaseSlice'
import { useSession } from 'next-auth/react'



export const AprobationsSection: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data: session } = useSession();
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const targetRef = useRef(null) as unknown as React.RefObject<HTMLElement>
    const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen })
    const [selectedRow, setSelectedRow] = useState<Purchase | ImageOnly | null>(null);

    const { purchasesList, error, loading } = useSelector((state: RootState) => state.Purchases)


    useEffect(() => {
       

    }, [dispatch, purchasesList]);

    return (
        <>
            <Table
                aria-label="Tabla de aprobaciones"
                color={'default'}
                selectionMode="single"
                className="max-h-[70vh]"
                isHeaderSticky
            >
                {loading ?
                    <TableHeader>
                        <TableColumn><div className="flex justify-center">Cargando</div></TableColumn>
                    </TableHeader>
                    :

                    <TableHeader>
                        <TableColumn><div className="flex justify-center">Jugador</div></TableColumn>
                        <TableColumn className="hidden lg:table-cell"><div className="flex justify-center">Email</div></TableColumn>
                        <TableColumn className="hidden lg:table-cell"><div className="flex justify-center">Número</div></TableColumn>
                        <TableColumn><div className="flex justify-center">Método</div></TableColumn>
                        <TableColumn><div className="flex justify-center">Cantidad</div></TableColumn>
                        <TableColumn><div className="flex justify-center"># Referencia</div></TableColumn>
                        <TableColumn><div className="flex justify-center">Imagen</div></TableColumn>
                        <TableColumn className="text-yellow-600"><div className="flex justify-center">TOTAL</div></TableColumn>
                        <TableColumn><div className="flex justify-center">Acciones</div></TableColumn>
                    </TableHeader>
                }

                <TableBody
                    loadingContent={<Spinner label="Cargando compras..." />}
                    emptyContent={error}
                >
                    {loading ?
                        <TableRow key={1}>
                            <TableCell >
                                <Skeleton className="h-4 my-3 rounded-md" />
                                <Skeleton className="h-5 my-3 rounded-md" />
                                <Skeleton className="h-6 my-3 rounded-md" />
                                <Skeleton className="h-6 my-3 rounded-md" />
                                <Skeleton className="h-5 my-3 rounded-md" />
                                <Skeleton className="h-4 my-3 rounded-md" />
                                <Skeleton className="h-5 my-3 rounded-md" />
                                <Skeleton className="h-6 my-3 rounded-md" />

                            </TableCell>
                        </TableRow>
                        :

                        purchasesList.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.full_name}</TableCell>
                                <TableCell className="hidden lg:table-cell">{row.buyer_email}</TableCell>
                                <TableCell className="hidden lg:table-cell">{row.phone_number}</TableCell>
                                <TableCell>
                                    {row.payment_method === "Binance" ? (
                                        <div className="flex gap-2 items-center justify-center">
                                            <IconBrandBinance stroke={2} className="text-yellow-500" />
                                            <span className="xl:inline-block hidden">{row.payment_method}</span>
                                        </div>
                                    ) : (
                                        <div className="flex gap-1 justify-center items-center">
                                            <IconBuildingBank stroke={2} className="text-blue-700" />
                                            <span className="xl:inline-block hidden">{row.payment_method}</span>
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell><div className="flex justify-center">{row.ticket_numbers.length}</div></TableCell>
                                <TableCell><div className="flex justify-center">{row.payment_reference}</div></TableCell>
                                <TableCell>
                                    <div className="flex justify-center">
                                        <Tooltip content="Ver imagen">

                                            <Button
                                                isIconOnly
                                                onPress={() => {
                                                    console.log("llegó", row )
                                                    setSelectedRow({ image_url: row.image_url });
                                                    onOpen()
                                                }}
                                                aria-label="Ver imagen"
                                                color="default"
                                                variant="faded"
                                            >
                                                <IconPhoto stroke={2} />
                                            </Button>

                                        </Tooltip>
                                    </div>
                                </TableCell>
                                <TableCell className="text-yellow-600 text-lg font-semibold min-w-24">
                                    <div className="flex justify-center">{row.total_paid}$</div>
                                </TableCell>
                                <TableCell>

                                    {row.is_confirmed ? (
                                        <div className="justify-center flex items-center">
                                            Confirmado <IconCheck className="scale-80 rounded-xl text-black bg-success-400" stroke={3} />
                                        </div>
                                    ) : row.is_confirmed === false ? (
                                        <div className="justify-center flex items-center">
                                            Rechazado <IconX className="scale-80 rounded-xl text-black bg-danger-400" stroke={3} />
                                        </div>
                                    ) : (
                                        <div className="flex gap-2 justify-center">
                                            <Tooltip content="Aprobar" color="success">
                                                <Button
                                                    isIconOnly
                                                    aria-label="Aprobar"
                                                    color="success"
                                                    variant="ghost"
                                                    onPress={() => {
                                                        dispatch(
                                                            confirmPurchase({
                                                                purchase_id: row.id,
                                                                confirmed_by: session?.user?.name,
                                                            })
                                                        );
                                                    }}
                                                >
                                                    <IconSquareRoundedCheck stroke={2} />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip content="Ver" color="default">
                                                <Button
                                                    isIconOnly
                                                    aria-label="Ver"
                                                    color="default"
                                                    variant="ghost"
                                                    onPress={() => {
                                                        setSelectedRow(row);
                                                        onOpen();
                                                    }}
                                                >
                                                    <IconEye stroke={2} />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip content="Rechazar" color="danger">
                                                <Button isIconOnly aria-label="Denegar" color="danger" variant="ghost" onPress={
                                                    ()=>{
                                                        dispatch(declinePurchase({
                                                                purchase_id: row.id,
                                                                decline_by: session?.user?.name,
                                                            }))}}>
                                                    <IconSquareRoundedX stroke={2} />
                                                </Button>
                                            </Tooltip>
                                        </div>
                                    )}

                                </TableCell>
                            </TableRow>
                        ))
                    }
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
    )
}
