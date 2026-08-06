import { mockNotifications, delay } from '../mockData';

export const getPatientNotification = async (patientId: string | null) => {
  try {
    await delay();
    return mockNotifications;
  } catch (error) {
    console.error("getPatientNotification ERROR:", error);
    throw error;
  }
};

export const addPatientNotification = async (payload: any) => {
  try {
    await delay();
    const newNotification = {
      ...payload,
      id: Math.floor(Math.random() * 10000),
      is_read: false,
      created_at: new Date().toISOString(),
      time_ago: "Just now"
    };
    mockNotifications.unshift(newNotification);
    return [newNotification];
  } catch (error: any) {
    console.error("addPatientNotification ERROR:", error.message);
    throw error;
  }
};

export const markNotificationAsRead = async (id: number) => {
  try {
    await delay();
    const index = mockNotifications.findIndex(n => n.id === id);
    if (index !== -1) {
      mockNotifications[index].is_read = true;
    }
    return [mockNotifications[index]];
  } catch (error: any) {
    console.error("markNotificationAsRead ERROR:", error.message);
    throw error;
  }
};