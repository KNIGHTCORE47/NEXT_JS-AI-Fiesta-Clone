"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import ChatInterface from './_components/chat-interface';

export default function Home() {
  const { setTheme } = useTheme();


  return (
    <div
      className='relative'
    >
      <ChatInterface />
    </div>
  )
}