"use client";

import { createContext, Dispatch, SetStateAction } from "react";
import { MessagesState } from '@/shared/types/messages';
import { DefaultModelList } from '@/shared/AiModelList';

// Define the context value interface
interface DefaultModelContextValue {
    aiSelectedModels: DefaultModelList | null;
    setAiSelectedModels: Dispatch<SetStateAction<DefaultModelList | null>>;
    messages: MessagesState;
    setMessages: Dispatch<SetStateAction<MessagesState>>;
}

const DefaultModelContext = createContext<DefaultModelContextValue | null>(null);

export default DefaultModelContext;
export type { DefaultModelContextValue };