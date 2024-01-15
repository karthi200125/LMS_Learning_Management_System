import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from '../Redux/AuthSlice'
import CourseReducer from './CourseSlice'

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        course: CourseReducer,
    }
})