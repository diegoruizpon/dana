export interface Task {
    id: number;
    type: 'task' | 'supplies' | 'equipment';
    title: string;
    description?: string;
    location: string;
    latitude?: number;
    longitude?: number;
    urgency: 'high' | 'medium' | 'low';
    volunteers?: number;
    items?: string[];
  }