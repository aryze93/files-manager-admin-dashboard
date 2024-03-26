import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSignedIn: false,
  isAuthChecked: false,
  currentUser: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsSignedIn: (state: { isSignedIn: any; }, action: { payload: any; }) => {
      state.isSignedIn = action.payload;
    },
    setIsAuthChecked: (state: { isAuthChecked: any; }, action: { payload: any; }) => {
      state.isAuthChecked = action.payload;
    },
    setCurrentUser: (state: { currentUser: any; }, action: { payload: any; }) => {
      state.currentUser = action.payload;
    },
    resetAuth: (state: { [x: string]: any; }) => {
      Object.keys(state).forEach((key) => {
        state[key as keyof typeof initialState] = initialState[key as keyof typeof initialState];
      });
    },
  },
});

export const { setIsSignedIn, setIsAuthChecked, setCurrentUser, resetAuth } = authSlice.actions;

export default authSlice.reducer;
