import { configureStore } from "@reduxjs/toolkit";

import cartReducer from './cartSlice'

import dataReducer from './dataSlice';
import userSlice from "./userSlice";


const store = configureStore({
    reducer:{
        cart:cartReducer,
        data:dataReducer,
        login:userSlice
    }
})

export default store;