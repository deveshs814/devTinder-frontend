import { configureStore } from '@reduxjs/toolkit';
import  userReducer  from './userSlice.js';
import  feedReducer from "./feedSlice.js"
import connectionReducer from "./connectionSlice.js"
import requestSlice from "./requestSlice.jsx"

const appStore = configureStore({
    reducer:{
        user: userReducer,
        feed:feedReducer,
        connections: connectionReducer,
        requests:requestSlice,
    },
});

export default appStore;