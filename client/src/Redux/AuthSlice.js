import { createSlice } from '@reduxjs/toolkit';

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')) || null,
    },
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
    },
});

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
