export type TaskPriority = "low" | "medium" | "high" | "critical";

export type TaskComment = {
  author: string;
  date: string;
  message: string;
};

export type TaskDetails = {
  id: string;
  description: string;
  assignee: string;
  reporter: string;
  priority: TaskPriority;
  tags: string[];
  createdAt: string;
  dueDate: string;
  estimatedHours: number;
  acceptanceCriteria: string[];
  comments: TaskComment[];
  attachments: string[];
};
