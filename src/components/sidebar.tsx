
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
        <aside>

        </aside>
    )
}

export default SideBar
