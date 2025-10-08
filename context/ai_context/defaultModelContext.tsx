"use client";

import { createContext, Dispatch, SetStateAction } from "react";

import { DefaultModelList } from '@/shared/AiModelList';

// Define the context value interface
interface DefaultModelContextValue {
    aiSelectedModels: DefaultModelList | null;
    setAiSelectedModels: Dispatch<SetStateAction<DefaultModelList | null>>;
}

const DefaultModelContext = createContext<DefaultModelContextValue | null>(null);

export default DefaultModelContext;
export type { DefaultModelContextValue };