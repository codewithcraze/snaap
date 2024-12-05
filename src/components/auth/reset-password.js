import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { sweetAlert } from '../../custom-hooks/useSweetAlert';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('t');
    const navigate = useNavigate();
    const [password, setPassword] = useState({
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState({
        password: '',
        confirmPassword: '',
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setPassword(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newError = { password: '', confirmPassword: '' };
        if (password.password.length < 8) {
            newError.password = 'Password must be at least 8 characters long.';
        }
        if (password.password !== password.confirmPassword) {
            newError.confirmPassword = 'Passwords do not match.';
        }
        if (newError.password || newError.confirmPassword) {
            setError(newError);
            return;
        }
        setError({ password: '', confirmPassword: '' });
        try {
            const response = await axios.post('/api/auth/reset', {
                password, token
            })
            if (response.data.status === 1) {
                sweetAlert('success', 'Success!', 'Password reset sent successfully', () => { }, () => { }, false);
                navigate('/');
            }
        } catch (error) {
            sweetAlert('error', error.response.data.error, error.response.data.message, () => { }, () => { }, false);
        }

    };

    return (
        <div className='mt-5 d-flex justify-content-center align-items-center'>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '100%' }, // Default width for small screens
                    width: {
                        xs: '100%',  // 100% width for extra small screens
                        sm: '100%',  // 100% width for small screens
                        md: '50%'    // 50% width for medium screens and above
                    }
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
                className='d-flex justify-content-center align-items-center flex-column p-4'
            >
                <div className=''>
                    <TextField
                        label="Create New Password"
                        variant="outlined"
                        className='w-100'
                        value={password.password}
                        onChange={handleChange}
                        name='password'
                        type='password'
                        error={!!error.password}
                        helperText={error.password}
                    />
                </div>
                <div className=''>
                    <TextField
                        label="Confirm Your Password"
                        variant="outlined"
                        className='w-100'
                        value={password.confirmPassword}
                        onChange={handleChange}
                        name='confirmPassword'
                        type='password'
                        error={!!error.confirmPassword}
                        helperText={error.confirmPassword}
                    />
                </div>
                <div>
                    <Button
                        variant="contained"
                        size="large"
                        className='w-100'
                        type='submit'
                    >
                        Submit
                    </Button>
                </div>
            </Box>
        </div>
    );
};

export default ResetPassword;
