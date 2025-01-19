export interface Task {
  id: number;
  employee_id: number;
  description: string;
  start_time: string;
  end_time: string;
  date: string;
  total_hours: string;
  remaining_hours: string;
  employee_name: string;
}

export interface TasksState {
  tasks: Task[];
  total_hours: number;
  remaining_hours: number;
  loading: boolean;
  error: string | null;
}
