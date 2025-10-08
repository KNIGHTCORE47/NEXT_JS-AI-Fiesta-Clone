"use client";

import { useMemo, useState, PropsWithChildren } from 'react';
import DefaultModelContext from './defaultModelContext';
import { DefaultModel, DefaultModelList } from '@/shared/AiModelList';

function DefaultModelProvider({ children }: PropsWithChildren) {
    const [aiSelectedModels, setAiSelectedModels] = useState<DefaultModelList | null>(DefaultModel);


    // Memoize the value to avoid unnecessary re-renders
    const contextValue = useMemo(() => ({
        aiSelectedModels,
        setAiSelectedModels
    }), [aiSelectedModels]);

    return (
        <DefaultModelContext.Provider value={contextValue}>
            {children}
        </DefaultModelContext.Provider>
    );
}

export default DefaultModelProvider