"use client";

import { Button } from '@/components/ui/button';
import { Mic, Paperclip, Send } from 'lucide-react';
import React, { useCallback } from 'react';
import { useDefaultModel } from '@/context/ai_context/useDefaultModel';
import { Message } from '@/shared/types/messages';
import axios from 'axios';

// Type for API response
interface AIModelResponse {
    aiResponse: string;
    model: string;
}

export default function ChatInputBox() {
    const [userInput, setUserInput] = React.useState<string>("");
    const { aiSelectedModels, setAiSelectedModels, messages, setMessages } = useDefaultModel();



    const handleSend = useCallback(async () => {
        if (!userInput.trim()) return;

        // NOTE - Add message to all enabled AI models
        setMessages(prev => {
            const updated = { ...prev };
            Object.keys(aiSelectedModels!).forEach((modelKey) => {
                if (aiSelectedModels && aiSelectedModels[modelKey].enable) {
                    updated[modelKey] = [
                        ...(updated[modelKey] ?? []),
                        {
                            role: "user",
                            content: userInput,
                        } as Message
                    ];
                }
            });

            return updated;
        })

        const currentInput = userInput; // Store the current input before resetting
        setUserInput('');

        // 2️⃣ Fetch response from each enabled model
        Object.entries(aiSelectedModels!).forEach(async ([parentModel, modelInfo]) => {
            if (!modelInfo.modelId || (aiSelectedModels && aiSelectedModels[parentModel].enable === false)) return;

            // Add loading placeholder before API call
            setMessages(prev => ({
                ...prev,
                [parentModel]: [
                    ...(prev[parentModel] ?? []),
                    {
                        role: "assistant",
                        content: "Thinking...",
                        model: parentModel,
                        loading: true
                    } as Message,
                ],
            }));


            try {
                console.log("model: ", modelInfo.modelId);
                console.log("msg: ", [{ role: "user", content: currentInput }]);
                console.log("parentModel: ", parentModel);

                // 3️⃣ Fetch response from each enabled model
                const result = await axios.post("/api/large-language-models", {
                    model: modelInfo.modelId,
                    msg: [{ role: "user", content: currentInput }],
                    parentModel,
                });

                const { aiResponse, model } = result.data;

                // 4️ Add AI response to that model’s messages
                setMessages(prev => {
                    const updated = [...(prev[parentModel] ?? [])];
                    const loadingIndex = updated.findIndex((m) => m.loading);

                    if (loadingIndex !== -1) {
                        updated[loadingIndex] = {
                            role: "assistant",
                            content: aiResponse,
                            model,
                            loading: false,
                        };
                    } else {
                        // fallback if no loading msg found
                        updated.push({
                            role: "assistant",
                            content: aiResponse,
                            model,
                            loading: false,
                        });
                    }

                    return { ...prev, [parentModel]: updated };
                });
            } catch (error: unknown) {
                console.error(error);
                setMessages(prev => ({
                    ...prev,
                    [parentModel]: [
                        ...(prev[parentModel] ?? []),
                        {
                            role: "assistant",
                            content: "⚠️ Error fetching response."
                        } as Message,
                    ],
                }));
            }
        });

    }, [userInput, aiSelectedModels, setMessages]);



    return (
        <>
            {/* Note - Fixed chat input box */}
            <div
                className='fixed bottom-4 left-0 w-full flex justify-center'
            >
                <div
                    className='w-full max-w-2xl bg-gray-200 dark:bg-gray-800 border rounded-xl shadow dark:shadow-secondary-foreground/20 p-4'
                >
                    <input
                        type="text"
                        value={userInput as string}
                        onChange={event => setUserInput(event.target.value)}
                        className='border-none outline-none w-full text-black dark:text-white bg-transparent'
                        placeholder='Ask anything...'
                    />
                    <div
                        className='mt-4 flex justify-between items-center'
                    >
                        <Button
                            size={"icon"}
                            className='bg-gray-600 hover:bg-gray-500'
                        >
                            <Paperclip
                                className='w-4 h-4 text-white'
                            />
                        </Button>

                        <div
                            className='space-x-2'
                        >
                            <Button
                                size={"icon"}
                                className='bg-gray-600 hover:bg-gray-500'
                            >
                                <Mic
                                    className='w-4 h-4 text-white'
                                />
                            </Button>

                            <Button
                                onClick={handleSend}
                                size={"icon"}
                                className='bg-green-600 hover:bg-green-400'
                            >
                                <Send
                                    className='w-4 h-4'
                                />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
