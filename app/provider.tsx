"use client"

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import AppHeader from "./_components/app-header";
import { useUser } from "@clerk/nextjs";
import { RegisterUserAccountToDB, UserDataINF } from "@/database/services";
import { ClerkUser } from '@/database/services';
import DefaultModelProvider from "@/context/ai_context/defaultModelProvider";
import { useDefaultModel } from "@/context/ai_context/useDefaultModel";
import UserDetailProvider from '@/context/user_context/userDetailProvider';
import { useUserDetail } from '@/context/user_context/useUserDetail';


// Inner component that can use the context
function UserInitializer({ children }: { children: React.ReactNode }) {
    const { user } = useUser();
    const { setAiSelectedModels } = useDefaultModel();
    const { setUserDetail } = useUserDetail();
    const [isInitialized, setIsInitialized] = React.useState(false);

    React.useEffect(() => {
        if (!user || isInitialized) {
            return;
        }

        async function initializeUser(user: ClerkUser) {
            try {
                const result = await RegisterUserAccountToDB(user);

                // Store user details in context
                setUserDetail(result.userData as UserDataINF);

                // If user exists and has preferences, load them
                if (!result.isNewUser && result.userData.selectedModelPref) {
                    setAiSelectedModels(result.userData.selectedModelPref);
                    console.log("Loaded user preferences:", result.userData.selectedModelPref);
                } else {
                    console.log("Using default model preferences");
                }

                setIsInitialized(true);

            } catch (error: unknown) {
                console.error("Error initializing user:", error);

                if (error instanceof Error) {
                    throw new Error(error.message);
                } else {
                    throw new Error("Unknown error");
                }
            }
        }

        initializeUser(user);
    }, [user, setAiSelectedModels, setUserDetail, isInitialized]);

    return <>{children}</>;
}


export function Provider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return (
        <NextThemesProvider
            {...props}
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <UserDetailProvider>
                <DefaultModelProvider>
                    <UserInitializer>
                        <SidebarProvider>
                            <AppSidebar />
                            <div className="min-h-screen w-full">
                                <AppHeader />
                                {children}
                            </div>
                        </SidebarProvider>
                    </UserInitializer>
                </DefaultModelProvider>
            </UserDetailProvider>
        </NextThemesProvider>
    );
}