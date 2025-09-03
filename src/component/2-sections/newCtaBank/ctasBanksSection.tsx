'use client'

import React, { useEffect } from 'react'
import { AppDispatch, RootState } from '@/store'
import {
    addToast,
    Spinner,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from '@heroui/react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBanks, toggleBankAccount } from '@/store/services/bankAcountsService'
import { BankAccount } from '@/types' // Ajusta la ruta según dónde tengas tus interfaces

export const CtasBanksSection = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { banksList, loading } = useSelector((state: RootState) => state.BanksAcounts)

    useEffect(() => {
        dispatch(fetchBanks())
    }, [dispatch])

    const safeValue = (val: unknown): string =>
        val !== null && val !== undefined && val !== '' ? String(val) : '-'

    const changueStateCtaBank = (id: string) => {
        addToast({
            title: "Cambiando visualización",
            description: "Cuenta de banco",
            color: "default",
            timeout: 5000,
            promise: dispatch(toggleBankAccount(id))
        });

        dispatch(toggleBankAccount(id))
            .then(() => {
                addToast({
                    title: "Cuenta actualizada",
                    description: "La tabla se refrescó con la información más reciente.",
                    color: "success",
                    timeout: 3000
                });
            })
            .catch(() => {
                addToast({
                    title: "Error",
                    description: "No se pudo actualizar la cuenta.",
                    color: "danger",
                    timeout: 3000
                });
            });
    };



    return (
        <Table
            aria-label="Tabla de cuentas bancarias"
            color="default"
            selectionMode="single"
            className="w-full min-w-[200px] overflow-auto max-w-5xl rounded-2xl"
        >
            <TableHeader>
                <TableColumn>Método <strong className="text-red-500">*</strong></TableColumn>
                <TableColumn>Nombre </TableColumn>
                <TableColumn>Documento </TableColumn>
                <TableColumn>Número 1 </TableColumn>
                <TableColumn>Número 2</TableColumn>
                <TableColumn>Correo</TableColumn>
                <TableColumn>Estado <strong className="text-red-500">*</strong></TableColumn>
            </TableHeader>
            <TableBody
                isLoading={loading}
                loadingContent={<Spinner variant="gradient" label="Cargando cuentas..." />}
                emptyContent={"No hay cuentas registradas"}
            >
                {banksList.map((bank: BankAccount) => (
                    <TableRow key={bank.id}>
                        <TableCell>{safeValue(bank.pay_method)}</TableCell>
                        <TableCell>{safeValue(bank.holder_name_cta)}</TableCell>
                        <TableCell>{safeValue(bank.document_name)}</TableCell>
                        <TableCell>{safeValue(bank.number_cta_1)}</TableCell>
                        <TableCell>{safeValue(bank.number_cta_2)}</TableCell>
                        <TableCell>{safeValue(bank.email_cta)}</TableCell>
                        <TableCell>

                            <Switch
                                size="lg"
                                isSelected={bank.is_active}
                                isDisabled={loading}
                                onValueChange={() => changueStateCtaBank(bank.id)}
                            >
                                <p className="text-small text-default-500">
                                    {bank.is_active ? 'Activa' : 'Oculta'}
                                </p>
                            </Switch>


                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

// import React, { useEffect } from 'react'
// import { AppDispatch, RootState } from '@/store';
// import { addToast, Spinner, Switch, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react'
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchBanks } from '@/store/services/bankAcountsService';
// import { tr } from 'framer-motion/client';

// export const CtasBanksSection = () => {

//     const dispatch = useDispatch<AppDispatch>()

//     const [isSelected, setIsSelected] = React.useState(true);
//     const { banksList, loading } = useSelector((state: RootState) => state.BanksAcounts);

//     const changueStateCtaBank = () => {

//         setIsSelected(!isSelected)
//         addToast({
//             title: "Cambiando visualización",
//             description: "Cuenta de banco",
//             timeout: 5000,
//             promise: new Promise((resolve) => setTimeout(resolve, 3000)),
//         });
//     }

//     useEffect(() => {

//         dispatch(fetchBanks())
//     }, [dispatch]);
//     return (
//         <Table
//             aria-label="Example static collection table"
//             color="default"
//             selectionMode="single"
//             className='w-full min-w-[200px] overflow-auto max-w-5xl rounded-2xl '
//         >
//             <TableHeader>
//                 <TableColumn> Método <strong className='text-red-500'> *</ strong></TableColumn>
//                 <TableColumn>Nombre <strong className='text-red-500'> *</ strong></TableColumn>
//                 <TableColumn >Documento <strong className='text-red-500'> *</ strong></TableColumn>
//                 <TableColumn >Número 1 <strong className='text-red-500'> *</ strong></TableColumn>
//                 <TableColumn>Número 2</TableColumn>
//                 <TableColumn>Correo</TableColumn>
//                 <TableColumn>Estado</TableColumn>
//             </TableHeader>
//             <TableBody
//                 isLoading={loading}
//                 loadingContent={<Spinner variant='gradient' label="Cargando cuentas..." />}
//             >
//                 <TableRow key="1">
//                     <TableCell>Binance</TableCell>
//                     <TableCell>Diego Andres</TableCell>
//                     <TableCell>28132410</TableCell>
//                     <TableCell>1276123</TableCell>
//                     <TableCell>-</TableCell>
//                     <TableCell>Diego.a.v3005@gmail.com</TableCell>
//                     <TableCell  >
//                         <Switch size="lg" onValueChange={changueStateCtaBank}
//                         >
//                             <p className="text-small text-default-500">{isSelected ? "Activa" : "Oculta"}</p>
//                         </Switch>
//                     </TableCell>


//                 </TableRow>
//                 <TableRow key="2">
//                     <TableCell>Mercantil vzla</TableCell>
//                     <TableCell>Diego Andres</TableCell>
//                     <TableCell>28132410</TableCell>
//                     <TableCell>04124998202</TableCell>
//                     <TableCell>-</TableCell>
//                     <TableCell>-</TableCell>
//                     <TableCell >
//                         <Switch defaultSelected size="lg" onValueChange={changueStateCtaBank}>
//                             <p className="text-small text-default-500">{isSelected ? "Activa" : "Oculta"}</p>
//                         </Switch>
//                     </TableCell>
//                 </TableRow>
//                 <TableRow key="3">
//                     <TableCell>Banesco panama</TableCell>
//                     <TableCell>Diego Andres</TableCell>
//                     <TableCell>95939085</TableCell>
//                     <TableCell>00009382738000098647</TableCell>
//                     <TableCell>-</TableCell>
//                     <TableCell>Diego.a.v3005@gmail.com</TableCell>
//                     <TableCell  >
//                         <Switch size="lg" onValueChange={changueStateCtaBank}>
//                             <p className="text-small text-default-500">{isSelected ? "Activa" : "Oculta"}</p>
//                         </Switch>
//                     </TableCell>
//                 </TableRow>
//                 <TableRow key="4">
//                     <TableCell>zelle</TableCell>
//                     <TableCell>Diego Andres</TableCell>
//                     <TableCell>-</TableCell>
//                     <TableCell>12ALA1289</TableCell>
//                     <TableCell>-</TableCell>
//                     <TableCell>Diego.a.v3005@gmail.com</TableCell>
//                     <TableCell  >
//                         <Switch defaultSelected size="lg" onValueChange={setIsSelected}>
//                             <p className="text-small text-default-500">{isSelected ? "Activa" : "Oculta"}</p>
//                         </Switch>
//                     </TableCell>
//                 </TableRow>
//             </TableBody>
//         </Table >
//     )
// }
