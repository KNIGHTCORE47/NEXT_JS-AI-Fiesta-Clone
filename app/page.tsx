"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

export default function Home() {
  const { setTheme } = useTheme();


  return (
    <div
      className='text-3xl font-bold'
    >
      <h2>
        Hello From Next.js
      </h2>

      <Button
        className='mt-4'
        variant='default'
      >
        submit
      </Button>

      <div
        className='mt-4 w-full max-w-[300px] grid grid-cols-2 gap-x-4'
      >
        <Button
          onClick={() => setTheme('light')}
        >
          Toggle Light
        </Button>

        <Button
          onClick={() => setTheme('dark')}
        >
          Toggle Dark
        </Button>
      </div>

    </div>
  )
}