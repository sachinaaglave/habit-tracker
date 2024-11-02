export interface Habit {
    name: string;
    image: string | null;
    consecutiveDays: number;
    isActive: boolean;
    lastTrackedDate: Date | null;
} 
