import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './reducers/users';
import NotificationReducer from './reducers/notifications';


const store = configureStore({
    reducer : {
        users: UserReducer,
        notification: NotificationReducer
    }
}) 


export default store;