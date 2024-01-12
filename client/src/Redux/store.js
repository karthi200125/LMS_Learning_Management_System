import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from '../Redux/AuthSlice'

export const store = configureStore({
    reducer: {
        auth: AuthReducer
    }
})