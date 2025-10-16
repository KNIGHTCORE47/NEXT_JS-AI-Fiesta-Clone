// Individual message structure
export interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
    loading?: boolean; // Has the message been loaded from the database?
    model?: string; // Which AI model was used
}

// Messages organized by conversation/model
// Key is the model name (e.g., "GPT", "Gemini")
export interface MessagesState {
    [modelName: string]: Message[];
}

// Alternative: If you want more structure per model
export interface ConversationMessages {
    modelName: string;
    messages: Message[];
    lastUpdated: Date;
    conversationId?: string;
}

export interface MessagesStateDetailed {
    [modelName: string]: ConversationMessages;
}

// Type guards for validation
export function isMessage(obj: any): obj is Message {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        typeof obj.id === 'string' &&
        typeof obj.content === 'string' &&
        ['user', 'assistant', 'system'].includes(obj.role)
    );
}

export function isMessagesState(obj: any): obj is MessagesState {
    if (typeof obj !== 'object' || obj === null) return false;
    return Object.values(obj).every(val => Array.isArray(val));
}