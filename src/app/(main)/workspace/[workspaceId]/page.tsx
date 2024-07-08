import { redirect } from 'next/navigation';

import { getUserData } from '@/actions/get-user-data';
import { getCurrentWorkspaaceData, getUserWorkspaceData } from '@/actions/get-user-workspace-data';
import SideBar from '@/components/sidebar';
import { WorkSpace as UserWorkSpace } from '@/types/app';


const Workspace = async ({
  params: { workspaceId },
}: {
  params: { workspaceId: string };
}) => {
  const userData = await getUserData();

  if (!userData) return redirect('/auth');

  const [userWorkspaceData] = await getUserWorkspaceData(userData.workspaces!);

  const [currentWorkspaceData] = await getCurrentWorkspaaceData(workspaceId);

  return (
    <>
      <div className='hidden md:block text-black'>
        <SideBar userData={userData} userWorkSpaceData={userWorkspaceData as UserWorkSpace[]} currentWorkSpaceData={currentWorkspaceData} /> /
      </div>
      <div className='md:hidden text-black block min-h-screen'>
        Mobile
      </div>
    </>
  );
};

export default Workspace;