import React, { FC } from 'react'
import Typography from './typhography'
import { IoMdHeadset } from "react-icons/io";
import { User } from '@/types/app';

const ChatHeader: FC<{ title: string, chatId: string, userData: User }> = ({
    title,
    chatId,
    userData
}) => {
    return (
        <div className='absolute h-10 top-0 left-0 w-full'>
            <div className='h-10 flex items-center justify-between px-4 fixed md:w-[calc(100%-305px)] lg:w-[calc(100%-447px)] bg-white dark:bg-neutral-800 border-b border-b-white/30 shadow-md'>
                <Typography text={`# ${title}`} variant='h4' />
                <IoMdHeadset size={24} />
            </div>
        </div>
    )
}

export default ChatHeader
