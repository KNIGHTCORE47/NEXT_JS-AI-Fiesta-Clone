"use client";

import { useUser } from '@clerk/nextjs';
import React from 'react'

export default function SidebarGroupComponent() {

    const authUser = useUser();

    return (
        <div className='p-2 space-y-2'>
            <h2 className='text-xl font-bold'>Chat</h2>
            {
                !authUser.isSignedIn && (
                    <p className='text-muted-foreground'>
                        Sign in to chat with AI, we offer a wide range of LLM models to choose from.
                    </p>
                )
            }
        </div>
    )
}
