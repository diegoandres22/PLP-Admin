"use client"

import * as React from "react";
import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import { Provider } from "react-redux";
import { store } from "@/store";
import { MiniBar, Sidebar } from "@/component/2-sections";
import { usePathname } from "next/navigation";


export function ProviderComp({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname()

    return (
        <HeroUIProvider>
            <Provider store={store}>
                {pathname !== "/" && (
                    <>
                        <Sidebar />
                        <MiniBar />
                    </>
                )}
                <ToastProvider placement="bottom-center" />
                {children}
            </Provider>
        </HeroUIProvider>
    );
}