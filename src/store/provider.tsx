"use client"

import * as React from "react";
import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import { Provider } from "react-redux";
import { store } from "@/store";
import Sidebar from "@/component/2-sections/sideBar/sideBar";


export function ProviderComp({ children }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <HeroUIProvider>
            <Provider store={store}>
                <Sidebar/>
                <ToastProvider placement="bottom-center" />
                {children}
            </Provider>
        </HeroUIProvider>
    );
}