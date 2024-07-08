import { redirect } from 'next/navigation';

import { getUserData } from '@/actions/get-user-data';
import { getCurrentWorkspaaceData, getUserWorkspaceData } from '@/actions/get-user-workspace-data';


const Workspace = async ({
  params: { workspaceId },
}: {
  params: { workspaceId: string };
}) => {
  const userData = await getUserData();

  if (!userData) return redirect('/auth');

  const [userWorkspaceData] = await getUserWorkspaceData(userData.workspaces!);

  const [currentWorkspaceData] = await getCurrentWorkspaaceData(workspaceId);

  console.log(currentWorkspaceData);


  return (
    <div className='text-black'>
      Hello
      {JSON.stringify(currentWorkspaceData)}
    </div>
  );
};

export default Workspace;