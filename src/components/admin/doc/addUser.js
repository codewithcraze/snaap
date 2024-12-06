import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import { ADDDOC } from '../../../credentials/index';
import axios from 'axios';
import { showToast } from "../../../utils/tool";

const AddUser = () => {
    const [username, setUsername] = useState(""); // Store the username
    const [loading, setLoading] = useState(false); // Track if the form is being submitted
    const [error, setError] = useState(null); // To handle any error messages

    async function handleSubmit(e) {
        e.preventDefault(); // Prevent form from refreshing the page

        if (!username.trim()) {
            setError("Username cannot be empty.");
            return; // Prevent submission if username is empty
        }

        setLoading(true); // Show loading state while waiting for response
        setError(null); // Reset previous errors

        try {
            const response = await axios.post(ADDDOC, { username });
            if (response.data.status) {
                showToast("SUCCESS" , "User Added Successfully")
                setUsername(""); // Clear the input field
            } else {
                showToast("ERROR", "There was an error")
                setUsername(""); // Clear the input field
            }
        } catch (error) {
            setError(error.response.data.message || "An error occurred while adding the user.");
        } finally {
            setLoading(false); // Reset loading state after the request is done
        }
    }

    return (
        <div>
            <Box component="form" onSubmit={handleSubmit} className="container d-flex justify-content-center">
                <div className="row align-center justify-content-center w-100">
                    <div className="col-lg-8">
                        <TextField
                            label="Enter User Name"
                            className="w-100"
                            required
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            error={Boolean(error)} // Highlight the input if there's an error
                            helperText={error} // Display error message under the input
                        />

                        <div className='mt-3'>
                            <Button
                                variant="contained"
                                type="submit"
                                className="w-100"
                                disabled={loading} // Disable button when loading
                            >
                                {loading ? "Adding..." : "Submit Data"}
                            </Button>
                        </div>
                    </div>
                </div>
            </Box>
        </div>
    )
}

export default AddUser;
