"use client";

import { useContext } from 'react';
import DefaultModelContext, { DefaultModelContextValue } from './defaultModelContext';

export function useDefaultModel(): DefaultModelContextValue {
    const context = useContext(DefaultModelContext);

    if (!context) {
        throw new Error('useDefaultModel must be used within a DefaultModelProvider');
    }

    return context;
}