"use client";

import * as React from "react";
import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import { Provider } from "react-redux";
import { store } from "@/store";
import { SessionProvider } from "next-auth/react";

export function ProviderComp({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <SessionProvider>
        <Provider store={store}>
          <ToastProvider placement="bottom-center" />
          {children}
        </Provider>
      </SessionProvider>
    </HeroUIProvider>
  );
}
