
import { User, WorkSpace } from '@/types/app'
import React, { FC } from 'react'

type SideBarProps = {
    userWorkSpaceData: WorkSpace[];
    currentWorkSpaceData: WorkSpace;
    userData: User;
}

const SideBar: FC<SideBarProps> = ({
    userWorkSpaceData, currentWorkSpaceData, userData
}) => {


    return (
        <aside className='fixed top-0 left-0 pt-[68px] pb-8 z-30 flex flex-col justify-between items-center h-screen w-20'>
            Hello
        </aside>
    )
}

export default SideBar
