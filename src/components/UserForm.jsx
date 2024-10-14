
// src/components/UserForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ setUsers, setModalOpen, selectedUser }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (selectedUser) {
            setName(selectedUser.name);
            setEmail(selectedUser.email);
        }
    }, [selectedUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedUser) {
            // Update existing user
            await axios.put(`https://jsonplaceholder.typicode.com/users/${selectedUser.id}`, {
                name,
                email,
            });
        } else {
            // Create new user
            const response = await axios.post('https://jsonplaceholder.typicode.com/users', {
                name,
                email,
            });
            setUsers(prev => [...prev, response.data]);
        }
        setModalOpen(false); // Close modal after submission
        setName('');
        setEmail('');
    };

    return (
        <div>
            <h2>{selectedUser ? 'Edit User' : 'Add User'}</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <button type="submit">{selectedUser ? 'Update User' : 'Add User'}</button>
                <button type="button" onClick={() => setModalOpen(false)}>Cancel</button>
            </form>
        </div>
    );
};

export default UserForm;
