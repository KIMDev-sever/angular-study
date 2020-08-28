export interface ScheduleModel {
    id: string;
    title: string;
    color: string;
    start: Date;
    end?: Date;
    description?: string;
    start_time?: string;
    end_time?: string;
}
