import React, { useState } from 'react';
import { Form, FormGroup, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("FORM SUBMIT!");

        // Create the payload
        const payload = { email, password, role };
        console.log("payload", payload);

        // Fetch API call with proper URL string
        fetch(`https://localhost:7183/api/Auth/login?email=${email}&password=${password}&userType=${role}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Login failed!');
                }
                return response.json();
            })
            .then(data => {
                console.log('Login successful:', data);
                // Handle successful login (e.g., store token, redirect)
                // Example: navigate('/dashboard'); // Redirect to dashboard
                navigate("/tasks");
            })
            .catch(error => {
                console.error('Login Failed', error);
            });
    };

    return (
        <div>
            <Card>
                <Form horizontal className="LoginForm" id="loginForm" onSubmit={handleFormSubmit}>
                    <FormGroup controlId="formEmail">
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </FormGroup>
                    <FormGroup controlId="formPassword">
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </FormGroup>
                    <FormGroup controlId="formRole">
                        <Form.Control
                            as="select"
                            name="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </Form.Control>
                    </FormGroup>

                    <FormGroup controlId="formSubmit">
                        <Button bsStyle="primary" type="submit">
                            Login
                        </Button>
                    </FormGroup>
                </Form>
            </Card>
        </div>
    );
};

export default LoginForm;
