import { redirect } from 'next/navigation';

import { getUserData } from '@/actions/get-user-data';
import { WorkSpace as UserWorkspace } from '@/types/app';
import { getUserWorkspaceChannels } from '@/actions/get-user-workspace-channels';
import ChatGroup from '@/components/chat-group';
import { getCurrentWorkspaaceData, getUserWorkspaceData } from '@/actions/get-user-workspace-data';

const ChannelId = async ({
    params: { channelId, workspaceId },
}: {
    params: {
        workspaceId: string;
        channelId: string;
    };
}) => {
    const userData = await getUserData();

    if (!userData) return redirect('/auth');

    const [userWorkspaceData] = await getUserWorkspaceData(userData.workspaces!);

    const [currentWorkspaceData] = await getCurrentWorkspaaceData(workspaceId);

    const userWorkspaceChannels = await getUserWorkspaceChannels(
        currentWorkspaceData.id,
        userData.id
    );

    const currentChannelData = userWorkspaceChannels.find(
        channel => channel.id === channelId
    );

    if (!currentChannelData) return redirect('/');

    return (
        <div className='hidden md:block'>
            <ChatGroup
                type='Channel'
                userData={userData}
                currentChannelData={currentChannelData}
                currentWorkspaceData={currentWorkspaceData}
                slug={workspaceId}
                chatId={channelId}
                userWorkspaceChannels={userWorkspaceChannels}
                socketUrl='/api/web-socket/messages'
                socketQuery={{
                    channelId: currentChannelData.id,
                    workspaceId: currentWorkspaceData,
                }}
                apiUrl='/api/messages'
                headerTitle={currentChannelData.name}
                paramKey='channelId'
                paramValue={channelId}
                userWorkspaceData={userWorkspaceData as UserWorkspace[]}
            />
        </div>
    );
};

export default ChannelId;
