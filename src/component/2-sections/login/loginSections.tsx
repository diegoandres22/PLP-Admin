"use client"
import { Button, Form, Input } from '@heroui/react'
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import React from 'react'

export const LoginSections = () => {

    const [isVisible, setIsVisible] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const errors: string[] = [];
    const toggleVisibility = () => setIsVisible(!isVisible);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    };
    if (password.length < 4) {
        errors.push("Contraseña debe tener al menos 4 caracteres");
    }
    if ((password.match(/[A-Z]/g) || []).length < 1) {
        errors.push("Contraseña debe incluir al menos 1 letra mayúscula");
    }
    if ((password.match(/[^a-z0-9]/gi) || []).length < 1) {
        errors.push("Contraseña debe incluir al menos 1 símbolo.");
    }
    return (
        <Form className="bg-white/50 w-80 sm:w-96 h-auto rounded-2xl flex flex-col p-4 gap-4" onSubmit={onSubmit}>
            <h1 className='text-4xl font-extrabold text-black/70 mb-8'>Ingresar</h1>
            <Input label="Usuario" type="text" variant="faded" isRequired
                errorMessage={<p className='font-bold '>Por favor ingresa un usuario válido</p>} />
            <Input
                isRequired
                variant="faded"
                errorMessage={() => (
                    <ul>
                        {errors.map((error, i) => (
                            <li className='font-bold' key={i}>{error}</li>
                        ))}
                    </ul>
                )}
                endContent={
                    <button
                        aria-label="Ingresa la contraseña"
                        className="focus:outline-solid outline-transparent"
                        type="button"
                        onClick={toggleVisibility}
                    >
                        {isVisible ? (
                            <IconEyeOff stroke={2} className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                            <IconEye className="text-2xl text-default-400 pointer-events-none" />
                        )}
                    </button>
                }
                label="Contraseña"
                type={isVisible ? "text" : "password"}
                onValueChange={setPassword}
            />
            <Button color="primary" type="submit" className="text-black/80 font-extrabold w-full">
                Ingresar
            </Button>
        </Form>
    )
}
