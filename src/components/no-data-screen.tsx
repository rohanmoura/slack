'use client';

import { FC, useState } from 'react'
import Typography from './typhography';
import { Button } from './ui/button';
import CreateChannelDialog from './create-channel-dialouge';

const NoDataScreen: FC<{ workspaceName: string; userId: string; workspaceId: string }> = ({
    workspaceName,
    userId,
    workspaceId
}) => {

    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <div className='w-full h-[calc(100vh-63px)] p-5'>
            <Typography text={`👋 Welcome to the # ${workspaceName}`} variant='h3' />
            <Typography text='Get Started by creating a channel or direct message' variant='p' className='my-3' />
            <div className='w-fit'>
                <Button onClick={() => setDialogOpen(true)} className='w-full my-2'>
                    <Typography text="Create Channel" variant='p' />
                </Button>
            </div>
            <CreateChannelDialog userdataId={userId} workspaceId={workspaceId} dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
        </div>
    )
}

export default NoDataScreen
