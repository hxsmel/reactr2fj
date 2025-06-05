import React, { KeyboardEvent } from 'react';
import { TextField, Box, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import { NewTaskFormProps } from '../types';

export const NewTaskForm: React.FC<NewTaskFormProps> = ({ newTask, onNewTaskChange, onAddTask }) => (
    <Box sx={{ display: 'flex', mb: 4 }}>
        <TextField
            fullWidth
            variant="standard"
            label="Имя новой задачи"
            value={newTask}
            onChange={e => onNewTaskChange(e.target.value)}
            onKeyDown={(e: KeyboardEvent) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    onAddTask();
                }
            }}
        />
        <IconButton color="primary" onClick={onAddTask}>
            <Add />
        </IconButton>
    </Box>
);