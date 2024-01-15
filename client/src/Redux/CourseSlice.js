import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    courses: JSON.parse(localStorage.getItem("courses")) || [],
};

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        createCourse: (state, action) => {
            state.courses.push(action.payload);
            localStorage.setItem("courses", JSON.stringify(state.courses));
        },
        deleteCourse: (state, action) => {
            const courseIdToDelete = action.payload;
            state.courses = state.courses.filter(course => course.id !== courseIdToDelete);
            localStorage.setItem("courses", JSON.stringify(state.courses));
        },
    },
});

export const { createCourse, deleteCourse } = courseSlice.actions;
export default courseSlice.reducer;
