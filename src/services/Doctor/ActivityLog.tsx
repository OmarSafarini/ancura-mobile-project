import { supabaseClient } from "../supabase";

export const postActivitylog = async (payload:any) => {
    try {
        const res = await supabaseClient.post(
            `/activity_log`,
            payload
        );
        return res.data;
    } catch (error:any) {
        console.error("postActivitylog ERROR:",error?.response?.data || error.message);
        throw error;
    }
};
