
import React, { useEffect, useState } from 'react'
import { Spinner, Tooltip } from '@heroui/react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { fetchRateBcvData } from '@/store/services/rateBcvService'


export const RateBcv = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const rateBcv = useSelector((state: RootState) => state.RateBcv.price)


    useEffect(() => {
        dispatch(fetchRateBcvData());
        if (rateBcv) {
            setIsLoading(false);
        }
    }, [dispatch, rateBcv]);




    return (
        <div className='w-full absolute flex justify-end '>
            <Tooltip content="Tasa Banco Central de Venezuela" showArrow={true} >
                <div className='bg-foreground-300 w-auto h-auto items-center flex p-1 text-sm'>

                    Tasa Bcv :
                    {isLoading ? <Spinner variant="wave" className='mx-2' size='sm' />
                        : <div className='mx-1 font-bold text-base'>{rateBcv}</div>
                    }
                    
                    bs
                </div>
            </Tooltip>
        </div>
    )
}
