import { useState } from 'react';
import { Container, Typography, Divider, Box } from '@mui/material';
import { initialTasks, initialNewTask } from './constants';
import { useTasks } from './hooks/useTasks';
import { NewTaskForm } from './components/NewTaskForm';
import { TaskSection } from './components/TaskSection';

export function App() {
    const {
        tasks,
        addTask,
        deleteTask,
        toggleDone,
        startEditing,
        cancelEditing,
        updateEditText,
        finishEditing,
    } = useTasks(initialTasks);
    const [newTask, setNewTask] = useState(initialNewTask);

    const planTasks = tasks.filter(t => !t.isDone);
    const doneTasks = tasks.filter(t => t.isDone);

    const handleAdd = () => {
        addTask(newTask);
        setNewTask('');
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                TODO
            </Typography>
            <NewTaskForm
                newTask={newTask}
                onNewTaskChange={setNewTask}
                onAddTask={handleAdd}
            />
            <TaskSection
                title="ПЛАН"
                tasks={planTasks}
                onToggleDone={toggleDone}
                onStartEditing={startEditing}
                onCancelEditing={cancelEditing}
                onUpdateEditText={updateEditText}
                onFinishEditing={finishEditing}
                onDeleteTask={deleteTask}
                emptyText="Нет задач в плане"
            />
            <Box my={4}>
                <Divider />
            </Box>
            <TaskSection
                title="ГОТОВО"
                tasks={doneTasks}
                onToggleDone={toggleDone}
                onStartEditing={startEditing}
                onCancelEditing={cancelEditing}
                onUpdateEditText={updateEditText}
                onFinishEditing={finishEditing}
                onDeleteTask={deleteTask}
                emptyText="Нет выполненных задач"
            />
        </Container>
    );
}