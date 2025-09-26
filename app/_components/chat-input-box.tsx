"use client";

import { Button } from '@/components/ui/button';
import { Mic, Paperclip, Send } from 'lucide-react';
import React from 'react'

export default function ChatInputBox() {
    return (
        <>
            {/* Note - Fixed chat input box */}
            <div
                className='fixed bottom-4 left-0 w-full flex justify-center'
            >
                <div
                    className='w-full max-w-2xl bg-gray-200 dark:bg-gray-800 border rounded-xl shadow dark:shadow-secondary-foreground/20 p-4'
                >
                    <input
                        type="text"
                        placeholder='Ask anything...'
                        className='border-none outline-none w-full text-black dark:text-white bg-transparent'
                    />
                    <div
                        className='mt-4 flex justify-between items-center'
                    >
                        <Button
                            size={"icon"}
                            className='bg-gray-600 hover:bg-gray-500'
                        >
                            <Paperclip
                                className='w-4 h-4 text-white'
                            />
                        </Button>

                        <div
                            className='space-x-2'
                        >
                            <Button
                                size={"icon"}
                                className='bg-gray-600 hover:bg-gray-500'
                            >
                                <Mic
                                    className='w-4 h-4 text-white'
                                />
                            </Button>

                            <Button
                                size={"icon"}
                                className='bg-green-600 hover:bg-green-400'
                            >
                                <Send
                                    className='w-4 h-4'
                                />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
