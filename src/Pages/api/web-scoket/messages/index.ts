import { getUserDataPages } from '@/actions/get-user-data';
import supabaseServerClientPages from '@/supabase/SupabaseServerPages';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const userData = await getUserDataPages(req, res);

        if (!userData) {
            return res.status(404).json({ error: 'UnAuthorized' });
        }

        const { channelId, workspaceId } = req.query;

        if (!channelId || !workspaceId) {
            return res.status(404).json({ error: 'Bad Request' });
        }

        const { content, file_url } = req.body;

        if (!content && !file_url) {
            return res.status(404).json({ error: "Bad Request" });
        }

        const supabase = supabaseServerClientPages(req, res);

        const { data: channelData } = await supabase.from('channels').select("*").eq("id", channelId).contains("members", [userData.id]);

        if (!channelData?.length) {
            return res.status(404).json({
                message: "Channel not found",
            })
        }

        const { error: CreatingMessageErroe, data: CreateMessageData } = await supabase.from('messages').insert({
            user_id: userData.id,
            file_url: file_url,
            content,
            channel_id: channelId,
            workspace_id: workspaceId,
        }).select("*, user: user_id(*)").single();

        if (CreatingMessageErroe) {
            console.log("Message creation Error", CreatingMessageErroe);
            return res.status(404).json({
                message: "Error creating message",
                error: CreatingMessageErroe
            })
        }

        return res.status(200).json({
            message: "Message created successfully",
            data: CreateMessageData
        });

    } catch (error) {
        console.log(error);
        return res.status(404).json({ error: "Method not allowed" });
    }
}


