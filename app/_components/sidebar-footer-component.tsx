"use client";

import { Button } from '@/components/ui/button';
import React from 'react';
import {
    SignInButton,
    useUser
} from '@clerk/nextjs';
import { User, Zap } from 'lucide-react';
import UsageCreditProgress from './usage-credit-progress';

export default function SidebarFooterComponent() {

    const authUser = useUser();

    return (
        <div className='mb-12 p-2'>


            {
                authUser.isLoaded && authUser.isSignedIn ? (

                    <div
                        className='p-2 space-y-3'
                    >
                        <UsageCreditProgress />

                        <Button
                            className='w-full'
                        >
                            <Zap className='w-4 h-4 mr-2' /> Upgrade to Pro
                        </Button>

                        <Button
                            variant={"ghost"}
                            className='m-auto flex items-center justify-center dark:hover:bg-gray-700'
                        >
                            <User className='w-4 h-4 mr-2' /> {authUser.user.fullName}
                        </Button>
                    </div>
                ) : (
                    <SignInButton
                        mode="modal"
                    >
                        <Button className='w-full'>
                            Sign-In/Sign-Up
                        </Button>
                    </SignInButton>
                )
            }
        </div>
    )
}
