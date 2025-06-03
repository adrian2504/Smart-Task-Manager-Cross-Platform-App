export interface Task {
  id: string;
  title: string;
  notes?: string;
  due?: string; // ISO date
  done: boolean;
  category?: string; 
  notificationId?: string;
}