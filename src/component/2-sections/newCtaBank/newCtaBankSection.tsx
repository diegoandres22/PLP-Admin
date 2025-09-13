"use client"
import React, { useState } from 'react';
import { Form, Input, Button, addToast } from '@heroui/react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { createBankAccount } from '@/store/services/bankAcountsService';

export const NewCtaBankSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    pay_method: "",
    holder_name_cta: "",
    document_name: "",
    number_cta_1: "",
    number_cta_2: "",
    email_cta: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Validaciones
      if (formData.pay_method.length > 200 || formData.holder_name_cta.length > 200) {
        throw new Error("Los campos de texto no pueden superar los 200 caracteres");
      }
      if (formData.number_cta_2.length > 200) {
        throw new Error("Número de cuenta 2 no puede superar los 200 caracteres");
      }
      if (formData.email_cta && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_cta)) {
        throw new Error("Correo inválido");
      }

      // Preparar datos numéricos
      const payload = {
        pay_method: formData.pay_method,
        holder_name_cta: formData.holder_name_cta || undefined,
        document_name: formData.document_name ? Number(formData.document_name) : undefined,
        number_cta_1: formData.number_cta_1 ? Number(formData.number_cta_1) : undefined,
        number_cta_2: formData.number_cta_2 || undefined,
        email_cta: formData.email_cta || undefined,
      };

      await dispatch(createBankAccount(payload));

      addToast({
        title: "Cuenta creada",
        description: "La cuenta de banco se creó correctamente",
        color: "success",
        timeout: 3000
      });

      // Limpiar formulario
      setFormData({
        pay_method: "",
        holder_name_cta: "",
        document_name: "",
        number_cta_1: "",
        number_cta_2: "",
        email_cta: "",
      });

    } catch (error) {
      addToast({
        title: "Error",
        description: (error as Error).message,
        color: "danger",
        timeout: 3000
      });
    }
  };

  return (
    <Form className="flex w-full max-w-lg gap-8 transition-all duration-300 ease-in-out bg-white/20 p-10 rounded-2xl" onSubmit={onSubmit}>
      <h5 className='text-2xl '>Crear Cuenta de banco</h5>

      <Input
        isRequired
        label="Método de pago"
        labelPlacement="outside"
        name="pay_method"
        placeholder="Nombre de Referencia"
        type="text"
        variant='faded'
        value={formData.pay_method}
        onChange={handleChange}
        errorMessage="Ingresa un nombre valido"
      />

      <Input
        label="Nombre titular de la cuenta"
        labelPlacement="outside"
        name="holder_name_cta"
        placeholder="Nombre"
        type="text"
        variant='faded'
        value={formData.holder_name_cta}
        onChange={handleChange}
        errorMessage="Ingresa un nombre valido"
      />

      <Input
        label="Documento necesario para el pago"
        labelPlacement="outside"
        name="document_name"
        placeholder="Documento"
        type="number"
        variant='faded'
        min={1}
        value={formData.document_name}
        onChange={handleChange}
        errorMessage="Ingresa un documento valido"
      />

      <Input
        label="Número necesario para el pago"
        labelPlacement="outside"
        name="number_cta_1"
        placeholder="Número"
        type="number"
        variant='faded'
        min={1}
        value={formData.number_cta_1}
        onChange={handleChange}
        errorMessage="Ingresa un número valido"
      />

      <Input
        label="Número de cuenta 2 (opcional)"
        labelPlacement="outside"
        name="number_cta_2"
        placeholder="Número de cuenta 2"
        type="text"
        variant='faded'
        value={formData.number_cta_2}
        onChange={handleChange}
        errorMessage="Número de cuenta inválido"
      />

      <Input
        label="Correo de cuenta"
        labelPlacement="outside"
        name="email_cta"
        placeholder="Correo de cuenta"
        type="email"
        variant='faded'
        value={formData.email_cta}
        onChange={handleChange}
        errorMessage="Ingresa un correo válido"
      />

      <Button type="submit" variant="shadow" color='primary' className='w-full sm:w-80 m-auto text-black font-semibold'>
        Crear Cuenta
      </Button>
    </Form>
  );
};


// "use client"
// import React from 'react';
// import { Form, Input, Button } from '@heroui/react';

// export const NewCtaBankSection = () => {

//     const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//     };

//     return (
//         <Form className="flex w-full max-w-lg gap-8 transition-all duration-300 ease-in-out bg-white/20 p-10 rounded-2xl" onSubmit={onSubmit} >
//             <h5 className='text-2xl '>Crear Cuenta de banco </h5>
//             <Input
//                 isRequired
//                 label="Método de pago"
//                 labelPlacement="outside"
//                 name="metodoPago"
//                 placeholder="Nombre de Referencia"
//                 type="text"
//                 variant='faded'
//                 errorMessage="Ingresa un nombre valido"
//             />
//             <Input
//                 isRequired
//                 label="Nombre titular de la cuenta"
//                 labelPlacement="outside"
//                 name="nombreTitular"
//                 placeholder="Nombre"
//                 type="text"
//                 variant='faded'
//                 errorMessage="Ingresa un nombre valido"
//             />
//             <Input
//                 isRequired
//                 label="Documento necesario para el pago"
//                 labelPlacement="outside"
//                 name="documentoPago"
//                 placeholder="Documento"
//                 type="number"
//                 variant='faded'
//                 min={1}
//                 errorMessage="Ingresa un documento valido"
//             />
//             <Input
//                 isRequired
//                 label="Número necesario para el pago"
//                 labelPlacement="outside"
//                 name="numeroPago"
//                 placeholder="Número"
//                 type="number"
//                 variant='faded'
//                 min={1}
//                 errorMessage="Ingresa un número valido"
//             />
            
//             <Input
//                 label="Número de cuenta"
//                 labelPlacement="outside"
//                 name="numeroCuenta"
//                 placeholder="Número de cuenta"
//                 type="number"
//                 variant='faded'
//                 min={1}
//                 errorMessage="Ingresa un número válido"
//             />
//             <Input
//                 label="Correo de cuenta"
//                 labelPlacement="outside"
//                 name="correoCuenta"
//                 placeholder="Correo de cuenta"
//                 type="email"
//                 variant='faded'
//                 errorMessage="Ingresa un correo válido"
//             />


//             <Button type="submit" variant="shadow" color='primary' className='w-full sm:w-80 m-auto text-black font-semibold'>
//                 Crear Rifa
//             </Button>
            
//         </Form>
//     );
// };
