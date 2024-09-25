import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TaskForm = ({ taskToEdit, onSave }) => {
    const [task, setTask] = useState({
        title: '',
        description: '',
        status: '',
        dueDate: '',
    });
    const navigate = useNavigate();

    // Effect to set the task to edit when taskToEdit is provided
    useEffect(() => {
        if (taskToEdit) {
            setTask(taskToEdit);
        }
    }, [taskToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (task.taskId) {
                // If task exists, update it
                await axios.put(`https://localhost:7183/api/Tasks/${task.taskId}`, task);
            } else {
                // If task is new, create it
                await axios.post('https://localhost:7183/api/Tasks', task);
            }
            onSave(task); 
            navigate('/tasks'); 
        } catch (error) {
            console.error('Error saving task:', error);
            if (error.response) {
                console.error('Error response:', error.response.data); // Log specific error details
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{task.taskId ? 'Edit Task' : 'Add Task'}</h2>
            <input
                type="text"
                name="title"
                value={task.title}
                onChange={handleChange}
                placeholder="Task Title"
                required
            />
            <textarea
                name="description"
                value={task.description}
                onChange={handleChange}
                placeholder="Task Description"
                required
            />
            <input
                type="text"
                name="status"
                value={task.status}
                onChange={handleChange}
                placeholder="Status (Pending, In Progress, Completed)"
                required
            />
            <input
                type="date"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
                placeholder="Due Date"
                required
            />
            <button type="submit">{task.taskId ? 'Update Task' : 'Add Task'}</button>
        </form>
    );
};

export default TaskForm;
