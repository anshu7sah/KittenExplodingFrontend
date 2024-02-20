import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  email: "",
  username: "",
  jwtToken: "",
  errorMessage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.isAuthenticated = true;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.jwtToken = action.payload.jwttoken;
    },
    logout(state, action) {
      state.isAuthenticated = false;
      state.email = null;
      state.username = null;
      state.jwtToken = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
