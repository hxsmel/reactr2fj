import React, { KeyboardEvent } from 'react';
import { ListItem, ListItemText, Checkbox, IconButton, Box, TextField } from '@mui/material';
import { Edit, Delete, Check, Close } from '@mui/icons-material';
import { TaskItemProps } from '../types';

export const TaskItem: React.FC<TaskItemProps> = ({
                                                      task,
                                                      onToggleDone,
                                                      onStartEditing,
                                                      onCancelEditing,
                                                      onUpdateEditText,
                                                      onFinishEditing,
                                                      onDeleteTask
                                                  }) => (
    <ListItem disableGutters>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Checkbox checked={task.isDone} onChange={() => onToggleDone(task.id)} />
            {task.isEditing ? (
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <TextField
                        fullWidth
                        size="small"
                        variant="standard"
                        value={task.editText}
                        onChange={e => onUpdateEditText(task.id, e.target.value)}
                        onKeyDown={(e: KeyboardEvent) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                onFinishEditing(task.id);
                            } else if (e.key === 'Escape') {
                                onCancelEditing(task.id);
                            }
                        }}
                    />
                    <IconButton color="success" onClick={() => onFinishEditing(task.id)}>
                        <Check />
                    </IconButton>
                    <IconButton color="default" onClick={() => onCancelEditing(task.id)}>
                        <Close />
                    </IconButton>
                </Box>
            ) : (
                <>
                    <Box sx={{ flexGrow: 1 }}>
                        <ListItemText primary={task.text} />
                    </Box>
                    {!task.isDone && (
                        <IconButton edge="end" onClick={() => onStartEditing(task.id)}>
                            <Edit />
                        </IconButton>
                    )}
                    <IconButton color="error" edge="end" onClick={() => onDeleteTask(task.id)}>
                        <Delete />
                    </IconButton>
                </>
            )}
        </Box>
    </ListItem>
);