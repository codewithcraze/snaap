import { useEffect } from "react";
import { useFormik } from 'formik';
// Better management of forms.
import * as Yup from 'yup';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import { signInUser } from "../../store/actions/users";
// For validation purpose 
import { useDispatch, useSelector } from "react-redux";
import { errorHelper } from "../../utils/tool";
import { Loader } from "../../utils/tool";
import { useNavigate } from "react-router-dom";
import PreventSignin from '../../hoc/preventSignin';
import { Link } from "react-router-dom";

const Auth = () => {
    const navigate = useNavigate();
    const state = useSelector((state) => state.users);
    const notification = useSelector((state) => state.notification.global);
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: Yup.object({
            email: Yup.string().required('Sorry the email is required')
                .email('This is not a valid email'),
            password: Yup.string()
                .required('Sorry the password is required')
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        }
    })
    const handleSubmit = (values) => {
        dispatch(signInUser(values));
    }
    useEffect(() => {
        if (notification && notification.success) {
            navigate('/dashboard');
        }
    }, [navigate, notification])

    return (
        <PreventSignin props={state}>
            <div className='auth_container d-flex justify-content-center align-items-center flex-column p-2' style={{ marginTop: '11rem' }}>
                <h3 className='text-center mb-2'>User Dashboard Access</h3>
                {state.loading ? <Loader /> :
                    <Box
                        sx={{
                            '& .MuiTextField-root': { width: '100%', marginTop: '10px' },
                        }}
                        component="form"
                        onSubmit={formik.handleSubmit}
                        className="p-2"
                    >
                        <TextField
                            name="email"
                            label="Enter your email"
                            variant='outlined'
                            className="mb-2"
                            {...formik.getFieldProps('email')}
                            {...errorHelper(formik, 'email')}
                        />
                        <TextField
                            name="password"
                            label="Enter your password"
                            type="password"
                            variant='outlined'
                        
                            {...formik.getFieldProps('password')}
                            {...errorHelper(formik, 'password')}
                        />

                        <div className='mt-3'>
                            <Button variant='contained' color="primary" type="submit" size="large" className="w-100">
                                {'Login'}
                            </Button>
                            <br />
                            <div className="mt-4 text-end">
                                <Link to="/forget-password" >Forget Password?</Link>
                            </div>
                        </div>
                    </Box>
                }
            </div>
        </PreventSignin>
    )
}
export default Auth;