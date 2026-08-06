import { delay } from '../mockData';

const mockActivityLogs = [
  { id: 1, doctor_id: "doctor_1", history_title: "Replied to case", body: "You replied to John Doe's case.", status: "comment", date: new Date().toISOString() },
  { id: 2, doctor_id: "doctor_1", history_title: "Case Resolved", body: "A case you handled was resolved.", status: "resolved", date: new Date(Date.now() - 86400000).toISOString() },
  { id: 3, doctor_id: "doctor_1", history_title: "New Alert", body: "Urgent case assigned to you.", status: "alert", date: new Date(Date.now() - 172800000).toISOString() }
];

export const postActivitylog = async (payload: any) => {
    try {
        await delay(200);
        console.log("Mocked postActivitylog:", payload);
        const newLog = { id: Math.floor(Math.random() * 10000), ...payload };
        mockActivityLogs.unshift(newLog);
        return [newLog];
    } catch (error: any) {
        console.error("postActivitylog ERROR:", error.message);
        throw error;
    }
};

export const getActivitylog = async (doctorId: string) => {
    await delay(300);
    // Return all mock logs for demonstration purposes regardless of ID, 
    // or filter if we strictly want only doctor_1
    return mockActivityLogs;
};
