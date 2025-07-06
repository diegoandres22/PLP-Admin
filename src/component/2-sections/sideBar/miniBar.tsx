import { AppDispatch, RootState } from '@/store';
import { fetchRateBcvData } from '@/store/services/rateBcvService';
import { IconTicket } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export const MiniBar = () => {
    const dispatch = useDispatch<AppDispatch>();

    const pathname = usePathname();
    const segment = pathname.split('/')[1];
    const rateBcv = useSelector((state: RootState) => state.RateBcv.price)

    useEffect(() => {
        dispatch(fetchRateBcvData());

    }, [dispatch, rateBcv]);


    return (
        <div className='flex w-full h-auto sm:h-24 pl-4 sm:pl-52 sm:py-4 pr-4 flex-col gap-2'>
            <div className="flex bg-gray-800 w-full h-full rounded-xl p-4 justify-evenly sm:justify-between items-center">
                <h4 className='text-lg'>
                    👋 Jefferson Quezada
                </h4>
                <h3 className='text-2xl font-semibold uppercase' >
                    {segment}
                </h3>

                <div className="hidden sm:flex gap-2 ">
                    <div className="flex items-center">
                        <IconTicket stroke={2} className='text-green-500' />
                        <strong>2</strong>
                    </div>
                    <div className="flex items-center">
                        <IconTicket stroke={2} className='text-orange-500' />
                        <strong>1</strong>
                    </div>
                    <p className='font-semibold text-sm p-1 flex items-center'>$: {rateBcv} <p className='text-xs ml-1 font-light'>bs</p></p>
                </div>
            </div>
            <div className="flex sm:hidden gap-2 bg-gray-800 w-full h-full rounded-xl p-4 justify-evenly items-center">
                <div className="flex items-center">
                    <IconTicket stroke={2} className='text-green-500' />
                    <strong>2</strong>
                </div>
                <div className="flex items-center">
                    <IconTicket stroke={2} className='text-orange-500' />
                    <strong>1</strong>
                </div>
                <p className='font-semibold text-sm p-1 flex items-center'>$: {rateBcv} <p className='text-xs ml-1 font-light'>bs</p></p>
            </div>
        </div>
    )
}
