"use client";

import { useMemo, useState, PropsWithChildren } from 'react';
import DefaultModelContext from './defaultModelContext';
import { DefaultModel, DefaultModelList } from '@/shared/AiModelList';
import { MessagesState } from '@/shared/types/messages';


function DefaultModelProvider({ children }: PropsWithChildren) {
    const [aiSelectedModels, setAiSelectedModels] = useState<DefaultModelList | null>(DefaultModel);
    const [messages, setMessages] = useState<MessagesState>({});


    // Memoize the value to avoid unnecessary re-renders
    const contextValue = useMemo(() => ({
        aiSelectedModels,
        setAiSelectedModels,
        messages,
        setMessages
    }), [aiSelectedModels, messages]);

    return (
        <DefaultModelContext.Provider value={contextValue}>
            {children}
        </DefaultModelContext.Provider>
    );
}

export default DefaultModelProvider