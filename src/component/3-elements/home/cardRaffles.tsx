"use client";
import React, { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Progress,
    Badge,
    Tooltip,
} from "@heroui/react";
import { Image } from "@heroui/image";
import {
    IconEye,
    IconEyeOff,
    IconReceiptOff,
} from "@tabler/icons-react";
import { Raffle, TimeLeft } from "@/types";
import { TrophyAnimation } from "../iconsLottie/iconTrophy";
import { TrophyAnimation2 } from "../iconsLottie/iconTrophy2";
import { GifAnimation } from "../iconsLottie/iconGif";

const useCountdown = (lotteryDate: string | undefined) => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        if (!lotteryDate) return;

        const normalizedDate = lotteryDate.replace(/\.\d+$/, "") + "Z";
        const targetDate = new Date(normalizedDate).getTime();
        if (isNaN(targetDate)) return;

        const updateCountdown = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / (1000 * 60)) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            setTimeLeft({ days, hours, minutes, seconds });
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, [lotteryDate]);

    return timeLeft;
};


const getProgressPercentage = (
    totalTickets: number,
    ticketsSoldList: string[]
): number =>
    totalTickets > 0
        ? Math.min(100, Math.max(0, (ticketsSoldList.length / totalTickets) * 100))
        : 0;

// ---------------------- COMPONENTE ----------------------
export const CardRaffles: React.FC<Raffle> = ({
    image,
    title,
    trophy,
    secondPrize,
    additionalPrize,
    total_tickets,
    tickets_sold_list,
    lottery_date,
    ticket_price,
    min_purchase,
    raffle_status,
    state,
    description,
    premium_ticket1,
    premium_ticket2,
    premium_ticket3,
    premium_ticket4,
    premium_ticket5,
    premium_ticket6
}) => {
    const timeLeft = useCountdown(lottery_date);
    const progressPercentage = getProgressPercentage(total_tickets, tickets_sold_list);

    const statusColors: Record<number, 'success' | 'warning' | 'default' | 'danger'> = {
        1: 'success',
        2: 'warning',
        3: 'default',
        4: 'danger'
    };

    return (
        <Badge color={statusColors[raffle_status] || 'default'} content="" variant="solid" >
            <Card className="max-w-[330px] sm:max-w-[370px] min-w-[280px] sm:min-w-[400px] bg-white/30 rounded-xl shadow-lg overflow-hidden">
                <CardHeader className="flex gap-3 items-center min-h-36 ">
                    <Image
                        alt="Imagen de rifa"
                        src={image}
                        width={140}
                        radius="lg"
                        style={{ height: "auto" }}
                    />

                    <div className="flex-1 flex flex-col gap-1">
                        <h2 className="text-xl font-bold ">{title}</h2>
                        <span className="text-md font-semibold text-default-600">{trophy}</span>
                    </div>

                </CardHeader>

                <Divider />

                <CardBody className="flex flex-col gap-3">
                    <p className="text-lg font-bold ">{description}</p>

                    {/* Premios */}
                    <div className="flex flex-wrap  items-center ">
                        <div className="flex items-center ">
                            <TrophyAnimation />
                            <span className="font-semibold">{trophy}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <TrophyAnimation2 />
                            <span className="font-semibold">{secondPrize}</span>
                        </div>
                        <div className="flex items-center pl-8 gap-4">
                            {additionalPrize ? (
                                <>
                                    <GifAnimation />
                                    <span className="font-semibold">{additionalPrize} </span>
                                </>
                            ) : (
                                <IconReceiptOff stroke={1.5} className="text-gray-300 scale-125" />
                            )}
                        </div>
                    </div>

                    {/* Tickets Premium */}
                    <div className="flex gap-2 flex-wrap font-bold items-center">
                        <div className="flex w-full items-center gap-2">

                            <span className="text-3xl">🎫</span>
                            <p className="text-sm font-semibold text-neutral-300">Tickets Premium:</p>
                            {premium_ticket1 || premium_ticket2 || premium_ticket3 || premium_ticket4 || premium_ticket5 || premium_ticket6 ? null : (
                                <span className="text-sm font-semibold text-neutral-800">Ninguno</span>
                            )}
                        </div>
                        <div className="w-full flex justify-evenly ">

                            {[premium_ticket1, premium_ticket2, premium_ticket3, premium_ticket4, premium_ticket5, premium_ticket6].map(
                                (ticket, idx) =>
                                    ticket ? (
                                        <div
                                            key={idx}
                                            className="    px-2 py-1 bg-yellow-300 rounded-md border-l-4 border-l-yellow-500 text-black text-sm font-bold shadow-xl "
                                        >
                                            {ticket}
                                        </div>
                                    ) : null
                            )}
                        </div>
                    </div>

                    {/* Precio y mínimo de compra */}
                    <div className="flex gap-2 items-center justify-between mt-2">
                            <span className="rounded-md border-2 bg-white/80 border-black px-1 text-md font-semibold text-black text-nowrap shadow-xl"> {total_tickets} boletos </span>
                            <span className="rounded-md border-2 bg-white/80 border-black px-1 text-md font-semibold text-black text-nowrap flex gap-1 shadow-xl"> <span className="hidden sm:flex">Compra</span>  Mín: {min_purchase} boletos</span>
                        <Tooltip content="Precio del boleto" placement="top">
                            <h3 className="text-3xl font-bold items-baseline flex text-white">{ticket_price} <span className="text-base">.bs</span> </h3>
                        </Tooltip>
                    </div>
                </CardBody>

                <Divider />

                {/* ------------------ FOOTER ------------------ */}
                <CardFooter className="flex flex-col gap-2">

                    <Progress
                        value={progressPercentage}
                        label={
                            <>
                                Boletos vendidos <span className="text-xs font-semibold text-gray-900">({tickets_sold_list.length})</span>
                            </>
                        }
                        showValueLabel
                        color="success"
                        size="lg"
                    />


                    <span className={`text-base font-bold ${timeLeft.days || timeLeft.hours || timeLeft.minutes || timeLeft.seconds ? 'text-red-700' : 'text-black'}`}>
                        {timeLeft.days || timeLeft.hours || timeLeft.minutes || timeLeft.seconds
                            ? `Termina en ${timeLeft.days}d ${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds} hs`
                            : '¡La rifa ha terminado!'}
                    </span>


                    <span
                        className={`text-md font-bold flex items-center gap-2 ${state ? 'text-neutral-800' : 'text-neutral-700'
                            }`}
                    >
                        {state ? (
                            <>
                                Rifa a la vista <IconEye stroke={2} className="text-green-400" />
                            </>
                        ) : (
                            <>
                                Rifa oculta <IconEyeOff stroke={2} className="text-gray-800" />
                            </>
                        )}
                    </span>
                </CardFooter>
            </Card>
        </Badge>

    );
};
