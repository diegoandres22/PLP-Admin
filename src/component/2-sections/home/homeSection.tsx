"use client"
import React, { useEffect, useState } from 'react';
import { StatusRaffles } from '@/component/3-elements';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Raffle } from '@/types';

export const HomeSection = () => {
  const { raffles, loading, error } = useSelector(
    (state: RootState) => state.Raffles
  );

  const [counts, setCounts] = useState({
    activas: 0,
    agotadas: 0,
    terminadas: 0,
    suspendidas: 0
  });

  const [loadingCounter, setLoadingCounter] = useState(0);

  useEffect(() => {
    if (error) {
      console.log('Error cargando rifas:', error);
    }
  }, [error]);

  useEffect(() => {
    if (!loading && raffles) {
      const newCounts = { activas: 0, agotadas: 0, terminadas: 0, suspendidas: 0 };
      raffles.forEach((r: Raffle) => {
        switch (r.raffle_status) {
          case 1:
            newCounts.activas += 1;
            break;
          case 2:
            newCounts.agotadas += 1;
            break;
          case 3:
            newCounts.terminadas += 1;
            break;
          case 4:
            newCounts.suspendidas += 1;
            break;
        }
      });
      setCounts(newCounts);
    }
  }, [raffles, loading]);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingCounter((prev) => (prev + 1) % 10);
      }, 100); 
      return () => clearInterval(interval);
    }
  }, [loading]);

  return (
    <div className="flex w-full py-4 justify-center sm:justify-between gap-2 flex-wrap">
      <StatusRaffles
        color="text-green-500/90"
        word="Activas"
        number={loading ? loadingCounter : counts.activas}
      />
      <StatusRaffles
        color="text-orange-500/80"
        word="Agotadas"
        number={loading ? loadingCounter : counts.agotadas}
      />
      <StatusRaffles
        color="text-black/60"
        word="Terminadas"
        number={loading ? loadingCounter : counts.terminadas}
      />
      <StatusRaffles
        color="text-red-700"
        word="Suspendidas"
        number={loading ? loadingCounter : counts.suspendidas}
      />
    </div>
  );
};




// import React, { useEffect } from 'react'
// import { StatusRaffles } from '@/component/3-elements'
// import { useSelector } from 'react-redux';
// import { RootState } from '@/store';

// export const HomeSection = () => {

//     const { raffles, loading, error } = useSelector(
//         (state: RootState) => state.Raffles
//     );

//     useEffect(() => {
//     }, [raffles]);
//     return (
//         <div className='flex w-full py-4 justify-center sm:justify-between gap-2 flex-wrap '>
//             <StatusRaffles
//                 color="text-green-500/90"
//                 word="Activas"
//                 number={1}
//             />
//             <StatusRaffles
//                 color="text-orange-500/80"
//                 word="Agotadas"
//                 number={2}
//             />
//             <StatusRaffles
//                 color="text-black/60"
//                 word="Terminadas"
//                 number={4}
//             />
//             <StatusRaffles
//                 color="text-red-700"
//                 word="Suspendidas"
//                 number={0}
//             />
//         </div>
//     )
// }
