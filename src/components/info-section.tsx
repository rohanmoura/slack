"use client";

import { cn } from '@/lib/utils';
import { useColorPrefrences } from '@/Providers/color-prefrences';
import React, { useState } from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { FaArrowDown, FaArrowUp, FaPlus } from 'react-icons/fa';
import Typography from './typhography';

const InfoSection = () => {

    const { color } = useColorPrefrences()
    const [isChannelCollapsed, setIsChannelCollapsed] = useState(false)
    const [isDirectMessageCollapsed, setIsDirectMessageCollapsed] =
        useState(true);

    let backgroundColor = "bg-primary-light"
    if (color === "green") {
        backgroundColor = "bg-green-900"
    } else if (color === "blue") {
        backgroundColor = "bg-blue-900"
    }

    let secondayBg = 'bg-primary-dark';
    if (color === 'green') {
        secondayBg = 'bg-green-700';
    } else if (color === 'blue') {
        secondayBg = 'bg-blue-700';
    }

    return (
        <div className={cn(
            'fixed text-white left-20 rounded-l-xl md:w-52 lg:w-[350px] h-[calc(100%-63px)] z-20 flex flex-col items-center',
            backgroundColor
        )}>
            <div className='w-full flex flex-col gap-2 p-3'>
                <div>
                    <Collapsible open={isChannelCollapsed} onOpenChange={() => setIsChannelCollapsed(pre => !pre)} className='flex flex-col gap-2'>
                        <div className='flex items-center justify-between'>
                            <CollapsibleTrigger className='flex items-center gap-2
        '>
                                {isChannelCollapsed ? <FaArrowDown /> : <FaArrowUp />}
                                <Typography className='font-bold' variant='p' text='Channels' />
                            </CollapsibleTrigger>
                            <div className={cn("cursor-pointer p-2 rounded-full", `hover:${secondayBg}`)}>
                                <FaPlus />
                            </div>
                        </div>
                        <CollapsibleContent>
                            <Typography variant='p' text='#-channel -name-1' className={cn("px-2 py-1 rounded-sm cursor-pointer", `hover:${secondayBg}`)} />
                            <Typography variant='p' text='#-channel -name-2' className={cn("px-2 py-1 rounded-sm cursor-pointer", `hover:${secondayBg}`)} />
                            <Typography variant='p' text='#-channel -name-3' className={cn("px-2 py-1 rounded-sm cursor-pointer", `hover:${secondayBg}`)} />
                        </CollapsibleContent>
                    </Collapsible>
                </div>
                <div>
                    <Collapsible open={isDirectMessageCollapsed} onOpenChange={() => setIsDirectMessageCollapsed(prev => !prev)} className='flex flex-col gap-2'>
                        <div className='flex items-center justify-between'>
                            <CollapsibleTrigger className='flex items-center gap-2'>
                                {isDirectMessageCollapsed ? <FaArrowDown /> : <FaArrowUp />}
                                <Typography
                                    variant='p'
                                    text='Direct messages'
                                    className='font-bold'
                                />
                            </CollapsibleTrigger>
                            <div
                                className={cn(
                                    'cursor-pointer p-2 rounded-full',
                                    `hover:${secondayBg}`
                                )}
                            >
                                <FaPlus />
                            </div>
                        </div>
                        <CollapsibleContent>
                            <Typography variant='p' text='User Name 1' className={cn("px-2 py-1 rounded-sm cursor-pointer", `hover:${secondayBg}`)} />
                            <Typography variant='p' text='User Name 2' className={cn("px-2 py-1 rounded-sm cursor-pointer", `hover:${secondayBg}`)} />
                            <Typography variant='p' text='User Name 3' className={cn("px-2 py-1 rounded-sm cursor-pointer", `hover:${secondayBg}`)} />
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            </div>
        </div>
    )
}

export default InfoSection
