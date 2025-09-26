"use client";

import React from 'react';
import AiMultiModels from './ai-multi-models';
import ChatInputBox from './chat-input-box';

export default function ChatInterface() {
    return (
        <div
            className='relative'
        >
            <AiMultiModels />
            <ChatInputBox />
        </div>
    )
}

