import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';
import { sweetAlert } from '../../custom-hooks/useSweetAlert';
import { Loader } from '../../utils/tool';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!email) {
            setEmailError('Email is required.');
            return;
        } else if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
            return;
        }

        setEmailError('');
        setLoading(true); // Start loading

        try {
            const response = await axios.post('/api/auth/reset-password', { email });
            if (response.data.status === 0) {
                sweetAlert(
                    'error',
                    response.data.message,
                    'Sorry! You are not a registered user',
                    () => {},
                    () => {},
                    false
                );
            } else {
                sweetAlert(
                    'success',
                    response.data.message,
                    'An email has been sent to your registered account.',
                    () => {},
                    () => {},
                    false
                );
            }
        } catch (error) {
            console.error('Error during password reset:', error);
            sweetAlert(
                'error',
                'Request Failed',
                error.message,
                () => {},
                () => {},
                false
            );
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="container text-center" style={{marginTop: '11rem'}}>
            {loading && <Loader />} {/* Conditionally render Loader component */}
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '50%' },
                }}
                noValidate
                className="forgetForm"
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <TextField
                    id="outlined-basic"
                    label="Enter your registered email"
                    variant="outlined"
                    name="email"
                    required
                    value={email}
                    type="email"
                    onChange={handleChange}
                    error={!!emailError}
                    helperText={emailError}
                />
                <Button
                    variant="contained"
                    size="large"
                    className="w-50"
                    type="submit"
                    disabled={loading} // Disable button while loading
                >
                    Submit
                </Button>
            </Box>
        </div>
    );
};

export default ForgetPassword;
