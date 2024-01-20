import { createSlice } from '@reduxjs/toolkit';

const storedUser = localStorage.getItem("user");
const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem('access_token', action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    ChapterCompleted: (state, action) => {
      state.user.ChapterCompleted.push(action.payload?.ChapterCompleted[0]);
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    CourseCompleted: (state, action) => {
      state.user.CourseCompleted.push(action.payload?.CourseCompleted[0]);
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});

export const { login, logout, ChapterCompleted, CourseCompleted } = AuthSlice.actions;
export default AuthSlice.reducer;
