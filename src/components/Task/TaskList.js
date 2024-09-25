import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TaskList = ({ onEdit, onDelete }) => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    const fetchTasks = async () => {
        try {
            const response = await axios.get('https://localhost:7183/api/Tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleEdit = (task) => {
        onEdit(task); // Pass the selected task to be edited
        navigate('/add-task'); // Navigate to the TaskForm
    };

    return (
        <div>
            <h2>Tasks List</h2>
            <button onClick={() => navigate('/add-task')}>Add Task</button> {/* Button to add a task */}
            <ul>
                {tasks.map((task) => (
                    <li key={task.taskId}>
                        {task.title} - {task.description} - Due: {new Date(task.dueDate).toLocaleDateString()} - {task.status}
                        <button onClick={() => handleEdit(task)}>Edit</button>
                        <button onClick={() => onDelete(task.taskId)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
