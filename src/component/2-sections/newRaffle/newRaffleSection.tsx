"use client";
import React, { useState } from "react";
import {
    Form,
    Input,
    Button,
    Switch,
    InputOtp,
    SelectItem,
    Select,
    DatePicker,
} from "@heroui/react";
import {
    IconCircleCheck,
    IconCurrencyDollar,
    IconFileAnalytics,
    IconGift,
    IconPhotoScan,
    IconPlayerPause,
    IconReceiptDollar,
    IconReceiptOff,
    IconTicket,
    IconTicketOff,
} from "@tabler/icons-react";
import { now, CalendarDateTime } from "@internationalized/date";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { createRaffle } from "@/store/slices/rafflesSlice";

export const NewRaffleSection = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.Raffles);

    const [enabledTickets, setEnabledTickets] = useState(false);
    const [enabledVolPurchase, setEnabledVolPurchase] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const today = now("UTC");
    const minValue = new CalendarDateTime(
        today.year,
        today.month,
        today.day + 1,
        20,
        0,
        0
    );

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(1, Math.min(6, parseInt(e.target.value) || 1));
        setQuantity(value);
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // mapear nombres al formato de Swagger
    data.set("title", data.get("name") as string);
    data.set("description", data.get("description") as string);
    data.set("ticket_price", data.get("ticket_price") as string);
    data.set("min_purchase", data.get("min_purchase") as string);

    // Antes raffle_status se enviaba fijo en "1" sin importar lo que el
    // admin eligiera en el Select (Activa/Oculto): ahora se respeta.
    const selectedStatus = form.querySelector<HTMLSelectElement>('select[name="raffle_status"]')?.value;
    data.set("raffle_status", selectedStatus ?? "1");
    data.set("state", selectedStatus === "1" ? "true" : "false");

    data.set("trophy", data.get("trophy1") as string);
    data.set("secondPrize", data.get("trophy2") as string);
    data.set("additionalPrize", data.get("trophy3") as string || "");
    data.set("total_tickets", data.get("total_tickets") as string);
    data.set("lottery_date", data.get("lottery_date") as string);
    // created_by ya no se envía desde el cliente: la API lo toma del admin
    // autenticado (JWT) al crear la rifa.

    // archivo
    const file = (data.get("imgTrophy1") as File) || null;
    if (file) data.set("file", file);

    // enviar a Redux
    const result = await dispatch(createRaffle(data));

    // Antes se limpiaba el formulario pasara lo que pasara: si la API
    // fallaba, el admin perdía todo lo que había escrito. Ahora solo se
    // limpia si la creación fue exitosa.
    if (createRaffle.fulfilled.match(result)) {
        form.reset();
        setEnabledTickets(false);
        setEnabledVolPurchase(false);
        setQuantity(1);
    }
};


    return (
        <Form
            className="flex w-full max-w-lg gap-8 transition-all duration-300 ease-in-out bg-white/20 p-10 rounded-2xl"
            onSubmit={onSubmit}
        >
            <Input
                isRequired
                label="Nombre de la rifa"
                name="name"
                placeholder="Nombre"
                type="text"
                variant="faded"
            />
            <Input
                isRequired
                label="Descripción de la rifa"
                name="description"
                placeholder="Descripción"
                type="text"
                variant="faded"
            />
            <Select
                isRequired
                name="raffle_status"
                defaultSelectedKeys={["1"]}
                label="Estatus de la rifa"
                placeholder="Selecciona un estatus"
            >
                <SelectItem key="1" startContent={<IconCircleCheck stroke={2} className="text-green-500" />}>
                    Activa
                </SelectItem>
                <SelectItem key="2" startContent={<IconPlayerPause stroke={2} className="text-yellow-500" />}>
                    Oculto
                </SelectItem>
            </Select>

            <Input
                isRequired
                label="Premio 1"
                name="trophy1"
                placeholder="Premio principal"
                type="text"
                variant="faded"
                startContent={<IconGift stroke={2} />}
            />
            <Input
                isRequired
                label="Imagen del premio 1"
                name="imgTrophy1"
                type="file"
                variant="faded"
                startContent={<IconPhotoScan stroke={2} />}
            />
            <Input
                label="Premio 2 (opcional)"
                name="trophy2"
                placeholder="Premio secundario"
                type="text"
                variant="faded"
                startContent={<IconGift stroke={2} />}
            />

            {/* Switch boletos premium */}
            <Switch
                color="warning"
                size="lg"
                checked={enabledTickets}
                onChange={() => setEnabledTickets(!enabledTickets)}
                startContent={<IconTicket stroke={2} />}
                endContent={<IconTicketOff stroke={2} />}
            >
                Boletos premiados
            </Switch>
            {enabledTickets && (
                <>
                    <Input
                        type="number"
                        label="Cantidad de boletos premium"
                        value={quantity.toString()}
                        min={1}
                        max={6}
                        onChange={handleQuantityChange}
                        variant="faded"
                    />
                    {Array.from({ length: quantity }).map((_, i) => (
                        <div key={i} className="flex items-center gap-2">
                            {`Número del boleto ${i + 1}:`}
                            <InputOtp
                                required
                                length={4}
                                name={`premium_ticket${i + 1}`}
                                variant="faded"
                            />
                        </div>
                    ))}
                </>
            )}

            {/* Switch premio volumen */}
            <Switch
                color="warning"
                size="lg"
                checked={enabledVolPurchase}
                onChange={() => setEnabledVolPurchase(!enabledVolPurchase)}
                startContent={<IconReceiptDollar stroke={2} />}
                endContent={<IconReceiptOff stroke={2} />}
            >
                Premio por más compras
            </Switch>
            {enabledVolPurchase && (
                <Input
                    type="text"
                    name="trophy3"
                    label="Premio adicional"
                    variant="faded"
                    placeholder="Describe brevemente el premio"
                    startContent={<IconGift stroke={2} />}
                />
            )}

            <DatePicker isRequired name="lottery_date" label="Fecha de sorteo" minValue={minValue} />

            <Input
                isRequired
                label="Cantidad de boletos a rifar"
                name="total_tickets"
                type="number"
                min={1}
                defaultValue="100"
                variant="faded"
                startContent={<IconTicket stroke={2} />}
            />
            <Input
                isRequired
                label="Cantidad mínima a comprar"
                name="min_purchase"
                type="number"
                defaultValue="2"
                variant="faded"
                min={1}
                startContent={<IconFileAnalytics stroke={2} />}
            />
            <Input
                isRequired
                label="Precio del boleto"
                name="ticket_price"
                type="number"
                defaultValue="2"
                variant="faded"
                min={1}
                startContent={<IconCurrencyDollar stroke={2} />}
            />

            <Button
                type="submit"
                variant="shadow"
                color="primary"
                className="w-80 m-auto text-black font-semibold"
                isLoading={loading}
            >
                Crear Rifa
            </Button>
            {error && <p className="text-red-500">{error}</p>}
        </Form>
    );
};
