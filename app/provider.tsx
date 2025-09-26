"use client"

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import AppHeader from "./_components/app-header";



export function Provider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return (
        <NextThemesProvider {...props}>
            <SidebarProvider>
                <AppSidebar />
                <div
                    className="min-h-screen w-full"
                >
                    <AppHeader />
                    {children}
                </div>
            </SidebarProvider>
        </NextThemesProvider>
    )
}