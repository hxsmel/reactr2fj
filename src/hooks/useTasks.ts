import { useState, useCallback } from 'react';
import { Task } from '../types';

export const useTasks = (initialTasks: Task[] = [])=> {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const addTask = useCallback((text: string) => {
        const trimmed = text.trim();
        if (!trimmed) return;
        const newTask: Task = {
            id: Date.now(),
            text: trimmed,
            isDone: false,
            isEditing: false,
            editText: '',
            createdAt: new Date(),
        };
        setTasks(prev => [...prev, newTask]);
    }, []);

    const deleteTask = useCallback((id: number) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    }, []);

    const toggleDone = useCallback((id: number) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id
                    ? { ...task, isDone: !task.isDone, isEditing: false }
                    : task
            )
        );
    }, []);

    const startEditing = useCallback((id: number) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id
                    ? { ...task, isEditing: true, editText: task.text }
                    : { ...task, isEditing: false }
            )
        );
    }, []);

    const cancelEditing = useCallback((id: number) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id
                    ? { ...task, isEditing: false, editText: '' }
                    : task
            )
        );
    }, []);

    const updateEditText = useCallback((id: number, editText: string) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id ? { ...task, editText } : task
            )
        );
    }, []);

    const finishEditing = useCallback((id: number) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id
                    ? {
                        ...task,
                        text: task.editText.trim() || task.text,
                        isEditing: false,
                        editText: ''
                    }
                    : task
            )
        );
    }, []);

    return {
        tasks,
        addTask,
        deleteTask,
        toggleDone,
        startEditing,
        cancelEditing,
        updateEditText,
        finishEditing,
    };
}