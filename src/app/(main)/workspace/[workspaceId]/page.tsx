import { redirect } from 'next/navigation';

import { getUserData } from '@/actions/get-user-data';
import { getCurrentWorkspaaceData, getUserWorkspaceData } from '@/actions/get-user-workspace-data';
import SideBar from '@/components/sidebar';
import { WorkSpace as UserWorkSpace } from '@/types/app';
import InfoSection from '@/components/info-section';
import { getUserWorkspaceChannels } from '@/actions/get-user-workspace-channels';



const Workspace = async ({
  params: { workspaceId },
}: {
  params: { workspaceId: string };
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
    <>
      <div className='hidden md:block'>
        <SideBar userData={userData} userWorkSpaceData={userWorkspaceData as UserWorkSpace[]} currentWorkSpaceData={currentWorkspaceData} />
        <InfoSection userData={userData} currentWorkspaceData={currentWorkspaceData} userWorkSpaceChannels={userWorkSpaceChannels} currentChannelId='' />
      </div>
    </>
  );
};

export default Workspace;