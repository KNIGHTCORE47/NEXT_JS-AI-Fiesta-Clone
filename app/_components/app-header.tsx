"use client";

import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
    SignInButton,
    SignOutButton,
    useUser
} from '@clerk/nextjs';
import React from 'react';


export default function AppHeader() {
    const authUser = useUser();


    return (
        <div
            className='p-4 w-full flex items-center justify-between shadow-md dark:shadow-secondary-foreground/20'
        >
            <SidebarTrigger />

            {
                authUser.isLoaded && authUser.isSignedIn ? (
                    <SignOutButton
                        redirectUrl='/'
                    >
                        <Button variant={"default"}>
                            Sign-Out
                        </Button>
                    </SignOutButton>
                ) : (
                    <SignInButton
                        mode="modal"
                    >
                        <Button variant={"default"}>
                            Sign-In/Sign-Up
                        </Button>
                    </SignInButton>
                )
            }
        </div>
    )
}

