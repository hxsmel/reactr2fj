import React from 'react';
import { Typography, Divider, List, ListItem, ListItemText } from '@mui/material';
import { Task } from '../types';
import { TaskItem } from './TaskItem';

interface TaskSectionProps {
    title: string;
    tasks: Task[];
    onToggleDone: (id: number) => void;
    onStartEditing: (id: number) => void;
    onCancelEditing: (id: number) => void;
    onUpdateEditText: (id: number, text: string) => void;
    onFinishEditing: (id: number) => void;
    onDeleteTask: (id: number) => void;
    emptyText: string;
}

export const TaskSection: React.FC<TaskSectionProps> = ({
                                                            title,
                                                            tasks,
                                                            onToggleDone,
                                                            onStartEditing,
                                                            onCancelEditing,
                                                            onUpdateEditText,
                                                            onFinishEditing,
                                                            onDeleteTask,
                                                            emptyText
                                                        }) => (
    <>
        <Typography variant="subtitle1" color="textSecondary" align="center" gutterBottom>
            {title} ({tasks.length})
        </Typography>
        <Divider />
        <List>
            {tasks.length ? (
                tasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onToggleDone={onToggleDone}
                        onStartEditing={onStartEditing}
                        onCancelEditing={onCancelEditing}
                        onUpdateEditText={onUpdateEditText}
                        onFinishEditing={onFinishEditing}
                        onDeleteTask={onDeleteTask}
                    />
                ))
            ) : (
                <ListItem>
                    <ListItemText primary={emptyText} />
                </ListItem>
            )}
        </List>
    </>
);