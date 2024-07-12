import { getUserData } from '@/actions/get-user-data';
import { getUserWorkspaceChannels } from '@/actions/get-user-workspace-channels';
import { getCurrentWorkspaaceData, getUserWorkspaceData } from '@/actions/get-user-workspace-data';
import InfoSection from '@/components/info-section'
import SideBar from '@/components/sidebar'
import { redirect } from 'next/navigation';
import { WorkSpace as UserWorkSpace } from '@/types/app';
import React from 'react'
import Typography from '@/components/typhography';
import ChatHeader from '@/components/chat-header';
import TextEditor from '@/components/text-editor';

const ChannelPage = async ({ params: { channelId, workspaceId } }: {
    params: {
        workspaceId: 'string',
        channelId: 'string'
    }
}) => {



    const userData = await getUserData();

    if (!userData) return redirect('/auth');

    const [userWorkspaceData] = await getUserWorkspaceData(userData.workspaces!);

    const [currentWorkspaceData] = await getCurrentWorkspaaceData(workspaceId);

    const userWorkSpaceChannels = await getUserWorkspaceChannels(
        currentWorkspaceData.id,
        userData.id
    )

    const currenWorkspaceChannels = userWorkSpaceChannels.find((channel) => channel.id === channelId);

    if (!currenWorkspaceChannels) {
        return redirect("/")
    }

    return (
        <div className='hidden md:block'>
            <div className='h-[calc(100vh-256px)] overflow-y-auto bg-red-400'>
                <SideBar userData={userData} userWorkSpaceData={userWorkspaceData as UserWorkSpace[]} currentWorkSpaceData={currentWorkspaceData} />
                <InfoSection userData={userData} currentWorkspaceData={currentWorkspaceData} userWorkSpaceChannels={userWorkSpaceChannels} currentChannelId={channelId} />
                <div className='p-4 relative w-full overflow-hidden'>
                    <ChatHeader title={currenWorkspaceChannels.name} />

                    <div className='mt-10'>
                        <Typography text='Chat Content' variant='h4' />
                    </div>
                </div>
            </div>

            <div className='m-4'>
                <TextEditor />
            </div>
        </div>
    )
}

export default ChannelPage
