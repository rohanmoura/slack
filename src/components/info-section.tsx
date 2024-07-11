"use client";

import { cn } from '@/lib/utils';
import { useColorPrefrences } from '@/Providers/color-prefrences';
import React, { FC, useState } from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { FaArrowDown, FaArrowUp, FaPlus } from 'react-icons/fa';
import Typography from './typhography';
import CreateChannelDialog from './create-channel-dialouge';
import { Channel, User, WorkSpace } from '@/types/app';
import { useRouter } from 'next/navigation';

const InfoSection: FC<{ userData: User, currentWorkspaceData: WorkSpace, userWorkSpaceChannels: Channel[], currentChannelId: string }> = ({
    userData,
    currentWorkspaceData,
    userWorkSpaceChannels,
    currentChannelId
}) => {

    const { color } = useColorPrefrences()
    const [isChannelCollapsed, setIsChannelCollapsed] = useState(true)
    const [isDirectMessageCollapsed, setIsDirectMessageCollapsed] =
        useState(true);
    const [dialogOpen, setDialogOpen] =
        useState(false);
    const router = useRouter()

    let backgroundColor = "bg-primary-light"
    if (color === "green") {
        backgroundColor = "bg-green-900"
    } else if (color === "blue") {
        backgroundColor = "bg-blue-900"
    }

    let secondaybg = "bg-primary-dark";

    let secondayBg = 'hover:bg-primary-dark';
    if (color === 'green') {
        secondayBg = 'hover:bg-green-600';
    } else if (color === 'blue') {
        secondayBg = 'hover:bg-blue-600';
    }

    const navigateToChannel = (channelId: string) => {
        const url = `/workspace/${currentWorkspaceData.id}/channel/${channelId}`;
        router.push(url);
    };

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
                            <div
                                className={cn(
                                    'cursor-pointer p-2 rounded-full',
                                    secondayBg
                                )}
                            >
                                <FaPlus onClick={() => setDialogOpen(true)} />
                            </div>
                        </div>
                        <CollapsibleContent>
                            {userWorkSpaceChannels.map((channel) => {
                                const activeChannel = currentChannelId === channel.id
                                return (
                                    <Typography key={channel.id} variant='p' text={`# ${channel.name}`} className={cn("px-2 py-1 rounded-sm cursor-pointer", secondayBg, activeChannel && secondaybg)} onClick={() => navigateToChannel(channel.id)} />
                                )
                            })}
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
                                    secondayBg
                                )}
                            >
                                <FaPlus />
                            </div>
                        </div>
                        <CollapsibleContent>
                            <Typography variant='p' text='User Name 1' className={cn("px-2 py-1 rounded-sm cursor-pointer", secondayBg)} />
                            <Typography variant='p' text='User Name 2' className={cn("px-2 py-1 rounded-sm cursor-pointer", secondayBg)} />
                            <Typography variant='p' text='User Name 3' className={cn("px-2 py-1 rounded-sm cursor-pointer", secondayBg)} />
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            </div>

            <CreateChannelDialog setDialogOpen={setDialogOpen} dialogOpen={dialogOpen} workspaceId={currentWorkspaceData.id} userdataId={userData.id} />
        </div>
    )
}

export default InfoSection
