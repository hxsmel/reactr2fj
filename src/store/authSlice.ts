import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CredentialsPayload } from '../types';
import { initialState } from '../constants'

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials(state, action: PayloadAction<CredentialsPayload>) {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        clearCredentials(state) {
            state.token = null;
            state.user = null;
        },
    },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
