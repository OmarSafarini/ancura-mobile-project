import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markNotificationAsRead } from "@/services/Patient/Notification";

export const useMarkNotificationAsRead = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => markNotificationAsRead(id),

        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ["notifications"] });
            const previousNotifications = queryClient.getQueryData(["notifications"]);

            queryClient.setQueriesData({ queryKey: ["notifications"] }, (old: any) => {
                if (!Array.isArray(old)) return old;
                return old.map((notif: any) =>
                    notif.id === id ? { ...notif, isRead: true } : notif
                );
            });

            return { previousNotifications };
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["notifications"],
            });
        },

        onError: (error: any, _, context: any) => {
            if (context?.previousNotifications) {
                queryClient.setQueriesData({ queryKey: ["notifications"] }, context.previousNotifications);
            }
            console.error(
                "Failed to mark notification as read:",
                error?.response?.data || error.message
            );
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
    });
};