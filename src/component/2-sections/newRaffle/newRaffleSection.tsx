"use client"
import React, { useEffect } from 'react';
import { Form, Input, Button, Switch, InputOtp, SelectItem, Select, DatePicker } from '@heroui/react';
import { IconCircleCheck, IconCurrencyDollar, IconFileAnalytics, IconGift, IconPhotoScan, IconPlayerPause, IconReceiptDollar, IconReceiptOff, IconTicket, IconTicketOff } from '@tabler/icons-react';
import { now, CalendarDateTime } from '@internationalized/date';

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
    const today = now("UTC");
    const minValue = new CalendarDateTime(
        today.year,
        today.month,
        today.day + 1, // mañana
        20,            // 20 horas = 8 PM
        0,             // minutos
        0              // segundos
    );

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
                isRequired
                errorMessage="Ingresa una descripción valida"
                label="Descripción de la rifa"
                labelPlacement="outside"
                name="description"
                placeholder="Descripción"
                type="text"
                variant='faded'
            />
            <Select
                isRequired
                defaultSelectedKeys={["Activa"]}
                label="Estatus de la rifa"
                labelPlacement='outside'
                placeholder="Selecciona un estatus"
            // startContent={<PetIcon />}
            >
                <SelectItem key={1} startContent={<IconCircleCheck stroke={2} className='text-green-500' />}>Activa</SelectItem>
                <SelectItem key={2} startContent={<IconPlayerPause stroke={2} className='text-yellow-500' />}>Pausada</SelectItem>
            </Select>
            <Input
                isRequired
                errorMessage="Ingresa un texto valido"
                label="Premio 1"
                startContent={<IconGift stroke={2} />}
                labelPlacement="outside"
                name="trophy1"
                placeholder="Premio 1 a sortear"
                type="text"
                variant='faded'
            />


            <Input
                isRequired
                errorMessage="Ingresa una imagen válida"
                label="Imagen del premio 1"
                startContent={<IconPhotoScan stroke={2} />}
                labelPlacement="outside"
                name="imgTrophy1"
                placeholder="Imagen del premio 1"
                type="file"
                variant='faded'
            />
            <Input
                errorMessage="Ingresa un texto valido"
                labelPlacement="outside"
                label="Premio 2 (Si aplica)"
                startContent={<IconGift stroke={2} />}
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
                                max={6}
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
                            type="text"
                            label="Valor del premio"
                            startContent={<IconGift stroke={2} />}
                            placeholder="Describe brevemente el premio "
                            variant="faded"
                            labelPlacement="outside"
                            errorMessage="Ingresa un texto valido"

                        />

                    )}
                </div>
            </div>

            <DatePicker
                isRequired
                label="Fecha de sorteo"
                minValue={minValue} />


            <Input
                isRequired
                errorMessage="Ingresa una cantidad valida"
                labelPlacement="outside"
                label="Cantidad de boletos a rifar"
                name="trophy2"
                placeholder="Mínimo permitido"
                type="number"
                min={1}
                max={9999}
                defaultValue='100'
                variant='faded'
                startContent={<IconTicket stroke={2} />}
            />
            <Input
                isRequired
                errorMessage="Ingresa una cantidad valida"
                labelPlacement="outside"
                label="Cantidad mínima a comprar"
                name="trophy2"
                placeholder="Mínimo permitido"
                type="number"
                min={1}
                max={9999}
                defaultValue='2'
                variant='faded'
                startContent={<IconFileAnalytics  stroke={2} />}
            />

            <Input
                isRequired
                errorMessage="Ingresa una cantidad valida"
                labelPlacement="outside"
                label="Precio del boleto"
                startContent={<IconCurrencyDollar stroke={2} />}
                name="trophy2"
                placeholder="Mínimo permitido"
                type="number"
                min={1}
                defaultValue='2'
                variant='faded'

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
