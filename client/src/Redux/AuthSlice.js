import { createSlice } from '@reduxjs/toolkit';

const parseJSON = (jsonString) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return null;
  }
};

const storedUser = localStorage.getItem('user');
const initialState = {
    user: parseJSON(storedUser) || null,
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
    },
});

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
