"use server";

import { supabaseServerClient } from "@/supabase/supabaseServer";
import { getUserData } from "./get-user-data";

export const createChannel = async ({
    workspaceId,
    userdataId,
    name
}: {
    userdataId: string;
    name: string;
    workspaceId: string;
}) => {
    const supabase = await supabaseServerClient();

    const userData = await getUserData();

    if (!userData) {
        throw new Error("User not found");
    }

    const { error, data: ChannelRecord } = await supabase.from("channels").insert({
        name,
        user_id: userdataId,
        workspace_id: workspaceId,
    }).select("*");

    if (error) {
        throw new Error(error.message);
    }

    // update channel members array

    const [, updateChannelMembersError] = await updateChannelMembers(ChannelRecord[0].id, userdataId);

    if (updateChannelMembersError) {
        throw new Error(updateChannelMembersError.message);
    }

    const [, addChannelToUsersError] = await addChannelToUsers(userdataId, ChannelRecord[0].id)

    if (addChannelToUsersError) {
        throw new Error(addChannelToUsersError.message);
    }

    const [, addChannelToWorkspaceError] = await addChannelToWorkspace(
        ChannelRecord[0].id,
        workspaceId
    )

    if (addChannelToWorkspaceError) {
        throw new Error(addChannelToWorkspaceError.message);
    }

}

const addChannelToUsers = async (userId: string, channelId: string) => {

    const supabase = await supabaseServerClient();

    const { data: addChannelToUsersData, error: addChannelToUsersError } = await supabase.rpc("update_user_channels", {
        user_id: userId,
        channel_id: channelId
    })

    return [addChannelToUsersData, addChannelToUsersError];

}

const addChannelToWorkspace = async (channelId: string, workspaceId: string) => {

    const supabase = await supabaseServerClient();

    const { data: addChannelToWorkspaceData, error: addChannelToWorkspaceError } = await supabase.rpc("add_channel_to_workspace", {
        channel_id: channelId,
        workspace_id: workspaceId
    })

    return [addChannelToWorkspaceData, addChannelToWorkspaceError];

}

const updateChannelMembers = async (channelId: string, userId: string) => {
    const supabase = await supabaseServerClient();

    const { data: updateChannelData, error: updateChannelError } = await supabase.rpc("update_channel_members", {
        new_member: userId,
        channel_id: channelId
    });

    return [updateChannelData, updateChannelError];
}