"use client"
import React, { useEffect } from 'react';
import { Form, Input, Button, Switch, InputOtp } from '@heroui/react';
import { IconGift, IconPhotoScan, IconReceiptDollar, IconReceiptOff, IconTicket, IconTicketOff } from '@tabler/icons-react';

type FormDataType = {
    [key: string]: FormDataEntryValue;
};

export const NewRaffleSection = () => {
    const [submitted, setSubmitted] = React.useState<FormDataType | null>(null);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        setSubmitted(data);
    };

    const [enabledTickets, setEnabledTickets] = React.useState(false);
    const [enabledVolPurchase, setEnabledVolPurchase] = React.useState(false);
    const [quantity, setQuantity] = React.useState(1);

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(1, Math.min(10, parseInt(e.target.value) || 1));
        setQuantity(value);
    };

    useEffect(() => {

    }, [enabledTickets, enabledVolPurchase]);

    return (
        <Form className="flex w-full max-w-lg gap-8 transition-all duration-300 ease-in-out bg-white/20 p-10 rounded-2xl" onSubmit={onSubmit} >
            <Input
                isRequired
                errorMessage="Ingresa un nombre valido"
                label="Nombre de la rifa"
                labelPlacement="outside"
                name="name"
                placeholder="Nombre "
                type="text"
                variant='faded'
            />
            <Input

                errorMessage="Ingresa un texto valido"
                label={
                    <div className="flex items-center gap-1">
                        <IconGift stroke={2} className="w-4 h-4" />
                        Premio 1 <strong className='text-red-600'>*</strong>
                    </div>}
                labelPlacement="outside"
                name="trophy1"
                placeholder="Premio 1 a sortear"
                type="text"
                variant='faded'
            />

            <Input
                errorMessage="Ingresa una imagen válida"
                label={
                    <div className="flex items-center gap-1">
                        <IconPhotoScan stroke={2} className="w-4 h-4" />
                        Imagen del premio 1 <strong className='text-red-600'>*</strong>
                    </div>
                }
                labelPlacement="outside"
                name="imgTrophy1"
                placeholder="Imagen del premio 1"
                type="file"
                variant='faded'
            />
            <Input
                errorMessage="Ingresa un texto valido"
                labelPlacement="outside"
                label={
                    <div className="flex items-center gap-1">
                        <IconGift stroke={2} className="w-4 h-4" />
                        Premio 2 (Si aplica) <strong className='text-red-600'>*</strong>
                    </div>}
                name="trophy2"
                placeholder="Premio 2 a sortear"
                type="text"
                variant='faded'
            />


            <div className="transition-all duration-300 ease-in-out">
                <Switch
                    color="warning"
                    size="lg"
                    className="my-4"
                    endContent={<IconTicketOff stroke={2} className="text-black" />}
                    startContent={<IconTicket stroke={2} />}
                    checked={enabledTickets}
                    onChange={() => setEnabledTickets(!enabledTickets)} // Actualizamos el estado
                >
                    Boletos premiados
                </Switch>

                <div
                    className={`transition-all duration-500 ease-in-out ${enabledTickets ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                        }`}
                >
                    {enabledTickets && (
                        <>
                            <Input
                                type="number"
                                label="Cantidad de boletos premium"
                                value={quantity.toString()}
                                min={1}
                                max={10}
                                startContent={<IconTicket stroke={2} />}
                                onChange={handleQuantityChange}
                                placeholder="Ingresa un número entre 1 y 10"
                                variant="faded"
                                labelPlacement="outside"
                            />

                            {Array.from({ length: quantity }).map((_, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    {`Número del boleto ${index + 1} :`}
                                    <InputOtp
                                        required
                                        length={4}
                                        name={`premiumTicket${index + 1}`}
                                        variant="faded"
                                        errorMessage="Ingresa cuatro números"
                                    />
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>


            <div className="transition-all duration-300 ease-in-out">
                <Switch
                    color="warning"
                    size="lg"
                    className="my-4"
                    endContent={<IconReceiptOff stroke={2} />}
                    startContent={<IconReceiptDollar stroke={2} />}
                    checked={enabledVolPurchase}
                    onChange={() => setEnabledVolPurchase(!enabledVolPurchase)} // Actualizamos el estado
                >
                    Premio por mas compras
                </Switch>

                <div
                    className={`transition-all duration-500 ease-in-out ${enabledVolPurchase ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                        }`}
                >
                    {enabledVolPurchase && (
                        <Input
                            type="number"
                            label="Valor del premio"
                            min={1}
                            max={10000}
                            placeholder="Ingresa el valor del premio en $"
                            variant="faded"
                            startContent={
                                <div className="pointer-events-none flex items-center">
                                    <span className="text-default-500 text-lg">$</span>
                                </div>
                            }
                            labelPlacement="outside"
                            errorMessage="Ingresa un valor mayor a 0 y menor a 10.000"

                        />

                    )}
                </div>
            </div>

            <Input
                errorMessage="Ingresa una cantidad valida"
                labelPlacement="outside"
                label={
                    <div className="flex items-center gap-1">
                        <IconTicket stroke={2} className="w-4 h-4" />
                        Cantidad mínima a comprar <strong className='text-red-600'>*</strong>
                    </div>}
                name="trophy2"
                placeholder="Mínimo permitido"
                type="number"
                min={1}
                defaultValue='2'
                variant='faded'
                startContent={<IconTicket stroke={2} />}
            />

            <Input
                errorMessage="Ingresa una cantidad valida"
                labelPlacement="outside"
                label={
                    <div className="flex items-center gap-1 text-xl">
                        <IconTicket stroke={2} className="w-6 h-6" />
                        Precio del boleto <strong className='text-red-600'>*</strong>
                    </div>}
                name="trophy2"
                placeholder="Mínimo permitido"
                type="number"
                min={1}
                defaultValue='2'
                variant='faded'
                startContent={"Bs"}

            />


            <Button type="submit" variant="shadow" color='primary' className='w-80 m-auto text-black font-semibold'>
                Crear Rifa
            </Button>
            {submitted && (
                <div className="text-small text-default-500">
                    You submitted: <code>{JSON.stringify(submitted)}</code>
                </div>
            )}
        </Form>
    );
};
