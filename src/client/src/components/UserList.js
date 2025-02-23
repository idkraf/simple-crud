import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { CTable, CTableHead, CTableHeaderCell, CTableBody, CTableRow, CTableDataCell, CButton } from '@coreui/react';

const UserList = ({ onEdit, refresh }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // fetchUsers list in here
        fetchUsers(); 
    }, [refresh]); // Fetch data when `refresh` prop changes

    const fetchUsers = async () => {
        // setLoading(true);
        try {
            const response = await fetch('/api/users');
            if (!response.ok) throw new Error('Failed to fetch users');

            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            // setLoading(false);
        }
    };

    const handleDelete = (id) => {

        const isConfirmed = window.confirm("Are you sure you want to delete this user?");
        if (!isConfirmed) return;
        
        $.ajax({
            url: `/api/users/${id}`,
            type: 'DELETE',
            success: () => {
                setUsers(users.filter(user => user.id !== id));
            },
            error: (xhr, status, error) => {
                console.error('Error:', error);
            }
        });
    };

    return (
        <div className="container mt-5">
            <h2>User List</h2>
            <CTable>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell>ID</CTableHeaderCell>
                        <CTableHeaderCell>Name</CTableHeaderCell>
                        <CTableHeaderCell>Email</CTableHeaderCell>
                        <CTableHeaderCell>Age</CTableHeaderCell>
                        <CTableHeaderCell>Bod</CTableHeaderCell>
                        <CTableHeaderCell>Actions</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {users.map(user => (
                        <CTableRow key={user.id}>
                            <CTableDataCell>{user.id}</CTableDataCell>
                            <CTableDataCell>{user.name}</CTableDataCell>
                            <CTableDataCell>{user.email}</CTableDataCell>
                            <CTableDataCell>{user.age}</CTableDataCell>
                            <CTableDataCell>{user.bod}</CTableDataCell>
                            <CTableDataCell>
                                <CButton color="info" onClick={() => onEdit(user)}>Edit</CButton>
                                <CButton color="danger" onClick={() => handleDelete(user.id)}>Delete</CButton>
                            </CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
        </div>
    );
};

export default UserList;