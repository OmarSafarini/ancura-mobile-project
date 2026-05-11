import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPatientNotification } from '@/services/Patient/Notification';

export const useAddNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (details: { title: string; status?: string; patientId: string }) => {
      const payload = {
        patient_id: details.patientId, 
        title: details.title,
        status: details.status || 'None',
        isRead: false,
        date: new Date().toISOString().split('T')[0],
      };

      return addPatientNotification(payload);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["notifications", variables.patientId] });
    },
  });
};