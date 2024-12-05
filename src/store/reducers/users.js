import { createSlice } from "@reduxjs/toolkit";
import { signInUser , isAuth, signOut} from "../actions/users";

let DEFAULT_USER_STATE = {
    loading: false,
    data: {
        _id: null,
        email: null,
        role: null,
        password: null,
        token: null
    },
    auth: null,
};

export const userSlice = createSlice({
    name: 'users',
    initialState: DEFAULT_USER_STATE,
    reducers: {
        // Your additional reducers can go here if needed
    },
    extraReducers: (builder) => {
        builder
            // Signin
            .addCase(signInUser.pending, (state) => { state.loading = true })
            .addCase(signInUser.fulfilled, (state, action) => {
                state.loading = false;
                const setData = {
                    _id: action.payload.data.user._id,
                    token: action.payload.data.token,
                    email: action.payload.data.user.email,
                    role: action.payload.data.user.role,
                    password: action.payload.data.user.password,
                }
                state.data = setData;
                state.auth = action.payload.auth;
            })
            .addCase(signInUser.rejected, (state) => { state.loading = false })
            
            // isAuth
            .addCase(isAuth.pending, (state) => { state.loading = true })
            .addCase(isAuth.fulfilled, (state, action) => {
                state.loading = false;
                const setData = {
                    email: action.payload.data?.email,
                    _id: action.payload.data?._id,
                    role: action.payload.data?.role,
                }
                state.data = setData;
                state.auth = action.payload.auth;
            })
            .addCase(isAuth.rejected, (state) => { state.loading = false })

            // Signout
            .addCase(signOut.fulfilled, (state) => {
                state.loading = false;
                state.data = DEFAULT_USER_STATE.data;
                state.auth = false;
            })     
    },  
});

export default userSlice.reducer;
