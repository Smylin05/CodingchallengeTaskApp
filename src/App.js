// App.js
import './App.css';
import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import TaskList from './components/Task/TaskList'; 
import TaskForm from './components/Task/TaskForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [tasks, setTasks] = useState([]); // State to manage tasks
    const [message, setMessage] = useState(''); // State for success/error message

    useEffect(() => {
        fetchTasks(); // Fetch tasks on initial load
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('https://localhost:7183/api/Tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const onEdit = async (id, task) => {
        try {
            await axios.put(`https://localhost:7183/api/Tasks/${id}`, task);
            setMessage('Task updated successfully!'); // Set success message
            fetchTasks(); // Refresh task list
        } catch (error) {
            console.error('Error editing task:', error);
            setMessage('Error updating task.'); // Set error message
        }
    };

    const onDelete = async (id) => {
        try {
            await axios.delete(`https://localhost:7183/api/Tasks/${id}`);
            setMessage('Task deleted successfully!'); // Set success message
            fetchTasks(); // Refresh task list
        } catch (error) {
            console.error('Error deleting task:', error);
            setMessage('Error deleting task.'); // Set error message
        }
    };

    const handleSave = (newTask) => {
        setTaskToEdit(null);
        setMessage('Task added successfully!'); // Set success message
        fetchTasks(); // Refresh task list
    };

    return (
        <BrowserRouter>
            <div className="App">
                {message && <div className="message">{message}</div>} {/* Display the message */}
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route 
                        path="/tasks" 
                        element={<TaskList tasks={tasks} onEdit={setTaskToEdit} onDelete={onDelete} />} 
                    />
                    <Route 
                        path="/add-task" 
                        element={<TaskForm taskToEdit={taskToEdit} onSave={handleSave} />} 
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
