
"use client"
import React from 'react';
import { Form, Input, Button } from '@heroui/react';

export const NewCtaBankSection = () => {

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <Form className="flex w-full max-w-lg gap-8 transition-all duration-300 ease-in-out bg-white/20 p-10 rounded-2xl" onSubmit={onSubmit} >
            <h5 className='text-2xl '>Crear Cuenta de banco </h5>
            <Input
                isRequired
                label="Método de pago"
                labelPlacement="outside"
                name="metodoPago"
                placeholder="Nombre de Referencia"
                type="text"
                variant='faded'
                errorMessage="Ingresa un nombre valido"
            />
            <Input
                isRequired
                label="Nombre titular de la cuenta"
                labelPlacement="outside"
                name="nombreTitular"
                placeholder="Nombre"
                type="text"
                variant='faded'
                errorMessage="Ingresa un nombre valido"
            />
            <Input
                isRequired
                label="Documento necesario para el pago"
                labelPlacement="outside"
                name="documentoPago"
                placeholder="Documento"
                type="number"
                variant='faded'
                min={1}
                errorMessage="Ingresa un documento valido"
            />
            <Input
                isRequired
                label="Número necesario para el pago"
                labelPlacement="outside"
                name="numeroPago"
                placeholder="Número"
                type="number"
                variant='faded'
                min={1}
                errorMessage="Ingresa un número valido"
            />
            
            <Input
                label="Número de cuenta"
                labelPlacement="outside"
                name="numeroCuenta"
                placeholder="Número de cuenta"
                type="number"
                variant='faded'
                min={1}
                errorMessage="Ingresa un número válido"
            />
            <Input
                label="Correo de cuenta"
                labelPlacement="outside"
                name="correoCuenta"
                placeholder="Correo de cuenta"
                type="email"
                variant='faded'
                errorMessage="Ingresa un correo válido"
            />


            <Button type="submit" variant="shadow" color='primary' className='w-full sm:w-80 m-auto text-black font-semibold'>
                Crear Rifa
            </Button>
            
        </Form>
    );
};
