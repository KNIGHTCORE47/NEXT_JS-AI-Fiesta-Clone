"use client"

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";



export function Provider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return (
        <NextThemesProvider {...props}>
            <SidebarProvider>
                <AppSidebar />
                <SidebarTrigger />
                {children}
            </SidebarProvider>
        </NextThemesProvider>
    )
}