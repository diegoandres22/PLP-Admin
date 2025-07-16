"use client"
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, Divider, CardBody, CardFooter, Progress, Badge } from '@heroui/react';
import { Image } from "@heroui/image";
import { IconReceiptDollar, IconReceiptOff, IconRosetteNumber1, IconRosetteNumber2, IconTicket, IconTicketOff } from '@tabler/icons-react';
import { Raffle } from '@/types';


export const CardRaffles: React.FC<Raffle> = ({
    countdownTime, ticketPrice, title, image, raffleDetails, progressPercentage, ticketsAcountPremium
}) => {
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const [hours, minutes, seconds] = countdownTime.split(':').map(Number);
        setTimeLeft({ hours, minutes, seconds });

        const interval = setInterval(() => {
            setTimeLeft(prevTime => {
                let { hours, minutes, seconds } = prevTime;
                if (seconds > 0) {
                    seconds -= 1;
                } else {
                    if (minutes > 0) {
                        minutes -= 1;
                        seconds = 59;
                    } else {
                        if (hours > 0) {
                            hours -= 1;
                            minutes = 59;
                            seconds = 59;
                        } else {
                            clearInterval(interval); // Detener el contador cuando llegue a 0
                        }
                    }
                }
                return { hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
    }, [countdownTime]);

    return (
        <Card className="max-w-[400px] min-w-96 bg-white/40">
            <CardHeader className="flex gap-3">
                <Image
                    alt="Imagen de rifa"
                    height={70}
                    radius="lg"
                    src={image}
                    width={80}
                />
                <div className="flex flex-col">
                    <p className="text-lg font-semibold">{title}</p>  {/* Título pasado por props */}
                    <p className="text-md font-semibold text-default-600">{raffleDetails.trophy}</p>  {/* Subtítulo pasado por props */}
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <div className="flex gap-6 flex-nowrap justify-between items-center">

                    <div className="flex gap-4 text-yellow-400">
                        <IconRosetteNumber1 stroke={2} className='bg-yellow-400 text-black rounded-full scale-150' />



                        {raffleDetails.secondPrizeText.length > 1 ? (
                            <IconRosetteNumber2 stroke={2} className='bg-gray-300 text-black rounded-full scale-150' />
                        ) : (
                            <div className="relative">
                                <IconRosetteNumber2 stroke={2} className="bg-gray-300 text-black rounded-full scale-150" />
                                <span className="absolute -top-1 right-0 text-red-500 font-bold text-4xl">X</span>
                            </div>
                        )}


                        {ticketsAcountPremium < 1 ? (
                            <IconTicketOff stroke={2} className="scale-150 text-gray-200" />
                        ) : (<Badge color="default" content={ticketsAcountPremium} shape="circle" placement="top-left" variant="solid">
                            <IconTicket stroke={2} className="scale-150" />
                        </Badge>
                        )}
                        {ticketsAcountPremium < 1 ? (
                            <IconReceiptOff stroke={1.5} className='scale-150 text-gray-200' />
                        ) : (
                            <Badge color="default" size='sm' content={`${raffleDetails.additionalPrizeNum}$`} shape="circle" placement="top-right" variant="solid" className='scale-80' >
                                <IconReceiptDollar stroke={1.5} className='scale-150 ' />
                            </Badge>
                        )}

                    </div>
                    <h3 className='text-xl font-semibold border-1 px-1 rounded-md border-black'>
                        <strong>{ticketPrice}</strong> bs  {/* Precio pasado por props */}
                    </h3>
                </div>
            </CardBody>
            <Divider />
            <CardFooter className='flex flex-col gap-1'>
                <Progress
                    classNames={{
                        base: "max-w-md",
                        label: "tracking-wider font-medium text-default-700",
                        value: "text-foreground",
                    }}
                    label="Boletos vendidos"
                    aria-label="progreso"
                    className="max-w-md"
                    color="success"
                    showValueLabel={true}
                    size="lg"
                    value={progressPercentage}
                />
                <h4 className='text-sm text-red-700 font-bold'>
                    {`Termina en ${timeLeft.hours.toString().padStart(2, '0')}:${timeLeft.minutes.toString().padStart(2, '0')}:${timeLeft.seconds.toString().padStart(2, '0')} hs`}
                </h4>
            </CardFooter>
        </Card>
    );
};
