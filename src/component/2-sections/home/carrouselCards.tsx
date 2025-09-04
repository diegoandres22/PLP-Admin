"use client";
import React, { useEffect } from "react";
import { CardRaffles } from "@/component/3-elements";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Skeleton } from "@heroui/react"; // Skeleton de Heroui

export const CarrouselCards = () => {
  const { raffles, loading, error } = useSelector(
    (state: RootState) => state.Raffles
  );

  useEffect(() => {
  }, [raffles]);

  const skeletons = Array(4).fill(0);

  return (
    <div className="flex w-full h-auto py-10 sm:py-6 gap-4 flex-wrap justify-center">
      {error && (
        <div className="w-full text-center text-red-600 font-bold mb-4">
          {error}
        </div>
      )}

      {loading && !raffles.length
        ? skeletons.map((_, idx) => (
            <div key={idx} className="max-w-[350px] min-w-[280px] sm:min-w-[400px]">
              <Skeleton className="w-full h-[400px] rounded-xl" />
            </div>
          ))
        : raffles.map((raffle, index) => <CardRaffles {...raffle} key={index} />)}
    </div>
  );
};
