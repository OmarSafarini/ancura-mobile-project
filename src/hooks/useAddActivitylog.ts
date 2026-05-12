import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postActivitylog } from '@/services/Doctor/ActivityLog';


export const useAddActivitylog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: { doctor_id: string; history_title: string; body: string; status:string }) => {
            const payload = {
                doctor_id: data.doctor_id,
                history_title: data.history_title,
                body: data.body,
                status: data.status,
                date: new Date().toISOString().split('T')[0],
            }
            return postActivitylog(payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["activitylog"] });
            queryClient.refetchQueries({ queryKey: ["activitylog"] });
        },
        onError: (error: any) => {
            console.error(
                "Failed to add activitylog:",
                error?.response?.data || error.message
            );
        }
    });
};