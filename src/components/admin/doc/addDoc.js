import { GETUSER, UPLOADDOC, DELETEDOC } from '../../../credentials/index';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, CircularProgress, Typography, TextField, Button } from '@mui/material';
import { showToast } from '../../../utils/tool';

const AddDocument = () => {
    const [users, setUsers] = useState([]); // Store fetched users
    const [selectedUser, setSelectedUser] = useState(""); // Track selected user
    const [loading, setLoading] = useState(false); // To handle loading state
    const [documentTitle, setDocumentTitle] = useState(""); // Track document title
    const [documentFile, setDocumentFile] = useState(null); // Track selected document file
    const [uploading, setUploading] = useState(false); // To handle uploading state
    const [error, setError] = useState(null); // Error state

    // Fetch users from the backend
    async function fetchUsers() {
        setLoading(true);
        try {
            const response = await axios.get(GETUSER);
            setUsers(response.data.user); // Set the users in state
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    }

    // Fetch users when the component mounts
    useEffect(() => {
        fetchUsers();
    }, []);

    // Handle user selection
    const handleUserChange = (event) => {
        setSelectedUser(event.target.value);
    };

    // Handle document title change
    const handleTitleChange = (e) => {
        setDocumentTitle(e.target.value);
    };

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setDocumentFile(file);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedUser || !documentTitle || !documentFile) {
            alert("Please complete all fields.");
            return;
        }

        // Create FormData to send the file and other data
        const formData = new FormData();
        formData.append("username", selectedUser);
        formData.append("documentTitle", documentTitle);
        formData.append("image", documentFile); // File to be uploaded
        let imageUrl;
        setUploading(true);
        try {
            const response = await axios.post('https://openurl-seven.vercel.app/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.message === "Image uploaded successfully!") {
                showToast('SUCCESS', 'Document uploaded successfully.');
                imageUrl = response.data.imageUrl;
                // Saving data to database.
                const addDoc = await axios.post(UPLOADDOC, {
                    username: selectedUser,
                    name: documentTitle,
                    url: imageUrl
                });

                if (addDoc.data.status) {
                    showToast('SUCCESS', 'Document added to the database.');
                    // Update users state with the new document
                    const updatedUsers = users.map((user) => {
                        if (user.username === selectedUser) {
                            return {
                                ...user,
                                documents: [...user.documents, { name: documentTitle, url: imageUrl }],
                            };
                        }
                        return user;
                    });
                    setUsers(updatedUsers); // Update the users state with the new document
                } else {
                    showToast('ERROR', 'Failed to add document to the database.');
                }
            } else {
                showToast('ERROR', 'Error uploading document.');
            }
        } catch (error) {
            console.error("Error uploading document:", error);
            setError("Error uploading document.");
            showToast('ERROR', 'Error uploading');
        } finally {
            setUploading(false);
        }
    };

    // Handle document deletion
    const handleDelete = async (username, documentId) => {
        try {
            const response = await axios.post(DELETEDOC, {
                username,
                documentId
            });

            if (response.data.status) {
                showToast('SUCCESS', 'Document deleted successfully.');
                // Update the UI by removing the document from the user's list
                const updatedUsers = users.map((user) => {
                    if (user.username === username) {
                        return {
                            ...user,
                            documents: user.documents.filter((doc) => doc._id !== documentId)
                        };
                    }
                    return user;
                });
                setUsers(updatedUsers);
            } else {
                showToast('ERROR', 'Failed to delete document.');
            }
        } catch (error) {
            console.error("Error deleting document:", error);
            showToast('ERROR', 'Error deleting document.');
        }
    };

    return (
        <div className="container mt-4">
            <Box sx={{ width: '100%', margin: 'auto' }}>
                <Typography variant="h6" gutterBottom className="mt-4">Upload a Document</Typography>

                {error && <Typography color="error">{error}</Typography>}

                {/* Form Fields */}
                <div className="row mt-3">
                    <div className="col-lg-4 col-md-6 mb-3">
                        {/* Loading indicator */}
                        {loading ? (
                            <CircularProgress />
                        ) : (
                            <FormControl fullWidth>
                                <InputLabel id="user-select-label">Username</InputLabel>
                                <Select
                                    labelId="user-select-label"
                                    id="user-select"
                                    value={selectedUser}
                                    required
                                    label="Username"
                                    onChange={handleUserChange}
                                >
                                    {/* Map users to options */}
                                    {users?.map((user) => (
                                        <MenuItem key={user._id} value={user.username}>
                                            {user.username}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    </div>

                    <div className="col-lg-4 col-md-6 mb-3">
                        <TextField
                            type="text"
                            label="Document Title"
                            className="w-100"
                            required
                            value={documentTitle}
                            onChange={handleTitleChange}
                        />
                    </div>

                    <div className="col-lg-4 col-md-6 mb-3">
                        <TextField
                            type="file"
                            className="w-100"
                            required
                            onChange={handleFileChange}
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleSubmit}
                    disabled={uploading}
                    sx={{ mt: 2 }}
                >
                    {uploading ? "Uploading..." : "Upload Document"}
                </Button>
            </Box>

            {/* Display documents of selected user */}
            {selectedUser !== "" ? (
                <div className='mt-5 mb-3'>
                    {/* Find selected user */}
                    {users
                        .filter((user) => user.username === selectedUser)
                        .map((user) => (
                            <div key={user._id} className='mb-3'>
                                <Typography variant="h6">{user.username}'s Documents</Typography>
                                {user.documents.length > 0 ? (
                                    <ol>
                                        {user.documents.map((doc) => (
                                            <li key={doc._id} className='mt-3 w-100 d-flex justify-content-between p-3 border border-3' style={{background : "whitesmoke"}}>
                                                <a href={doc.url} target="_blank" rel="noopener noreferrer">
                                                    {doc.name}
                                                </a>
                                                {" "}
                                                {/* Download link */}
                                                <a href={doc.url} download={doc.name} target="_blank" style={{ color: 'blue', textDecoration: 'underline' }}>
                                                    Download
                                                </a>
                                                <button type="button" onClick={() => handleDelete(user.username, doc._id)}>
                                                    Delete Document
                                                </button>
                                            </li>
                                        ))}
                                    </ol>
                                ) : (
                                    <Typography>No documents uploaded yet.</Typography>
                                )}
                            </div>
                        ))}
                </div>
            ) : null}
        </div>
    );
};

export default AddDocument;
