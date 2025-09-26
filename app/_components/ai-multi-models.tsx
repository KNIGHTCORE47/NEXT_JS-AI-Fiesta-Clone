"use client";

import React from 'react';
import { AIModelsConfig } from '@/shared/AiModelList';
import aiModelsConfig from '@/shared/AiModelList';
import Image from 'next/image';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from '@/components/ui/switch';
import { Lock, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';


export default function AiMultiModels() {
    const [aiModelList, setAiModelList] = React.useState<AIModelsConfig>(aiModelsConfig);


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


    return (
        <div
            className='flex flex-1 h-[77dvh] border-b border-gray-200 dark:border-gray-700'
        >
            {
                aiModelList.map((model, index) => (
                    <div
                        className={`flex flex-col h-full border-r border-gray-200 dark:border-gray-700 overflow-auto ${model.enable ? 'flex-1 min-w-[400px]' : 'flex-none w-[100px]'}`}
                    >
                        <div
                            key={index}
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
                                        <Select>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder={model.subModel[0].name} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    model.subModel.map(subModel => (
                                                        <SelectItem key={subModel.id} value={subModel.name}>{subModel.name}</SelectItem>
                                                    ))
                                                }
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