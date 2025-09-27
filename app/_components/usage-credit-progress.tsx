"use client";

import React from 'react';
import { Progress } from "@/components/ui/progress";

export default function UsageCreditProgress() {
    return (
        <div
            className='p-2 bg-sidebar-accent text-sidebar-accent-foreground rounded-md'
        >
            <h2 className='font-semibold'>
                {/* static [Todo}*/}
                Free Plan
            </h2>

            <p className='text-muted-foreground mb-2'>
                1/5 messages used
            </p>

            <Progress value={33} />
        </div>
    )
}
