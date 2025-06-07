export interface Task {
    id: number;
    text: string;
    isDone: boolean;
    isEditing: boolean;
    editText: string;
    createdAt: Date;
}

export interface NewTaskFormProps {
    newTask: string;
    onNewTaskChange: (value: string) => void;
    onAddTask: () => void;
}

export interface TaskItemProps {
    task: Task;
    onToggleDone: (id: number) => void;
    onStartEditing: (id: number) => void;
    onCancelEditing: (id: number) => void;
    onUpdateEditText: (id: number, text: string) => void;
    onFinishEditing: (id: number) => void;
    onDeleteTask: (id: number) => void;
}