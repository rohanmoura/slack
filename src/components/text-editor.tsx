"use client";

import React, { FC, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { Button } from './ui/button'
import { Send } from 'lucide-react'
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import PlaceHolder from "@tiptap/extension-placeholder";
import MenuBar from './menu-bar';
import axios from 'axios';
import { Channel, User, WorkSpace } from '@/types/app';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import ChatFileUpload from './chat-file-upload';


const TextEditor: FC<{
    apiUrl: string;
    type: "Channel" | "DirectMessage";
    channel: Channel;
    workspaceData: WorkSpace
    userData: User
}> = ({
    apiUrl,
    type,
    channel,
    workspaceData,
    userData
}) => {

        const [content, setContent] = useState('');
        const [FileUploadModdle, setFileUploadModdle] = useState(false);

        const toggleFileUploadModdle = () => setFileUploadModdle(prev => !prev);

        const editor = useEditor({
            extensions: [
                StarterKit,
                PlaceHolder.configure({ placeholder: `Message #${type === "Channel" ? channel.name : "userName"}` })
            ],
            autofocus: true,
            content,
            onUpdate({ editor }) {
                setContent(editor.getHTML());
            },
        });

        const handleSubmit = async () => {
            if (content.length < 2) return;

            try {
                await axios.post(
                    `${apiUrl}?channelId=${channel?.id}&workspaceId=${workspaceData.id}`, {
                    content,
                }
                );
                setContent('');
                editor?.commands.setContent('');
            } catch (error) {
                console.log(error);

            }
        }

        return (
            <div className='p-1 border dark:border-zinc-500 border-neutral-700 rounded-md relative overflow-hidden'>
                <div className='sticky top-0 z-10'>
                    {editor && <MenuBar editor={editor} />}
                </div>
                <div className='h-[150px] pt-11 flex w-full grow-1'>
                    <EditorContent editor={editor} className='prose w-full h-[150px] dark:text-white leading-[1.15px] overflow-y-hidden whitespace-pre-wrap' />
                </div>
                <div className='absolute top-3 z-10 right-3 bg-black dark:bg-white cursor-pointer transition-all duration-500 hover:scale-110 text-white grid place-content-center rounded-full w-6 h-6'>
                    <FiPlus onClick={toggleFileUploadModdle} size={28} className='dark:text-black' />
                </div>

                <Button onClick={handleSubmit} disabled={content.length < 2} size={"sm"} className='absolute bottom-1 right-1'>
                    <Send />
                </Button>


                <Dialog onOpenChange={toggleFileUploadModdle} open={FileUploadModdle}>
                        <DialogContent className='sm:max-w-md'>
                            <DialogHeader>
                                <DialogTitle>
                                    File Upload
                                </DialogTitle>
                                <DialogDescription>
                                    Upload a file to share with your team.
                                </DialogDescription>
                            </DialogHeader>

                            <ChatFileUpload userData={userData} workspaceData={workspaceData} channel={channel} />
                        </DialogContent>
                </Dialog>
            </div>
        )
    }

export default TextEditor
