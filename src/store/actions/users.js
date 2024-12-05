import { createAsyncThunk } from '@reduxjs/toolkit';
import { errorGlobal, successGlobal } from "../reducers/notifications";
import axios from 'axios';
import { getAuthHeader, removeTokenCookie } from '../../utils/tool';
import { LOGIN, ISAUTH} from '../../credentials/index.js';


export const signInUser = createAsyncThunk(
    'users/signInUser',
    async ({ email, password }, { dispatch }) => {
        try {
            const request = await axios.post(`${LOGIN}`, {
                email: email,
                password: password
            });
            if(!request.data.token){
                throw new Error(request.data.msg);
            }
            dispatch(successGlobal("Welcome!! "))
            return { data: request.data, auth: true }
        } catch (error) {
            dispatch(errorGlobal(error.message))
            throw error;
        }
    }
)

export const isAuth = createAsyncThunk(
    'users/isauth',
    async() => {
        try{    
            const request = await axios.get(`${ISAUTH}`, {
                headers: {
                    'Authorization': `Bearer ${getAuthHeader()}`
                }
            });

            if(!request.data.user.email){
                throw new Error(request.data.msg);
            }
            // cookie set.
            return { data: request.data.user, auth: true}
        }catch(error){
            return { data: {}, auth: false}
        }
    }
)

export const signOut = createAsyncThunk(
    'users/signout',
    async() => {
        removeTokenCookie();
    }
)


