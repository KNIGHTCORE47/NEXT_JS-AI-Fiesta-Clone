"use client";

import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react'

export default function AppHeader() {
    return (
        <div
            className='p-4 w-full flex items-center justify-between shadow-md dark:shadow-secondary-foreground/20'
        >
            <SidebarTrigger />

            <Button
                variant='default'
            >
                Sign-In
            </Button>
        </div>
    )
}

