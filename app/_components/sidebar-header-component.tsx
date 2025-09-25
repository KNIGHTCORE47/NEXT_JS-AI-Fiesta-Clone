"use client";

import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import React from 'react'

export default function SidebarHeaderComponent() {
    const { theme, setTheme } = useTheme();

    return (
        <div className='p-2 space-y-2'>
            <div
                className='p-2 bg-sidebar-accent text-sidebar-accent-foreground rounded-md flex items-center justify-between'
            >
                <div
                    className='flex items-center gap-x-3'
                >
                    <Image
                        src="/logo.svg"
                        alt="logo"
                        width={60}
                        height={60}
                        className='h-[40px] w-[40px]'
                    />

                    <h1
                        className='text-xl font-bold'
                    >
                        AI Fiesta
                    </h1>
                </div>

                <div>
                    {theme === "light" ? (
                        <Button
                            variant='outline'
                            className='dark:bg-zinc-600'
                            onClick={() => setTheme("dark")}
                        >
                            <Sun className='h-4 w-4' />
                        </Button>
                    ) : (
                        <Button
                            variant='outline'
                            className='dark:bg-zinc-600'
                            onClick={() => setTheme("light")}
                        >
                            <Moon className='h-4 w-4' />
                        </Button>
                    )}
                </div>
            </div>

            <Button
                variant='default'
                size='lg'
                className='mt-2 w-full'
            >
                + New Chat
            </Button>
        </div>
    )
}
