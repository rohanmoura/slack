import { getUserData } from '@/actions/get-user-data';
import { getUserWorkspaceChannels } from '@/actions/get-user-workspace-channels';
import { getCurrentWorkspaaceData, getUserWorkspaceData } from '@/actions/get-user-workspace-data';
import InfoSection from '@/components/info-section'
import SideBar from '@/components/sidebar'
import { redirect } from 'next/navigation';
import { WorkSpace as UserWorkSpace } from '@/types/app';
import React from 'react'

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

    return (
        <div className='hidden md:block'>
            <SideBar userData={userData} userWorkSpaceData={userWorkspaceData as UserWorkSpace[]} currentWorkSpaceData={currentWorkspaceData} />
            <InfoSection userData={userData} currentWorkspaceData={currentWorkspaceData} userWorkSpaceChannels={userWorkSpaceChannels} currentChannelId={channelId} />
        </div>
    )
}

export default ChannelPage
