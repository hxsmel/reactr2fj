import React from 'react';
import { TextField, Box, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import { NewTaskFormProps } from '../types';

export const NewTaskForm: React.FC<NewTaskFormProps> = ({ newTask, onNewTaskChange, onAddTask }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddTask();
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', mb: 4 }}
        >
            <TextField
                fullWidth
                variant="standard"
                label="Имя новой задачи"
                value={newTask}
                onChange={e => onNewTaskChange(e.target.value)}
            />
            <IconButton
                color="primary"
                type="submit"
            >
                <Add />
            </IconButton>
        </Box>
    );
};
