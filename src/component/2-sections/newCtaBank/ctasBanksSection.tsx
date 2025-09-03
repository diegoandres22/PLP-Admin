import { addToast, Switch, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react'
import React from 'react'

export const CtasBanksSection = () => {
    const [isSelected, setIsSelected] = React.useState(true);

    const changueStateCtaBank = () => {

        setIsSelected(!isSelected)
        addToast({
            title: "Cambiando visualización",
            description: "Cuenta de banco",
            timeout: 5000,
            promise: new Promise((resolve) => setTimeout(resolve, 3000)),
        });
    }

    return (
        <Table
            aria-label="Example static collection table"
            color="default"
            selectionMode="single"
            className='w-full min-w-[200px] overflow-auto max-w-5xl rounded-2xl '
        >
            <TableHeader>
                <TableColumn> Método <strong className='text-red-500'> *</ strong></TableColumn>
                <TableColumn>Nombre <strong className='text-red-500'> *</ strong></TableColumn>
                <TableColumn >Documento <strong className='text-red-500'> *</ strong></TableColumn>
                <TableColumn >Número 1 <strong className='text-red-500'> *</ strong></TableColumn>
                <TableColumn>Número 2</TableColumn>
                <TableColumn>Correo</TableColumn>
                <TableColumn>Estado</TableColumn>
            </TableHeader>
            <TableBody>
                <TableRow key="1">
                    <TableCell>Binance</TableCell>
                    <TableCell>Diego Andres</TableCell>
                    <TableCell>28132410</TableCell>
                    <TableCell>1276123</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>Diego.a.v3005@gmail.com</TableCell>
                    <TableCell  >
                        <Switch size="lg" onValueChange={changueStateCtaBank}
                        >
                            <p className="text-small text-default-500">{isSelected ? "Activa" : "Oculta"}</p>
                        </Switch>
                    </TableCell>


                </TableRow>
                <TableRow key="2">
                    <TableCell>Mercantil vzla</TableCell>
                    <TableCell>Diego Andres</TableCell>
                    <TableCell>28132410</TableCell>
                    <TableCell>04124998202</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell >
                        <Switch defaultSelected size="lg" onValueChange={changueStateCtaBank}>
                            <p className="text-small text-default-500">{isSelected ? "Activa" : "Oculta"}</p>
                        </Switch>
                    </TableCell>
                </TableRow>
                <TableRow key="3">
                    <TableCell>Banesco panama</TableCell>
                    <TableCell>Diego Andres</TableCell>
                    <TableCell>95939085</TableCell>
                    <TableCell>00009382738000098647</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>Diego.a.v3005@gmail.com</TableCell>
                    <TableCell  >
                        <Switch  size="lg" onValueChange={changueStateCtaBank}>
                            <p className="text-small text-default-500">{isSelected ? "Activa" : "Oculta"}</p>
                        </Switch>
                    </TableCell>
                </TableRow>
                <TableRow key="4">
                    <TableCell>zelle</TableCell>
                    <TableCell>Diego Andres</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>12ALA1289</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>Diego.a.v3005@gmail.com</TableCell>
                    <TableCell  >
                        <Switch defaultSelected size="lg" onValueChange={setIsSelected}>
                            <p className="text-small text-default-500">{isSelected ? "Activa" : "Oculta"}</p>
                        </Switch>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table >
    )
}
