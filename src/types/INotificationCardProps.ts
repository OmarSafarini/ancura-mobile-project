export interface INotification {
    id: number;          
    patient_id?: string;  
    title: string;
    date: string;         
    isRead: boolean;
    status: 'None' | 'Success' | 'Warning' | 'Error' | string; 
    created_at?: string;  
}