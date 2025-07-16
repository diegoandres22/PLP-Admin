import React from 'react'

interface StatusRafflesProps {
    color: string; // Color para el div
    word: string;  // Palabra del primer `strong`
    number: number; // Número del segundo `strong`
}
const boleto = <svg xmlns="http://www.w3.org/2000/svg" width={100} height={100} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-ticket"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 5l0 2" /><path d="M15 11l0 2" /><path d="M15 17l0 2" /><path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2" /></svg>


export const StatusRaffles: React.FC<StatusRafflesProps> = ({ color, word, number }) => {
    return (
        <div className={`w-72 h-36 p-4 flex bg-white/20 rounded-xl items-center justify-evenly shadow-2xl m-auto`}>
            <div className={`${color} `}>
                {boleto}
            </div>
            <div className="flex flex-col items-center">
                <strong className='text-2xl'>
                    {word}
                </strong>
                <strong className='text-2xl'>
                    {number}
                </strong>
            </div>
        </div>
    )
}

