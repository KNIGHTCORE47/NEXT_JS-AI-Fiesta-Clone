"use client";

import React from 'react';
import { AIModelsConfig } from '@/shared/AiModelList';
import aiModelsConfig from '@/shared/AiModelList';
import Image from 'next/image';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from '@/components/ui/switch';
import { Lock, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDefaultModel } from '@/context/ai_context/useDefaultModel';
import { doc, updateDoc } from 'firebase/firestore';
import { useUser } from '@clerk/nextjs';
import db from '@/database/firebase_config';


export default function AiMultiModels() {
    const [aiModelList, setAiModelList] = React.useState<AIModelsConfig>(aiModelsConfig);

    const { aiSelectedModels, setAiSelectedModels } = useDefaultModel();
    const { user } = useUser();



    // NOTE - [Logic] Here the onToggleChange function is used to update the state of the AI model list. As the user toggles the switch, the function updates the state of the AI model list, and the switch is updated accordingly. With this, the user can toggle the switch to enable or disable the AI model and as developers, we can render the UI dynamically based on the state of the AI model list.
    function onToggleChange(
        model: string,
        value: boolean
    ) {
        setAiModelList(prev => {
            return prev.map(item => {
                if (item.model === model) {
                    return {
                        ...item,
                        enable: value
                    }
                }
                return item
            })
        });
    }

    // NOTE - [Logic] Here the onSelectModel function is used to update the state of the AI model list. As the user selects a model, the function updates the state of the AI model list, and the UI is updated accordingly, and on reload, the user can see the selected model which is stored in the state.
    async function onSelectModel(
        parentModel: string,
        value: string
    ) {
        // Create the updated model selection
        const updatedModels = {
            ...aiSelectedModels!,
            [parentModel]: {
                modelId: value
            }
        };

        // Update local state
        setAiSelectedModels(updatedModels);

        // NOTE - Update Firebase DB with changes [new selected model data]
        try {
            if (!user?.primaryEmailAddress?.emailAddress) {
                console.error('User email not available');
                return;
            }

            const docRef = doc(db, "users", user.primaryEmailAddress.emailAddress);

            await updateDoc(docRef, {
                selectedModelPref: updatedModels
            })

        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error("Unknown error");
            }
        }
    }

    // NOTE - Helper function to get the current selected model or default
    function getSelectedModelId(
        model: typeof aiModelList[0]
    ): string {
        return aiSelectedModels?.[model.model]?.modelId || model.subModel[0].id;
    }

    // NOTE - Helper function to get the display name for selected model
    function getSelectedModelName(
        model: typeof aiModelList[0]
    ): string {
        const selectedId = getSelectedModelId(model);
        const subModel = model.subModel.find(sm => sm.id === selectedId);
        return subModel?.name || model.subModel[0].name;
    }


    return (
        <div
            className='flex flex-1 h-[77dvh] border-b border-gray-200 dark:border-gray-700'
        >
            {
                aiModelList.map((model, index) => (
                    <div
                        key={index}
                        className={`flex flex-col h-full border-r border-gray-200 dark:border-gray-700 overflow-auto ${model.enable ? 'flex-1 min-w-[400px]' : 'flex-none w-[100px]'}`}
                    >
                        <div
                            className='w-full h-[80px] flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700'
                        >
                            <div
                                className='flex items-center gap-x-4'

                            >
                                <Image
                                    src={model.icon}
                                    alt={model.model}
                                    width={30}
                                    height={30}
                                />

                                {
                                    model.enable && (
                                        <Select
                                            defaultValue={getSelectedModelId(model)}
                                            onValueChange={(value) => onSelectModel(model.model, value)}
                                            disabled={model.premium}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder={getSelectedModelName(model)} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel
                                                        className='font-bold'
                                                    >
                                                        Free
                                                    </SelectLabel>

                                                    {
                                                        model.subModel
                                                            .filter(subModel => !subModel.premium)
                                                            .map(subModel => (
                                                                <SelectItem key={subModel.id} value={subModel.id} className='pl-5'>{subModel.name}</SelectItem>
                                                            ))
                                                    }
                                                </SelectGroup>

                                                <SelectGroup>
                                                    <SelectLabel
                                                        className='font-bold'
                                                    >
                                                        Premium
                                                    </SelectLabel>

                                                    {
                                                        model.subModel
                                                            .filter(subModel => subModel.premium)
                                                            .map(subModel => (
                                                                <SelectItem
                                                                    key={subModel.id}
                                                                    value={subModel.id}
                                                                    className='pl-5'
                                                                    disabled={subModel.premium}
                                                                >
                                                                    {subModel.name} {subModel.premium && <Lock className='w-4 h-4' />}
                                                                </SelectItem>
                                                            ))
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )
                                }
                            </div>

                            <div>
                                {
                                    model.enable ? (
                                        <Switch
                                            checked={model.enable}
                                            onCheckedChange={value => onToggleChange(model.model, value)}
                                        />
                                    ) : (
                                        <MessageSquare
                                            onClick={() => onToggleChange(model.model, true)}
                                            className='w-5 h-5'
                                        />
                                    )
                                }
                            </div>
                        </div>

                        <div
                            className='h-full w-full flex items-center justify-center'
                        >
                            {
                                model.premium && model.enable && (
                                    <Button>
                                        <Lock className='w-4 h-4' /> Upgrade to Unlock
                                    </Button>
                                )
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}