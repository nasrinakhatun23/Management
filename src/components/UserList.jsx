
// src/components/UserList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from './UserForm';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    // Fetch Users
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            setUsers(response.data);
        };
        fetchUsers();
    }, []);

    const handleEdit = (user) => {
        setSelectedUser(user);
        setModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
            setUsers(users.filter(user => user.id !== id));
        }
    };

    return (
        <div>
            <h2>User List</h2>
            <button onClick={() => { setSelectedUser(null); setModalOpen(true); }}>Add User</button>
            {modalOpen && <UserForm setUsers={setUsers} setModalOpen={setModalOpen} selectedUser={selectedUser} />}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => handleEdit(user)}>Edit</button>
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;

